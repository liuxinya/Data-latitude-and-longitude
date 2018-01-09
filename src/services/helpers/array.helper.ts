export function generateArr(num: number, handler: (index: number) => any) {
    let arr = [];
    for(let i = 0; i < num; i++) {
        arr.push(handler(i));
    }
    return arr;
}
export function getMinMax<T>(arr: T[], getValue: (item: T, index: number) => number = function(
    item: T, 
    index: number
){
    return item as any;
}) {
    if(arr && arr.length > 0) {
        let min: number = getValue(arr[0], 0);
        let max: number = getValue(arr[0], 0);
        for(let i = 1; i < arr.length; i++) {
            let val = getValue(arr[i], i);
            min = val < min ? val : min;
            max = val > max ? val : max;
        }
        return {
            max: max,
            min: min
        }
    }
    return null;
}