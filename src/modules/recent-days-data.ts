import { Component, Input } from '@angular/core';
import { BasicInfoObject } from '../interfaces/BasicInfoObject';
import { RecentDaysSummaryObject } from '../interfaces/home/RecentDaysSummaryObject';
@Component({
    selector: 'recent-days-data',
    template: `
        <table-data [contents]='expand ? data : data.slice(0,4)' class='basic-bg'></table-data>
        <toggle-expand (click)='expand = !expand' [expand]='expand' class='float-right'></toggle-expand>
    `,
    styles: [
        `
        :host {
            display: block;
            overflow: hidden;
        }
        toggle-expand {
            margin-top: 8px;
        }
        `
    ]
})
export class RecentDaysDataComponent {
    constructor() {

    }
    expand: boolean = false;
    @Input() data: RecentDaysSummaryObject[] = [];
}