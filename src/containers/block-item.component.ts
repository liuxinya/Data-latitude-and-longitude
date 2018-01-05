import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'block-item',
    template: `
        <div class='title-wrapper'>
            <img class='img' [src]='img'>
            <span class='title'>
                {{title}}
            </span>
        </div>
        <div class='value'>
            {{value}}
        </div>
    `,
    styles: [
        `
        :host {
            display: flex;
            height: 56px;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
        .title-wrapper {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .title-wrapper .img {
            max-height: 14px;
            max-width: 14px;
        }
        .title-wrapper .title {
            font-size: 12px;
            margin-left: 6px;
        }
        .value {
            flex: 2;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: #4A90E2;
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class BlockItemComponent {
    @Input() img: string = 'assets/imgs/bishu.png'
    @Input() title: string = '';
    @Input() value: string = '';
}