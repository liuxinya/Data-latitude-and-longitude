import { BasicPageService } from './../basic-page.service';
import { BasicQueryConditionService } from './../BasicQueryCondition.service';
import { Injectable } from "@angular/core";
import { NetService } from "../net.service";
import { ComparisonQueryObject } from '../../interfaces/home/ComparisonQueryObject';
import { joinUrl } from '../helpers/net.helper';
import { CategaryObject } from '../home/main-page.service';
const differentIssuers: CategaryObject[] = [
    {
        img: 'assets/imgs/bishu.png',
        title: '笔数(万)',
        key: 'count',
        ceil: '0万笔'
    },
    {
        img: 'assets/imgs/jine.png',
        title: '金额(亿)',
        key: 'amount',
        ceil: '0亿元'
    },
    {
        img: 'assets/imgs/shouru.png',
        title: '收入(万)',
        key: 'income',
        ceil: '0万元'
    }
];

@Injectable()
export class ImportantJobsService extends BasicPageService{
    constructor(
        public _net: NetService,
        public _basicQuery: BasicQueryConditionService,
    ) {
        super(_net, _basicQuery);
    }
    basicUrl: string = 'importantjobs';
    // async getIncreaseData() {
    //     return await this._getIncreaseTrendData(joinUrl(this.basicUrl, 'qrcode'));
    // }
    async getIncreaseData(month: number = 12) {
        return await this._getPredictData(joinUrl(this.basicUrl, 'qrcode'), differentIssuers)
    }
    async getTableData(opts?:any) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>(opts);
        return await this._net.get(joinUrl(this.basicUrl,'qrcode/summary'),query)
            .then((data:any) => {
                let arr = [];
                for(let item in data.data) {
                    arr.push(data.data[item]);
                }
                return arr;
            })
    }
    async getCircleConsume(opts?:any) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>(opts);
        return await this._net.get(joinUrl(this.basicUrl,'nfc/scenes'),query)
            .then( (data: any) => {
                return data.data;
            })
    }
    async getCirclePay(opts?:any) {
        let query = this._basicQuery.parseQuery<ComparisonQueryObject>(opts);
        return await this._net.get(joinUrl(this.basicUrl,'nfc/pay'),query)
            .then( (data: any) => {
                return data.data;
            })
    }
}
// export interface TableDataObj {
//     amount: TableDataItemObj;
//     count: TableDataItemObj;
//     income: TableDataItemObj;
// }
// export interface TableDataItemObj {
//     summary: number;
//     thisDay: number;
//     thisMonth: number;
// }