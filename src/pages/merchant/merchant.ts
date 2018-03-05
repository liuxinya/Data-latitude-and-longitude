import { BasicQueryConditionObject } from './../../../dest/interfaces/BasicQueryConditionObject';
import { Component } from '@angular/core';
import { BasicComponent } from '../../basic.component';
import { ViewEncapsulation } from '@angular/core';
import { EchartsDataObject } from '../../containers/echarts.component';
@Component({
    selector: 'merchant',
    templateUrl: './merchant.html',
    styles: [
        `
        :host {
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class Merchant extends BasicComponent {
    constructor(
    ) {
        super();
    }
    increaseData: EchartsDataObject;
    basicChooseHandler(basicQuery: BasicQueryConditionObject) {
        // 获取数据
        this.initData();
    }
    async initData() {
        await Promise.all([
            // this._main.getIncreaseData()
            // .then((data: EchartsDataObject) => {
            //     this.increaseData = data;
            // }),
            // this._main.getBankPercentage()
            // .then((data: EchartsDataObject) => {
            //     this.percentageData = data;
            // }),
            // this._main.getRecentMonthsIncreaseTrend()
            // .then((data: EchartsDataObject) => {
            //     this.recentMonthIncreaseData = data;
            // })
        ])
    }
}