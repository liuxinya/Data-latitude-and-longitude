import { FlagService } from './flag.service';
import { Input } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { NetService } from './net.service';
@Input()
export class UpchatService {
    constructor(
        private _flag: FlagService,
        private _alert: AlertController,
        private _load: LoadingController,
        private _net: NetService
    ) {}
    async checkSecurity() {
        // 在Native环境下
        if(this._flag.isDev) {
            return {
                state: true,
                e: null,
                msg: ''
            };
        } else {
            if(this._flag.mockUpchatEnv || await this.isInNative()) {
                this._flag.isDev && alert('是U聊');
                return await this.init();;
            }
            return {
                state: false,
                e: null,
                msg: '不是U聊环境'
            };
        }
    }
    async isInNative() {
        return UPCHAT.M.isNative();
    }
    async init() {
        return new Promise(async (resolve, reject) => {
            if(this._flag.mockUpchatEnv && this._flag.mockUpchatEmpNo) {
                resolve(await this.checkUpchatSafe(''));
            } else {
                UPCHAT.M.init(async ()=>{
                    UPCHAT.M.NAPI.showLoadingView();
                    let load: Loading = this._load.create({
                        content: '正在获取用户基本信息'
                    });
                    await load.present();
                    UPCHAT.M.NAPI.getSecurity(async (result: any)=>{
                        await UPCHAT.M.NAPI.dismiss();
                        await load.dismiss();
                        
                        if(this._flag.isDev) {
                            this._alert.create({
                                title: 'U聊生成数据',
                                subTitle: result
                            }).present();
                        }
                        resolve(await this.checkUpchatSafe(result.security));
                    },(e: any)=>{
                        this._alert.create({
                            title: '错误提示',
                            subTitle: '获取安全码失败' + e
                        }).present()
                        .then(() => {
                            resolve({
                                state: false,
                                e: e,
                                msg: '获取安全码失败' + JSON.stringify(e)
                            });
                        })
                    })
                });
            }
        })
    }
    async checkUpchatSafe(code) {
        code = encodeURIComponent(code);
        try {
            let obj: any = {code};
            if(this._flag.mockUpchatEnv && this._flag.mockUpchatEmpNo) {
                obj.mockempcode = '01363321';
            }
            await this._net.get('checkSecurity', obj);
            return {
                state: true,
                e: null,
                msg: ''
            };
        }catch(e) {
            return {
                state: false,
                e: e,
                msg: '安全验证失败！'
            };
        }
    }
}
export interface UpchatStatusObject {
    state: boolean;
    e: any;
    msg: string;
}