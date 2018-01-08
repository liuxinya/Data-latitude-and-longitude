import { SummaryQueryObject } from './../../interfaces/home/SummaryQueryObject';
import { Injectable } from '@angular/core';
import { BasicInfoObject } from '../../interfaces/BasicInfoObject';
import { NetService, StatusObject } from '../net.service';
import { joinUrl } from '../helpers/net.helper';
import { BasicQueryConditionService } from '../BasicQueryCondition.service';
import { ComparisonQueryObject } from '../../interfaces/home/ComparisonQueryObject';
@Injectable()
export class HomePageService {
    constructor(
        private _net: NetService,
        private _basicQuery: BasicQueryConditionService
    ) {

    }
    url: string = 'summary';
    async getSummaryData() {
        // 获取全局的条件
        let query = this._basicQuery.parseQuery<SummaryQueryObject>();
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
        } catch(e) {

        }
    }
}