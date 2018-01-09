import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { Pipe } from '@angular/core';
@Pipe({
    name: 'money'
})
export class MoneyPipe  implements PipeTransform {
    transform(num: number, deci: string = ''): string {
        return transformCeil(num, deci);
    }
}
export function transformCeil(num: number, deci: string = ''): string {
    let str: string = num + '';
    let base = deci === '元' ? 100 : 1;
    if(str.length < 6) {
        return (num / base).toFixed(2) + `${deci}`
    } else if(str.length < 11){
        return (num / (10000 * base)).toFixed(2) + `万${deci}`
    } else  {
        return (num / (100000000 * base)).toFixed(2) + `亿${deci}`
    }
}

