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
                    {{content[header.key] | money: header.ceil}}
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
            flex: 3;
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
            title: '笔数(万)',
            key: 'count',
            ceil: '0万笔'
        },
        {
            img: 'assets/imgs/jine.png',
            title: '金额(亿)',
            key: 'amount',
            ceil: '0亿元'
        },
        {
            img: 'assets/imgs/shouru.png',
            title: '收入(万)',
            key: 'income',
            ceil: '0万元'
        }
    ];
    @Input() contents: TableDataContentObject[] = [];
}
export interface TableDataHeaderObject {
    img: string; // 图片地址
    title: string; // 显示的标题
    key: string; // 对应的键值
    ceil: string;
}
export interface TableDataContentObject {
    [prop: string]: any;
    date: string; // 时间显示
}