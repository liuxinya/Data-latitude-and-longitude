import {Component, ElementRef, Input} from '@angular/core';
import {generateCircleItemOption} from './circle-item.echart.option';
import {CategaryObject} from '../services/home/main-page.service';
import { BasicConditionDataModelSerive } from '../model/BasicConditionData';
@Component({
    selector: 'circle-item', template: `
    <div class='content-wrapper'>
        <div class='circle'>
            <div class='instance'>
                <echarts-basic *ngIf="circleOption" [config]='circleOption'></echarts-basic>
                <div class="instance-title">
                    (执行率)
                </div>
            </div>
        </div>
        <div class='content'>
            <div class='instance'>
                <div class='data-item-wrapper'>
                    <div class='data-item'>
                        <img src='assets/imgs/money.png'>
                        <span class='label'>{{data.categary.title}}</span>
                        <span class='value'>{{data.data | money: data.categary.ceil}}</span>
                        <span>{{desc}}</span>
                    </div>
                </div>
                <div class='data-item-wrapper'>
                    <div class='data-item'>
                        <img src='assets/imgs/grow.png'>
                        <span class='label'>年同比增幅</span>
                        <span class='value' [ngClass]="[data.lastYearAverageIncrease > 0 ? 'good' : 'bad']">{{data.lastYearAverageIncrease | percentage: 2}}</span>
                    </div>
                </div>
                <div class='data-item-wrapper'>
                    <div class='data-item'>
                        <img src='assets/imgs/donw.png'>
                        <span class='label'>执行进度</span>
                        <span class='value normal'>
                            {{data.implementation.hasDone | money: data.categary.ceil}}
                            <span class='target'>/{{data.implementation.target | money: data.categary.ceil}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    /**
     *
                    <div class='data-item'>
                    <img src='assets/imgs/past.png'>
                    <span class='label'>执行率</span>
                    <span class='value' [ngClass]="[data.implementationRate > 0 ? 'good' : 'bad']">
                    {{data.implementationRate | percentage}}
                    </span>
                </div>
     */
    styles: [`
        :host {
            display: block;
        }
        .content-wrapper {
            margin: 10px 0;
            padding: 6px 0;
            border-radius: 4px;
            display: flex;
            font-size: 12px;
        }
        .content-wrapper .circle {
            height: 120px;
            width: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .content-wrapper .circle .instance {
            width: 100px;
            height: 100px;
            position: relative;
            // background-color: red;
        }
        .content-wrapper .circle .instance .instance-title {
            position: absolute;
            left: 0;
            bottom: 22%;
            right: 0;
            text-align: center;
            font-size: 10px;
        }
        .content-wrapper .content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .content-wrapper .content .instance {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            padding: 14px 4px;
            display: flex;
            flex-direction: column;
        }
        .content-wrapper .content .instance .data-item-wrapper{
            flex: 1;
            display: flex;
            // justify-content: center;
            align-items: center;
        }
        .content-wrapper .content .instance .data-item {
            text-align: left;
            padding: 2px 0;
            display: flex;
            height: 22px;
            line-height: 22px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
        }
        .content-wrapper .content .instance .data-item img {
            max-width: 16px;
            max-height: 16px;
            position: relative;
            top: 3px;
            margin-right: 6px;
        }
        .content-wrapper .content .instance .data-item .label {
            display: inline-block;
            min-width: 70px;
        }
        .content-wrapper .content .instance .data-item .value {
            flex: 1;
        }
        .content-wrapper .content .instance .data-item .value.good {
            color: #50E3C2;
        }
        .content-wrapper .content .instance .data-item .value.bad {
            color: #FF687A;
        }
        .content-wrapper .content .instance .data-item .value.normal {
            color: #4A90E2;
        }
        .content-wrapper .content .instance .data-item .value .target {
            color: white;
        }
        `]
})
export class CircleItemComponent {
    constructor(
        private $baseConditionData: BasicConditionDataModelSerive,
    ) {}
    ngOnInit() {}
    _data : CircleImplementationObject;
    @Input('data')set data(data : CircleImplementationObject) {
        if (data) {
            this.circleOption = null;
            // if(!/全国/gi.test(this.$baseConditionData.areaname$.value)) {
            //     data.categary.ceil = data.categary.ceil.replace(/^\d/gi, '2');
            // }
            setTimeout(() => {
                this.circleOption = generateCircleItemOption(data.implementationRate);
            }, 0);
        }
        this._data = data;
    };
    @Input() desc: string = '';
    get data() {
        return this._data;
    }
    circleOption : any;
}
export interface CircleImplementationObject {
    data : number; // 累计值
    lastYearAverageIncrease : number; // 去年平均增幅
    implementation : ImplementationObject;
    implementationRate : number; // 执行率
    yearonyear : number; // 同比执行率
    categary : CategaryObject;
}
export interface ImplementationObject {
    target : number; // 目标值
    hasDone : number; // 已完成的值
}