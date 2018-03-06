import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
@Component({
    selector: 'circle-chart',
    template: `
    <div class='chart' #chart></div>
    `,
    styles: [
        `
        :host {
            display: block;
            height: 280px;
            width: 100%;
        }
        :host  .chart {
            display: block;
            width: 100%;
            height: 280px;
        }
       
        `
    ]
})
export class CircleChart implements OnInit{
    @ViewChild('chart') chart: ElementRef;
    _circleData: any;
    // @Input('circle-data') circleData:CircleDataObject[] = [{
    //     value: 45,
    //     name: 'CARD'
    // }, {
    //     value: 25,
    //     name: 'SSD'
    // }, {
    //     value: 15,
    //     name: 'U盘'
    // }, {
    //     value: 8,
    //     name: '嵌入式'
    // }, {
    //     value: 7,
    //     name: 'FLASH'
    // }]
    @Input('circle-data') set getCircleData(nv: any) {
        this._circleData = nv;
        this.option.series[0].data = nv;
        if(this._circleData) {
            console.log(nv)
            this.setOption();
        }
    }
    get getCircleData() {
        return this._circleData;
    }
    @Input('circle-color') circleColor: string[] = [
        '#fc7880',
        '#9186f9',
        '#fc7880',
        '#e6f37c',
        '#75c6f5'
    ]
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series: [{
            type: 'pie',
            radius: '68%',
            center: ['50%', '50%'],
            clockwise: false,
            data: this._circleData,
            label: {
                normal: {
                    position: 'inner',
                    formatter: '{b}\n({d}%)',
                     textStyle: {
                        color: '',
                        fontSize: 14
                    }
                },
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    borderWidth: 0,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }],
        color: this.circleColor,
        backgroundColor: '#13253c'
    };
    ngOnInit() {
        // let instance = echarts.init(this.chart.nativeElement);
        // instance.setOption(this.option);
    }
    setOption() {
        let instance = echarts.init(this.chart.nativeElement);
        instance.setOption(this.option);
    }
 
}
export interface CircleDataObject {
    value: number;
    name: string;
}


 