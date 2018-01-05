import { TableDataHeaderObject } from './table-data.component';
import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'table-data',
    template: `
        <div class='table'>
            <div class='header line'>
                <div class='item'>

                </div>
                <div class='item' *ngFor="let header of headers">
                    <img [src]=" header ? header.img : ''"/>
                    <span class='title'>
                        {{header ? header.title : ''}}
                    </span>
                </div>
            </div>
            <div class='content line' *ngFor="let content of contents">
                <div class='item'>
                    {{ content ? content.date : ''}}
                </div>
                <div class='item' *ngFor="let header of headers">
                    {{(content && header) ? content[header.key] : ''}}
                </div>
            </div>
        </div>
    `,
    styles: [
        `
        :host {
            display: block;
        }
        .header {
            font-weight: 600;
        }
        .header .item {
            display: flex: 
        }
        .line {
            display: flex;
            height: 28px;
        }
        .line .item {
            flex: 3;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .content.line .item:nth-child(2) {
            color: #3C7FD9;
        }
        .content.line .item:nth-child(3) {
            color: #E64B76;
        }
        .content.line .item:nth-child(4) {
            color: #39BDAE;
        }
        .line .item img {
            max-width: 14px;
            max-height: 14px;
            margin-right: 6px;
        }
        .line .item:first-child {
            flex: 2;
        }
        .content .item:
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class TableDataComponent {
    constructor() {

    }
    @Input() headers: TableDataHeaderObject[] = [
        {
            img: 'assets/imgs/bishu.png',
            title: '笔数',
            key: 'count'
        },
        {
            img: 'assets/imgs/jine.png',
            title: '金额',
            key: 'amount'
        },
        {
            img: 'assets/imgs/shouru.png',
            title: '收入',
            key: 'income'
        }
    ];
    @Input() contents: TableDataContentObject[] = [
        {
            date: '10月28日',
            count: '1231亿笔',
            amount: '312亿元',
            income: '1245亿元'
        }, {
            date: '10月29日',
            count: '1231亿笔',
            amount: '312亿元',
            income: '1245亿元'
        }, {
            date: '10月30日',
            count: '1231亿笔',
            amount: '312亿元',
            income: '1245亿元'
        }, {
            date: '10月31日',
            count: '1231亿笔',
            amount: '312亿元',
            income: '1245亿元'
        }
    ];
}
export interface TableDataHeaderObject {
    img: string; // 图片地址
    title: string; // 显示的标题
    key: string; // 对应的键值
}
export interface TableDataContentObject {
    [prop: string]: any;
    date: string; // 时间显示
}