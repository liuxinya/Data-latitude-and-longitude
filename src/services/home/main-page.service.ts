import { CategaryObject } from './main-page.service';
import { BusinessLineResponseObject } from './../../interfaces/home/BusinessLineResponseObject';
import { BasicQueryConditionObject } from './../../interfaces/BasicQueryConditionObject';
import { SummaryQueryObject } from './../../interfaces/home/SummaryQueryObject';
import { Injectable } from '@angular/core';
import { BasicInfoObject } from '../../interfaces/BasicInfoObject';
import { NetService, StatusObject } from '../net.service';
import { joinUrl } from '../helpers/net.helper';
import { BasicQueryConditionService } from '../BasicQueryCondition.service';
import { ComparisonQueryObject } from '../../interfaces/home/ComparisonQueryObject';
import { formateDate, numCompletion } from '../helpers/date.helper';
import { generateArr } from '../helpers/array.helper';
import { RecentDaysSummaryObject } from '../../interfaces/home/RecentDaysSummaryObject';
import { EchartsDataObject, EchartsYDataObject } from '../../containers/echarts.component';
import { IncreaseAreaResponseObject } from '../../interfaces/home/IncreaseAreaResponseObject';
import { BasicChartResponseObject } from '../../interfaces/home/BasicChartResponseObject';
import { ImplementationResponseObject } from '../../interfaces/home/ImplementationResponseObject';
export interface CategaryObject {
    title: string;
    key: string;
    ceil: string;
}
let categaries:  CategaryObject[]= [{
    title: '笔数',
    key: 'count',
    ceil: '笔'
}, {
    title: '金额',
    key: 'amount',
    ceil: '元'
}, {
    title: '收入',
    key: 'income',
    ceil: '元'
}];
function generateY() {
    return categaries.map((categary: {
        title: string,
        key: string,
        ceil: string
    }) => {
        return {
            title: categary.title,
            data: [],
            key: categary.key,
            ceil: categary.ceil
        }
    })
}
function generateChartOptionData(data: BasicChartResponseObject[]) {
    let obj: EchartsDataObject = {
        x: [],
        y: generateY()
    };
    data.map((item: IncreaseAreaResponseObject, index: number ) => {
        obj.x.push(item.name);
        obj.y.map((_item: EchartsYDataObject, _index: number) => {
            obj.y[_index].data.push(item.data[_item.key]);
        })
    })
    return obj;
}
@Injectable()
export class HomePageService {
    constructor(
        private _net: NetService,
        private _basicQuery: BasicQueryConditionService,
    ) {

    }
    url: string = 'summary';
    async getSummaryData(options: BasicQueryConditionObject = {}) {
        // 获取全局的条件
        let query = this._basicQuery.parseQuery<SummaryQueryObject>(options);
        try {
            return await this._net.get(
                joinUrl(
                this.url,
                'all'
                ), 
                query
            ).then((data: StatusObject<BasicInfoObject>) => {
                return data.data;
            })
        } catch(e) {
            return {
                count: 0,
                amount: 0,
                income: 0
            }
        }
    }
    /**
     * 近七天的交易数据的比较
     */
    async getRecentDaysSummaryData(days: number = 7) {
        return await Promise.all(
            generateArr(days, (index: number) => {
                let time: Date = new Date(this._basicQuery.getDate().getTime() - 24 * 60 * 60 * 1000 * index);
                return this.getSummaryData({
                    date: formateDate(time)
                })
                .then((data: BasicInfoObject) => {
                    return {
                        ...data,
                        date: `${numCompletion(time.getMonth() + 1)}月${numCompletion(time.getDate())}日`
                    }
                })
            })
        )
        .then((results: RecentDaysSummaryObject[]) => {
            return results;
        });
    }
    // 获取近几天的比较数据，默认是15天
    async getComparisonData(days: number = 15) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>({
            days
        });
        try {
            return await this._net.get(
                joinUrl(
                    this.url,
                    'comparison'
                ),
                query
            )
            .then((data: StatusObject<BasicInfoObject>) => {
                return data.data;
            })
        } catch(e) {
            return {
                count: 0,
                amount: 0,
                income: 0
            }
        }
    }
    async getIncreaseData(months: number = 3) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>({
            months
        });
        try {
            return await this._net.get(
                joinUrl(
                    this.url,
                    `increase`
                ),
                query
            )
            .then((data: StatusObject<{
                increase: {
                    date: number,
                    data: BasicInfoObject
                }[],
                nextMonthPrediction: {
                    date: number,
                    data: BasicInfoObject
                }
            }>) => {
                data.data.increase.push(data.data.nextMonthPrediction);
                let obj: EchartsDataObject = {
                    x: [],
                    y: generateY()
                };
                data.data.increase.map((item: {
                    date: number,
                    data: BasicInfoObject
                }, index: number) => {
                    if(index === data.data.increase.length - 1) {
                        obj.x.push(`下月预测`);
                    } else {
                        let date: Date = new Date(item.date);
                        obj.x.push(`${date.getFullYear()}年\n${numCompletion(date.getMonth() + 1)}月`);
                    }
                    obj.y.map((_item: EchartsYDataObject, _index: number) => {
                        obj.y[_index].data.push(item.data[_item.key]);
                    })
                })
                return obj;
            });
        } catch(e) {
            // 由于要包含下月的预测
            return {
                x: generateArr(months + 1, () => {return ''}),
                y: categaries.map((categary: {
                    title: string,
                    key: string,
                    ceil: string
                }) => {
                    return {
                        title: categary.title,
                        data: generateArr(months + 1, () => {return 0}),
                        ceil: categary.ceil
                    }
                })
            }
        }
    }
    async getIncreaseAreaData() {
        let query = this._basicQuery.parseQuery<BasicQueryConditionObject>();
        try {
            return await this._net.get(
                joinUrl(
                    this.url,
                    `increase/area`
                ),
                query
            )
            .then((data: StatusObject<IncreaseAreaResponseObject[]>) => {
                return generateChartOptionData(data.data);
            })
        } catch(e) {
            return null;
        }
    }
    async getBusinessLineData() {
        let query = this._basicQuery.parseQuery<BasicQueryConditionObject>();
        try {
            return await this._net.get(
                joinUrl(
                    this.url,
                    `increase/business`
                ),
                query
            )
            .then((data: StatusObject<BusinessLineResponseObject[]>) => {
                return generateChartOptionData(data.data);
            })
        } catch(e) {
            return null;
        }
    }
    async getImplementationData() {
        let query = this._basicQuery.parseQuery<BasicQueryConditionObject>();
        try {
            return await this._net.get(
                joinUrl(
                    this.url,
                    `increase/implementation`
                ),
                query
            )
            .then((data: StatusObject<ImplementationResponseObject>) => {
                // return generateChartOptionData();
                categaries.map((categary: CategaryObject) => {
                    data.data[categary.key].categary = categary;
                })
                return data.data;
            })
        } catch(e) {
            return null;
        }
    }
}