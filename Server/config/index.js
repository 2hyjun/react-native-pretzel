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
}
module.exports = config;