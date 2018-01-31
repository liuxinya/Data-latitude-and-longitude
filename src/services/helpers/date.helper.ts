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
export function getWeekDesc(date: Date) {
    let day = date.getDay();
    switch(day) {
        case 0:
            return '周日';
        case 1:
            return '周一';
        case 2:
            return '周二';
        case 3:
            return '周三';
        case 4:
            return '周四';
        case 5:
            return '周五';
        case 6:
            return '周六';
    }
}