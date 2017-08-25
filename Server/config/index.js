const config = {
    salt: 'fuckyouhackerthisissaltforyou',
    now: () => {
        var date;
        date = new Date();
        date.getUTCDate()
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours() + 9)).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    } ,
    secret: 'pretzelauthsecretkey'
};

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    var date = date.getDate();
    newDate.setHours(hours - offset);

    return newDate;   
}
console.log(convertUTCDateToLocalDate(new Date()));
module.exports = config;