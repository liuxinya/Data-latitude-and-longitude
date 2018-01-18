import { ReceiptService } from './../../services/receipt/receipt';
import { Component } from '@angular/core';
import { BasicComponent } from '../../basic.component';
import { ViewEncapsulation } from '@angular/core';
import { BasicQueryConditionObject } from '../../interfaces/BasicQueryConditionObject';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { CardIssuersService } from '../../services/card-issuers/card-issuers.service';
import { EchartsDataObject } from '../../containers/echarts.component';
@Component({
    selector: 'page-receipt',
    templateUrl: './receipt.html',
    styles: [
        `
        :host {
            display: block;
            color: white;
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class ReceiptPage extends BasicComponent {
    constructor(
        public loadingCtrl: LoadingController,
        private _main: ReceiptService,
    ) {
        super();
    }
    increaseData: EchartsDataObject;
    percentageData: EchartsDataObject;
    recentMonthIncreaseData: EchartsDataObject;
    basicChooseHandler(basicQuery: BasicQueryConditionObject) {
        // 获取数据
        this.initData();
    }
    async initData() {
        let loading = this.loadingCtrl.create({
            content: '数据加载中...'
        });
        loading.present();
        await Promise.all([
            this._main.getIncreaseData()
            .then((data: EchartsDataObject) => {
              this.increaseData = data;
            }),
            this._main.getBankPercentage()
            .then((data: EchartsDataObject) => {
              this.percentageData = data;
            }),
            this._main.getRecentMonthsIncreaseTrend()
            .then((data: EchartsDataObject) => {
                this.recentMonthIncreaseData = data;
            })
          ])
          .then((results: any[]) => {
            loading.dismiss();
          })
          .catch(() => {
            loading.dismiss();
          })
    }
}
