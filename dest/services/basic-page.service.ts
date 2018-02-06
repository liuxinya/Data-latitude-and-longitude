import { EchartsYDataObject } from './../containers/echarts.component';
import { BasicInfoObject } from './../interfaces/BasicInfoObject';
import { BasicQueryConditionObject } from './../interfaces/BasicQueryConditionObject';
import { BasicQueryConditionService } from './BasicQueryCondition.service';
import { Injectable } from "@angular/core";
import { NetService, StatusObject } from './net.service';
import { joinUrl } from './helpers/net.helper';
import { BasicChartResponseObject } from '../interfaces/home/BasicChartResponseObject';
import { generateChartOptionData, generateY, CategaryObject } from './home/main-page.service';
import { ComparisonQueryObject } from '../interfaces/home/ComparisonQueryObject';
import { EchartsDataObject } from '../containers/echarts.component';
import { numCompletion } from './helpers/date.helper';
import { generateArr } from './helpers/array.helper';

@Injectable()
export class BasicPageService {
    constructor(
        public _net: NetService,
        public _basicQuery: BasicQueryConditionService,
    ) {

    }
    async _getPredictData<T>(url: string, categaries: CategaryObject[],opts: any = {}) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>(opts);
        try {
            return await this._net.get(
                url,
                query
            )
            .then((data: StatusObject<{
                increase: {
                    date: number,
                    data: T
                }[],
                nextMonthPrediction: {
                    date: number,
                    data: T
                }
            }>) => {
                data.data.increase.push(data.data.nextMonthPrediction);
                let obj: EchartsDataObject = {
                    x: [],
                    y: generateY(categaries)
                };
                data.data.increase.map((item: {
                    date: number,
                    data: T
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
            return null;
        }
    }
    async _getIncreaseTrendData(url: string) {
        let query = this._basicQuery.parseQuery<BasicQueryConditionObject>();
        try {
            return await this._net.get(
                url,
                query
            )
            .then((data: StatusObject<BasicChartResponseObject[]>) => {
                return generateChartOptionData(data.data);
            })
        } catch(e) {
            console.log(e);
            return null;
        }
    }
}