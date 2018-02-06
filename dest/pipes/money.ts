import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { Pipe } from '@angular/core';
@Pipe({
    name: 'money'
})
export class MoneyPipe  implements PipeTransform {
    transform(num: number, deci: string = ''): any {
        if(isNaN(num)) return num;
        return transformCeil(num, deci);
    }
}
export function transformCeil(num: number, deci: string = ''): string {
    let str: string = num + '';
    let _d0 = deci[deci.length - 3];
    let _d1 = deci[deci.length - 2];
    let _d2 = deci[deci.length - 1];
    let _long = +deci[0] || 0;
    let base = _d2 === '元' ? 100 : 1;
    let count = 1;
    let _count = 0;
    function getRes() {
        if(_count == 3) {
            return 0;
        }
        switch(_d1) {
            case '万':
                count = 10000 * base;
                break;
            case '亿':
                count = 100000000 * base * (_d0 && _d0 === '万' ? 10000 : 1);
                break;
        }
        _count++;
        let res = +(num / count).toFixed(_long);
        _long++;
        return res === 0 ? getRes() : res;
    }
    return getRes();
}