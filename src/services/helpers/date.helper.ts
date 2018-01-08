/**
 * 数字补全
 * @param num 需要转变的数字
 * @param sym 填充的符号
 * @param len 填充长度
 * @param before 填充前后
 */
export function numCompletion(num: number | string, len: number = 2, sym: string = '0', before: boolean = true) {
    num = isNaN(num as number) ? num : Math.abs(num as number);
    let _str_num = num + '';
    if(_str_num.length >= len) {
        return _str_num;
    } else {
        let str = '';
        for(let i = 0; i < len - _str_num.length; i++) {
            str += sym;
        }
        return before ? str + _str_num : _str_num + str;
    }
}
export function formateDate(date: Date) {
    return `${date.getFullYear()}${numCompletion(date.getMonth() + 1)}${numCompletion(date.getDate())}`;
}