import { BasicConditionDataModelSerive } from './../model/BasicConditionData';
import { Injectable } from "@angular/core";
import { formateDate } from './helpers/date.helper';
import { NetService, StatusObject } from './net.service';
import { joinUrl } from './helpers/net.helper';
import { AreaObject } from '../containers/basic-choose.component';

@Injectable()
export class BasicQueryConditionService {
    constructor(
        private $baseConditionData: BasicConditionDataModelSerive,
        private _net: NetService
    ) {

    }
    getDate() {
        return this.$baseConditionData.date$.value;
    }
    parseQuery<T>(query: any = {}):T {
        return Object.assign({
            date: formateDate(this.$baseConditionData.date$.value),
            area: this.$baseConditionData.area$.value,
            credit: !this.$baseConditionData.credit$.value,
            daifu: !this.$baseConditionData.daifu$.value,
        }, query)
    }
    async getAreaList() {
        try {
            return await this._net.get(
                'areas'
            )
            .then((data: StatusObject<AreaObject[]>) => {
                return data.data;
            })
        } catch(e) {
            return [
                {
                    name: '全国',
                    code: ''
                }
            ];
        }
    }
}
