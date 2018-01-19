
import { BasicConditionDataModelSerive } from './../model/BasicConditionData';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BasicQueryConditionObject } from '../interfaces/BasicQueryConditionObject';
import { BasicQueryConditionService } from '../services/BasicQueryCondition.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
    selector: 'basic-choose',
    template: `
        <little-item [title]="_basicCondition.date$ | async | date: 'yyyy年MM月dd日'"></little-item>
        <ion-multi-picker class='basic-bg title' [(ngModel)]="area" cancelText="取消" doneText="确定" (ionChange)="confirm($event)" item-content [multiPickerColumns]="areas"></ion-multi-picker>
        <little-item [use-bg]='false' (click)="clickCredit($event)">
            <ion-checkbox [ngModel]="!(_basicCondition.credit$ | async)" (ngModelChange)="_basicCondition.credit$.next($event)"></ion-checkbox>
            <label>剔除贷记</label>
        </little-item>
        <little-item [use-bg]='false' (click)="clickDaifu($event)">
            <ion-checkbox [ngModel]="!(_basicCondition.daifu$ | async)" (ngModelChange)="_basicCondition.daifu$.next($event)"></ion-checkbox>
            <label>剔除代付</label>
        </little-item>
    `,
    styles: [
        `
        :host {
            display: block;
        }
        :host ion-checkbox.checkbox {
            vertical-align: middle;
        }
        `
    ]
})
export class BasicChooseComponent implements OnInit, OnDestroy {
    constructor(
        private _basicCondition: BasicConditionDataModelSerive,
        private _basicConditionAction: BasicQueryConditionService,
        public loadingCtrl: LoadingController
    ) {

    }
    checked: boolean = false;
    areas: any[] = [
        {
            options: [
                // {
                //     text: '上海',
                //     value: 'asd'
                // }, {
                //     text: '北京',
                //     value: '拉看什么的'
                // }
            ]
        }
    ];
    area: any;
    confirm(e: any) {
        console.log(e);
        this._basicCondition.area$.next(e['0'].value);
        this.changeEmitter.emit(this._basicConditionAction.parseQuery());
    }
    @Output('on-change') changeEmitter: EventEmitter<boolean> = new EventEmitter();
    clickCredit(e: MouseEvent) {
        this._basicCondition.credit$.next(!this._basicCondition.credit$.value);
        this.changeEmitter.emit(this._basicConditionAction.parseQuery());
    }
    clickDaifu(e: MouseEvent) {
        this._basicCondition.daifu$.next(!this._basicCondition.daifu$.value);
        this.changeEmitter.emit(this._basicConditionAction.parseQuery());
    }
    async ngOnInit() {
        let loading  = await this.loadingCtrl.create({
            content: '加载地区中...'
        });
        await loading.present();
        let data: AreaObject[] = await this._basicConditionAction.getAreaList();
        this.areas[0].options = data.map((_area: AreaObject) => {
            return {
                text: _area.name,
                value: _area.code,
                _data: _area
            }
        });
        this.area = this.areas[0].options[0].value;
        this._basicCondition.area$.next(this.areas[0].options[0].value);
        await loading.dismiss();
        this.changeEmitter.emit(this._basicConditionAction.parseQuery());
    }
    ngOnDestroy() {

    }
}
export interface AreaObject {
    name: string;
    code: string;
}