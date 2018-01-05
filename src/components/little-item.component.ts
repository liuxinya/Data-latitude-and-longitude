import { Component, Input } from '@angular/core';
@Component({
    selector: 'little-item',
    template: `
        <div class='title basic-bg'>
            {{title}}
        </div>
    `,
    styles: [
        `
        :host {
            display: inline-block;
            vertical-align: middle;
        }
        .title {
            font-size: 12px;
            font-weight: 200;
        }
        `
    ]
})
export class LittleItemComponent {
    @Input() title: string = '';
}