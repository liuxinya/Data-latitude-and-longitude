import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { Pipe } from '@angular/core';
@Pipe({
    name: 'percentage'
})
export class PercentagePipe  implements PipeTransform {
    transform(num: number, deci: string = ''): string {
        return percentageTransformer(num, deci);
    }
}
export function percentageTransformer(num: number, deci: string = ''): string {
    if(isNaN(num)) {
        return '0%'
    } else {
        // 是数字
        return (+(num * 100).toFixed(3) + '').replace(/\.\d+/gi, (val: string) => {
            val = (+val).toFixed(3);
            let _val = val + '';
            if(_val.length === 5) {
                _val = (+_val).toFixed(2) + '';
            }
            return _val ;
        }) + '%';
    }
}