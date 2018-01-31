import { Component, Input } from '@angular/core';
@Component({
    selector: 'trump',
    template: `
        <img src="assets/imgs/trump.png" class='trump'>
        <div class="content">
            <span>{{content}}</span>
        </div>
    `,
    styles: [
        `
        :host {
            display: block;
            height: 16px;
            line-height: 16px;
            position: relative;
        }
        :host .trump {
            max-height: 12px;
            max-width: 12px;
            margin: 0 8px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        :host .content {
            margin-left: 28px;
            font-size: 12px;
            overflow: hidden;
        }
        :host span {
            display: inline-block;
            position: relative;
            animation: trump 5s linear infinite;
        }
        `
    ]
})
export class TrumpComponent {
    @Input() content: string = '';
}