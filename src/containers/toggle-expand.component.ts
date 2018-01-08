import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'toggle-expand',
    template: `
        <div class='basic-bg'>
            <span class='title'>
                {{expand ? '收起' : '展开更多'}}
            </span>
            <img [src]='expand ? "assets/imgs/not-expand.png" : "assets/imgs/expand.png"'>
        </div>
    `,
    styles: [
        `
        :host {
            display: inline-block;
        }
        div.basic-bg {
            font-size: 12px;
            height: 28px;
            padding: 0 20px;
            display: flex;
            line-height: 20px;
            justify-content: center;
            align-items: center;
            border-radius: 20px;;
        }
        div img {
            max-width: 12px;
            max-height: 12px;
            margin-left: 6px;
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class ToggleExpandComponent {
    @Input() expand: boolean = false;
}