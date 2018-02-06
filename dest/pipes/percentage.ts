import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { Pipe } from '@angular/core';
@Pipe({
    name: 'percentage'
})
export class PercentagePipe  implements PipeTransform {
    transform(num: number, deci: number = 1): string {
        return percentageTransformer(num, deci);
    }
}
export function percentageTransformer(num: number, deci: number = 1): string {
    if(isNaN(num)) {
        return '0%'
    } else {
        // 是数字
        return (+(num * 100).toFixed(deci) + '') + '%';
    }
}