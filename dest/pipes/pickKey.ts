import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
@Pipe({
    name: 'pickKey'
})
export class PickKeyPipe <T, K> implements PipeTransform {
    transform(obj: T, key: string): K {
        return obj && obj.hasOwnProperty(key) ? obj[key] : null;
    }
}
