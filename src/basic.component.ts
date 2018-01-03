export class BasicComponent {
    constructor() {
        try {
            this.beforeStart()
            .then(async () => {
                await this.onStart();
                await this.afterStart();
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
    // 组件初始化之前
    async beforeInit() {

    }
    // 组件初始化之后
    async afterInit() {

    }
    async onInit() {

    }
    // 组件初始化的时候
    private async ngOnInit() {
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
    private async ngOnDestroy() {
        await this.beforeDestroy();
        await this.onDestroy();
        await this.afterDestroy();
    }
}