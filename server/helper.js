module.exports = {
    require: (filepath, usecache) => {
        usecache && delete require.cache[filepath];
        try {
            return require(filepath);
        } catch(e) {
            return function(req, res, next) {
                next();
            };
        }
    },
    // 打包结果
    package: (succ, data) => {
        return JSON.stringify({
            succ: !!succ,
            msg: !!succ ? null : data,
            data: !!succ ? data : null
        });
    }
}