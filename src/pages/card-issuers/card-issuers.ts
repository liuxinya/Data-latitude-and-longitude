import { Component } from '@angular/core';
import { BasicComponent } from '../../basic.component';
import { ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'page-card-issuers',
    templateUrl: './card-issusers.html',
    styles: [
        `
        :host {
            display: block;
            color: white;
            // background: red;
        }
        `
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class CardIssuersPage extends BasicComponent {
    constructor() {
        super();
    }
}
