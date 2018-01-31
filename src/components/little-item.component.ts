import { Component, Input } from '@angular/core';
@Component({
    selector: 'little-item',
    template: `
        <div class='title' [ngClass]='{"basic-bg": useBg}'>
            {{title}}
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
        :host {
            display: inline-block;
            vertical-align: middle;
        }
        .title {
            font-size: 13px;
            margin-right: 4px;
            font-weight: 200;
        }
        `
    ]
})
export class LittleItemComponent {
    @Input() title: string = '';
    // 是否使用背景 默认使用
    @Input('use-bg') useBg: boolean = true;
}