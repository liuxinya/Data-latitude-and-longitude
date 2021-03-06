import { OnInit, OnDestroy } from "@angular/core";

export class BasicComponent implements OnInit, OnDestroy{
    constructor() {
        try {
            this.beforeStart()
            .then(async () => {
                await this.onStart();
                await this.afterStart();
                this.run();
            });
        } catch(e) {

        }
    }
    // 在初始化之前
    async beforeStart() {}
    // 初始化
    async onStart() {}
    // 初始化后
    async afterStart() {

    }
    async run() {

    }
    // 组件初始化之前
    async beforeInit() {

    }
    // 组件初始化之后
    async afterInit() {

    }
    async onInit() {

    }
    // 组件初始化的时候
    async ngOnInit() {
        try {
            await this.beforeInit();
            await this.onInit();
            await this.afterInit();
        } catch(e) {
            
        }
    }
    // 组件销毁之前
    async beforeDestroy() {

    }
    // 组件销毁之后
    async afterDestroy() {

    }
    async onDestroy() {

    }
    // 组件销毁时
    async ngOnDestroy() {
        await this.beforeDestroy();
        await this.onDestroy();
        await this.afterDestroy();
    }
}