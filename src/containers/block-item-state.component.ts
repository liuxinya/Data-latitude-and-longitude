import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'block-item-state',
    /**
     *        
        // <div class='title-wrapper'>
        //     <img class='img' [src]='img'>
        //     <span class='title'>
        //         {{title}}
        //     </span>
        // </div>
     */
    template: `
        <div class='value-wrapper'>
            <div class='value-container'>
                <img class='img' [src]='up ? "assets/imgs/up.png" : "assets/imgs/down.png"'>
                <div class='value' [ngClass]="[up ? 'up' : 'down']">
                    {{value}}
                </div>
            </div>
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
        .value-wrapper {
            flex: 2;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            align-items: center;
            color: #4A90E2;
        }
        .value-wrapper .value-container {
            height: 26px;
            position: relative;
            width: 100%;
        }
        .value-wrapper .value-container .img{
            position: absolute;
            left: 0;
            max-height: 16px;
            top: 50%;
            transform: translateY(-50%);
        }
        .value-wrapper .value-container .value {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
        }
        .value-wrapper .value.up {
            color: #50E3C2;
        }
        .value-wrapper .value.down {
            color: #FF687A;
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class BlockItemStateComponent {
    @Input() img: string = 'assets/imgs/bishu.png'
    @Input() title: string = '';
    @Input() value: string = '';
    @Input() up: boolean = true;
}