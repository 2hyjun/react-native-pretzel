const config = {
    salt: 'fuckyouhackerthisissaltforyou',
    now: () => {
        console.log(new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}));
        return new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'});
    } ,
    secret: 'pretzelauthsecretkey'
};
module.exports = config;