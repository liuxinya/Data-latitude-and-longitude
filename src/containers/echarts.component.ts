import { Component, Input , ElementRef, ViewChild} from '@angular/core';
import { getMinMax } from '../services/helpers/array.helper';
import * as echarts from 'echarts';
import { transformCeil } from '../pipes/money';
export interface EchartsDataObject {
    x: string[]; // x轴
    y: EchartsYDataObject[];
}
export interface EchartsYDataObject {
    title: string;
    data: number[];
    key?: string; // 键值
    ceil?: string; // 单位
}
@Component({
    selector: 'echarts-basic',
    template: `
    <div class='chart' #chart></div>
    `,
    styles: [
        `
        :host {
            display: block;
                height: 100%;
                width: 100%;
        }
        :host  .chart {
            display: block;
            width: 100%;
            height: 100%;
        }
        `
    ]
})
export class EchartsBasicComponent {
    constructor() {}
    @Input('config') config: any;
    @ViewChild('chart') chart: ElementRef;
    ngOnInit() {
        this.setOption();
    }
    ngOnChanges() {
        // this.setOption();
    }
    setOption() {
        let instance = echarts.init(this.chart.nativeElement);
        instance.setOption(this.config);
    }
}
@Component({
    selector: 'echarts-data',
    template: `
    <div class='container' *ngIf="data">
        <div class='left-part'>
        <div class='title' *ngFor="let line of data.y">
            {{line.title}}
        </div>
        <div class='title'></div>
        </div>
        <div class='right-part'>
            <div class='right-part-container'>
                <div style='height: 100%;' [ngStyle]="{'width': getWidth()}">
                    <div class='line' *ngFor="let line of data.y; let i = index">
                        <echarts-basic [config]='getOption(line, i)'></echarts-basic>
                    </div>
                    <div class='line'>
                        <echarts-basic [config]='getAxis()'></echarts-basic>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    `,
    styles: [
        `
        :host {
            display: block;
            width: 100%;
        }
        :host .container {
            display: flex;
        }
        .left-part {
            width: 50px;
        }
        .left-part .title {
            height: 50px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .right-part {
            flex: 1;
            position: relative;
        }
        .right-part .right-part-container {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            overflow-x: auto;
        }
        .right-part .line {
            height: 50px;
        }
        `
    ]
})
export class EchartsDataComponent {
    constructor() {

    }
    private _data:  EchartsDataObject;
    private min: number;
    private max: number;
    // 步长 在min/max的基础上的计算
    @Input('steps') steps: number = 100;
    @Input('data') set data(data: EchartsDataObject) {
        let minmaxData = data.y.map((item: EchartsYDataObject) => {
            return getMinMax<number>(item.data, (item: number, index: number) => {
                return item;
            });
        });
        // 取所有的小的里面的最小的
        this.min = getMinMax(minmaxData, (item: {
            min: number,
            max: number
        }, index: number) => {
            return item.min;
        }).min;
        // 取所有的大的里面最大的
        this.max = getMinMax(minmaxData, (item: {
            min: number,
            max: number
        }, index: number) => {
            return item.max;
        }).max;
        this._data = data;
        this.steps = (this.max - this.min) * 1;
    };
    get data() {
        return this._data;
    }
    getWidth() {
        return this.data.x.length > 4 ? 80 * this.data.x.length + 'px' : '100%' 
    }
    // 坐标轴的配置
    getAxis() {
        return {
            tooltip: {
                trigger: 'none',
                show: false,
            },
            grid: {
                left: 20,
                right: 20,
                top: 'middle',
                containLabel: false
            },
            toolbox: {
                show: false
            },
            xAxis: {
                type: 'category',
                show: true,
                offset: -26,
                boundaryGap: false,
                data: this.data.x,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                axisLabel: {

                }
            },
            yAxis: {
                type: 'value',
                show: false,
                min: 0,
                max: 0
            }
        };
    }
    // 每个线的配置
    getOption(line: EchartsYDataObject, index: number) {
        let colors: string[] = ['white', '#F85A87', '#4A90E2'];
        let color = colors[index % colors.length];
        return {
            tooltip: {
                trigger: 'axis',
                confine: true,
                formatter: (item: any[]) => {
                    return this.triggerFormat(item[0], line.ceil);
                }
            },
            toolbox: {
                show: false
            },
            xAxis: {
                type: 'category',
                show: false,
                offset: -6,
                boundaryGap: false,
                data: this.data.x,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                axisLabel: {

                }
            },
            yAxis: {
                type: 'value',
                show: false,
                min: this.min - this.steps,
                max: this.max + this.steps
            },
            grid: {
                left: 20,
                right: 20,
                top: 'middle',
                containLabel: false
            },
            series: [
                {
                    name: line.title,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            color: color
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: color
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: (item: any) => {
                                return this.labelFormat(item, line.ceil);
                            }
                        }
                    },
                    type:'line',
                    data: line.data
                }
            ]
        };
    }
    @Input('label-formate') labelFormat: (e: any, ceil: string) => string = (e: any, ceil: string = '') => {
        return transformCeil(e.value, ceil);
    };
    @Input('trigger-formatter') triggerFormat: (e: any, ceil: string) =>  string = (e: any, ceil: string) => {
        return `${e.axisValueLabel}<br\>
        <div style="height: 20px; line-height: 20px;">
            <div style="display: inline-block;width: 8px;height:8px;border-radius: 50%;background-color: ${e.color}"></div>
            <span style="color: ${e.color}">${e.seriesName}</span>
            <span>
                ${transformCeil(e.value, ceil)}
            </span>
        </div>
        `;
    }

}