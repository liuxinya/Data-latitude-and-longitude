import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { areaData } from "./BasicAreaData";
import { BasicQueryAreaObject } from '../interfaces/BasicQueryConditionObject';

@Injectable()
export class BasicConditionDataModelSerive {
    areaData: BasicQueryAreaObject[] = areaData;
    // 日期，默认是当前日期
    date$: BehaviorSubject<Date> = new BehaviorSubject(new Date);
    // 区域选择, 默认是全国
    area$: BehaviorSubject<BasicQueryAreaObject> = new BehaviorSubject(this.areaData[0]);
    // 是否包含贷记 默认包含
    credit$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    // 区域数据
}