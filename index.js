const gulp = require('gulp');
let count = 0;
gulp.src('src/**/**')
.pipe(gulp.dest((f) => {
    if(!f.isDirectory()) {
        count += getLen(f.contents.toString());
    }
    return 'dest';
}))
.on('end', () => {
    console.log(count);
})
function getLen(contents) {
    let reg = /\n/gi;
    let res = contents.match(reg) || [];
    return res.length + 1;
}