import { BasicPageService } from './../basic-page.service';
import { BasicQueryConditionService } from './../BasicQueryCondition.service';
import { Injectable } from "@angular/core";
import { NetService } from "../net.service";
import { ComparisonQueryObject } from '../../interfaces/home/ComparisonQueryObject';
import { joinUrl } from '../helpers/net.helper';
import { CategaryObject } from '../home/main-page.service';
const differentIssuers: CategaryObject[] = [
    {
        title: '四大行',
        key: 'fourBigBanks'
    }, {
        title: '股份制',
        key: 'jointStockSystem',
    }, {
        title: '城商',
        key: 'cityBusiness'
    }, {
        title: '农商',
        key: 'farmerBusiness'
    }, {
        title: '其他',
        key: 'other'
    }
];

@Injectable()
export class ReceiptService extends BasicPageService{
    constructor(
        public _net: NetService,
        public _basicQuery: BasicQueryConditionService,
    ) {
        super(_net, _basicQuery);
    }
    basicUrl: string = 'receipt';
    async getIncreaseData() {
        return await this._getIncreaseTrendData(joinUrl(this.basicUrl, 'increase'));
    }
    async getBankPercentage() {
        return await this._getIncreaseTrendData(joinUrl(this.basicUrl, 'percentage'));
    }
    async getRecentMonthsIncreaseTrend(month: number = 12) {
        return await this._getPredictData(joinUrl(this.basicUrl, 'increasetrend'), differentIssuers)
    }
}