import { Injectable } from "@angular/core";

@Injectable()
export class FlagService {
    // 是否是开发环境
    isDev: boolean = true;
}