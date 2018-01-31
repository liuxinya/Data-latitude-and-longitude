import { FlagService } from './flag.service';
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { isAbsolute, parseParams, joinUrl } from './helpers/net.helper';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
const NOT_SUCC = Symbol('not-succ');
const NOT_OK = Symbol('not-ok');
const NOT_JSON = Symbol('not-json');
const UNKNOWN = Symbol('unknown');
@Injectable()
export class NetService {
    constructor(
        private http: Http,
        private _flag: FlagService
    ) {
        this.urlPre = this._flag.isDev ? 'http://localhost:9995' : (this._flag.mockNet ? 'http://172.21.21.236:9999/datitude' : '');
    }
    // 前缀  可能是一个自己指定的服务器  也可能是一个前缀
    private urlPre: string;
    getUrl(url: string, options: any = {}) {
        // 判断URL是否是一个绝对的路径
        let str = parseParams(options);
        return isAbsolute(url) ? `${url}?${str}` : `${joinUrl(this.urlPre, url)}${str ? '?' + str : ''}`;
    }
    async get<T>(url: string, options?: any) {
        let me = this;
        return await new Promise((resolve: Function, reject: Function) => {
            me.http.get(
                me.getUrl(
                    url,
                    options
                )
            )
            .toPromise()
            .then((res: Response) => {
                if(res.ok) {
                    try {
                        let data: StatusObject<T> = res.json();
                        if(data.succ) {
                            resolve(data);
                        } else {
                            reject({
                                type: NOT_SUCC,
                                data: data
                            });
                        }
                    } catch(e) {
                        reject({
                            type: NOT_JSON,
                            data: res.text(),
                            e: e
                        });
                    }
                } else {
                    reject({
                        type: NOT_OK,
                        data: res
                    });
                }
            })
            .catch((e: Response) => {
                reject({
                    type: UNKNOWN,
                    e: e
                });
            })
        });
    }
    async post<T>(url: string, body?: any | {}, options?: RequestOptionsArgs) {
        let me = this;
        return await new Promise((resolve: Function, reject: Function) => {
            (me.http.post(me.getUrl(url), body, options) as any).map((_res: any) => {
                let res: StatusObject<T> = _res as StatusObject<T>;
                if ( res.succ) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }).toPromise().catch((e: any) => {
                reject(e);
            });
        });
    }
    isNotOk(e: NetErrorObject) {
        return e.type === NOT_OK;
    }
    isNotJson(e: NetErrorObject) {
        return e.type === NOT_JSON;
    }
    isNotSucc(e: NetErrorObject) {
        return e.type === NOT_SUCC;
    }
}
export interface StatusObject<T> {
    succ: boolean;
    data: T;
    msg: string;
    [prop: string]: any;
}
export interface NetErrorObject {
    type: Symbol;
}
export interface NetNotOkObject extends NetErrorObject{
    type: Symbol;
    data: Response;
}
export interface NetNotSuccObject<T> extends NetErrorObject{
    type: Symbol;
    data: StatusObject<T>
}
export interface NetNotJsonObject extends NetErrorObject{
    type: Symbol;
    data: string;
    e: any;
}
export interface NetUnknownObject extends NetErrorObject{
    type: Symbol;
    e: Response;
}
