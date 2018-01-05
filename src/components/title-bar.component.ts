import { Component, Input } from '@angular/core';
@Component({
    selector: 'title-bar',
    template: `
        <div class='title basic-bg-lg'>
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
        `
    ]
})
export class TitleBarComponent {
    @Input() title: string = '';
}