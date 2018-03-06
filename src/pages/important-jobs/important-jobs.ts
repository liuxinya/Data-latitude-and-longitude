import { EchartsDataObject } from './../../containers/echarts.component';
import { ImportantJobsService } from './../../services/important-jobs/important-jobs.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { BasicQueryConditionObject } from './../../interfaces/BasicQueryConditionObject';
import { BasicComponent } from './../../basic.component';
import { Component } from '@angular/core';

@Component({
    selector: 'important-jobs',
    templateUrl: 'important-jobs.html',
})
export class ImportantJobs extends BasicComponent{
    constructor(
        public loadingCtrl: LoadingController,
        private _main: ImportantJobsService,
    ) {
        super();
    }
    increaseData: EchartsDataObject;
    tbodyData: TbodyDataItem[];
    circleConsumeData: CircleDataObject[];
    circlePayData: CircleDataObject[];
    basicChooseHandler(basicQuery: BasicQueryConditionObject) {
        // 获取数据
        this.initData();
    }
    async initData() {
        let loading = this.loadingCtrl.create({
            content: '数据加载中...'
        });
        loading.present();
        // console.log(this._main.getTableData())
        await Promise.all([
            this._main.getIncreaseData()
                .then((data: EchartsDataObject) => {
                    this.increaseData = data;
                }),
            this._main.getTableData()
                .then((data: TbodyDataItem[]) => {
                    this.tbodyData = data;
                }),
            this._main.getCircleConsume()
                .then((data: CircleDataObject[]) => {
                    this.circleConsumeData = data;
                    console.log(this.circleConsumeData)
                }),
            this._main.getCirclePay()
                .then((data: CircleDataObject[]) => {
                    this.circlePayData = data;
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
export interface TbodyDataItem {
    thisMonth: number;
    thisDay: number;
    summary: number;
}
export interface CircleDataObject {
    value: number;
    name: string;
}
