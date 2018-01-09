module.exports = {
    require: (filepath, usecache) => {
        !usecache && delete require.cache[filepath];
        return require(filepath);
    },
    // 打包结果
    package: (succ, data) => {
        return JSON.stringify({
            succ: !!succ,
            msg: !!succ ? null : data,
            data: !!succ ? data : null
        });
    },
    generateArr(num, handler) {
        handler = handler || function (index) {
            return index;
        }
        let arr = [];
        for(let i = 0; i < num; i++) {
            arr.push(handler(i));
        }
        return arr;
    },
    getDate(val) {
        let year = +val.slice(0,4);
        let month = +val.slice(4,6);
        let day = +val.slice(6,8);
        return {
            year,
            month,
            day
        };
    },
    randomPositiveAndNegative() {
        return Math.round(Math.random()) === 0 ? -1 : 1
    }
}