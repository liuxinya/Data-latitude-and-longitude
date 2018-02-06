
// 是否是绝对路径
export function isAbsolute(url: string) {
    return /^(https?\:\/\/)?([\w\-]+\.)+/gi.test(url);
}
// 合并两个请求
export function joinUrl(url1: string = '', url2: string) {
    // 这里只做简单的合并 简单的判断下后缀
    if (!url1) {
        return url2;
    } else {
        if (!url2) {
            return url1;
        } else {
            return (url1 + '/' + url2).replace(/\/{2,}/gi, '/').replace(/^(https?)\:\//gi, function (all, arg1){
                return `${arg1}://`;
            });
        }
    }
}
export function parseParams(obj: Object) {
    let str = '';
    for (let i in obj) {
        if (obj[i] !== undefined && typeof obj[i] !== 'object') {
            let val = obj[i];
            str += `${i}=${val}&`;
        }
    }
    return str.replace(/\&$/gi, '');
}
