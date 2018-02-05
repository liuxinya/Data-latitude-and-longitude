import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BasicQueryAreaObject } from '../interfaces/BasicQueryConditionObject';
import { AreaObject } from "../containers/basic-choose.component";

@Injectable()
export class BasicConditionDataModelSerive {
    // 日期，默认是当前日期
    date$: BehaviorSubject<Date> = new BehaviorSubject(new Date);
    // 区域选择, 默认是全国
    area$: BehaviorSubject<string> = new BehaviorSubject('');
    areaname$: BehaviorSubject<string> = new BehaviorSubject('');
    // 是否包含贷记 默认包含
    credit$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    daifu$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    // 区域数据
}