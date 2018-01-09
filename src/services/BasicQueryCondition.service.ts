import { BasicConditionDataModelSerive } from './../model/BasicConditionData';
import { Injectable } from "@angular/core";
import { formateDate } from './helpers/date.helper';

@Injectable()
export class BasicQueryConditionService {
    constructor(
        private $baseConditionData: BasicConditionDataModelSerive
    ) {

    }
    getDate() {
        return this.$baseConditionData.date$.value;
    }
    parseQuery<T>(query: any = {}):T {
        return Object.assign({
            date: formateDate(this.$baseConditionData.date$.value),
            area: this.$baseConditionData.area$.value.key,
            credit: this.$baseConditionData.credit$.value
        }, query)
    }
}