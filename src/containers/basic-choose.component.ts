
import { BasicConditionDataModelSerive } from './../model/BasicConditionData';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BasicQueryConditionObject } from '../interfaces/BasicQueryConditionObject';
import { BasicQueryConditionService } from '../services/BasicQueryCondition.service';

@Component({
    selector: 'basic-choose',
    template: `
        <little-item [title]="_basicCondition.date$ | async | date: 'yyyy年MM月dd日'"></little-item>
        <little-item [title]="_basicCondition.area$ | async | pickKey: 'title'"></little-item>
        <little-item [use-bg]='false' (click)="clickCredit($event)">
            <ion-checkbox [ngModel]="!(_basicCondition.credit$ | async)" (ngModelChange)="_basicCondition.credit$.next($event)"></ion-checkbox>
            <label>剔除贷记</label>
        </little-item>
    `,
    styles: [
        `
        :host {
            display: block;
        }
        :host ion-checkbox.checkbox {
            vertical-align: middle;
        }
        `
    ]
})
export class BasicChooseComponent implements OnInit, OnDestroy {
    constructor(
        private _basicCondition: BasicConditionDataModelSerive,
        private _basicConditionAction: BasicQueryConditionService
    ) {

    }
    checked: boolean = false;
    @Output('on-change') changeEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output('on-destroy') destroyEmitter: EventEmitter<null> = new EventEmitter();
    clickCredit(e: MouseEvent) {
        this._basicCondition.credit$.next(!this._basicCondition.credit$.value);
    }
    ngOnInit() {
        let inited = false;
        let credit_subscription: Subscription = this._basicCondition.credit$
        .subscribe(()=> {
            inited && this.changeEmitter.emit(
                this._basicConditionAction.parseQuery()
            );
        });
        /**
         * 移除监听 释放内存
         */
        let destroy_subscription: Subscription = this.destroyEmitter.subscribe(() => {
            credit_subscription.unsubscribe();
            destroy_subscription.unsubscribe();
        })
        // 初始化的时候发射所有的值
        this.changeEmitter.emit(this._basicConditionAction.parseQuery())
        inited = true;
    }
    ngOnDestroy() {
        this.destroyEmitter.emit();
    }
}