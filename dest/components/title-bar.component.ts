import { Component, Input } from '@angular/core';
@Component({
    selector: 'title-bar',
    template: `
        <div class='title basic-bg-lg' [ngClass]="{'show-top-border': topBorder}">
            {{title}}
        </div>
    `,
    styles: [
        `
        :host {
            display: block;
        }
        .title {
            font-size: 14px;
            font-weight: 500;
        }
        .show-top-border {
            border-top: 2px solid #358bff;
        }
        `
    ]
})
export class TitleBarComponent {
    @Input() title: string = '';
    @Input('top-border') topBorder: boolean;
}