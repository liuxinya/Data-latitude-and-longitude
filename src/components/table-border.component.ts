import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'table-border',
    template: `
       <div class='table'>
           <table>
               <thead>
                    <tr>
                        <th></th>
                        <th *ngFor="let thead of theadTitleData">{{thead.title}}</th>
                    </tr>
               </thead>
               <tbody>
                    <tr *ngFor="let tbodyItem of tbodyTitleData; index as i">
                        <td class='normal-color'>{{tbodyItem.title}}</td>
                        <td>{{tbodyData[i].thisMonth}}</td>
                        <td>{{tbodyData[i].thisDay}}</td>
                        <td>{{tbodyData[i].summary}}</td>
                    </tr>
               <tbody>
           </table>
       </div>
    `,
    styles: [
        `
        :host {
            display: block;
            margin-top: 20px;
        }
        .table {
            position: relative;
        }
        .table table {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        thead tr th,
        tbody tr td {
            width: 66px;
            height: 42px;
            text-align: center;
            border: 1px solid #f5a623;
        }
        tbody tr td.normal-color {
            color: white;
        }
        tbody tr:nth-child(1) {
            color: #4689d6;
        }
        tbody tr:nth-child(2) {
            color: #bd4e76;
        }
        tbody tr:nth-child(3) {
            color: #56cdb7;
        }
        `
    ]
})
export class TableBorderComponent implements OnInit{
    ngOnInit() {
        // console.log(this.tbodyData)
    }
    @Input() data: string = '';
    @Input('thead-title-data') theadTitleData: TableTitleData[] = [
        {
            title: '金额'
        },
        {
            title: '笔数'
        },
        {
            title: '收入'
        },
    ];
    @Input('tbody-title-data') tbodyTitleData: TableTitleData[] = [
        {
            title: '当月'
        },
        {
            title: '当日'
        },
        {
            title: '累计'
        },
    ];
    @Input('tbody-data') tbodyData: TbodyDataItem[] = [
        {
            thisMonth: 1,
            thisDay: 1,
            summary: 1,
        },
        {
            thisMonth: 2,
            thisDay: 2,
            summary: 2,
        },
        {
            thisMonth: 3,
            thisDay: 3,
            summary: 3,
        }
    ]

}
export interface TableTitleData {
    title: string;
}
// export interface TbodyData {
//     count: TbodyDataItem;
//     amount: TbodyDataItem;
//     income: TbodyDataItem;
// }
export interface TbodyDataItem {
    thisMonth: number;
    thisDay: number;
    summary: number;
}