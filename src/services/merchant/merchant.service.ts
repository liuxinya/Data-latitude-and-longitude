import { BasicQueryConditionService } from './../../../dest/services/BasicQueryCondition.service';
import { Injectable } from "@angular/core";
import { BasicPageService } from '../basic-page.service';
import { NetService } from '../net.service';
import { joinUrl } from '../helpers/net.helper';
@Injectable()
export class MerchantService extends BasicPageService{
    // constructor(
    //     public _net: NetService,
    //     public _basicQuery: BasicQueryConditionService,
    // ) {
    //     super(_net, _basicQuery);
    // }
    // basicUrl: 
    // async getIncreaseData() {
    //     return await this._getIncreaseTrendData(joinUrl(this.basicUrl, 'increase'));
    // }
}