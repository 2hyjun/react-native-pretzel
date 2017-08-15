const global = {
    user_email: '',
    setEmail: (email) => { global.user_email = email },
    // user_name: '',
    // setName: (name) => { global.user_name = name},
    // user_univ: '',
    // setUniv: (univ) => { global.user_univ = univ},
    // user_major: '',
    // setMajor: (major) => { global.user_major = major},
    nowKST: () => {
        var date;
        date = new Date();
        date.getUTCDate();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours() + 9)).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    },
    now: () => {
        var date;
        date = new Date();
        date.getUTCDate();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours())).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    },
    nowParams: (date) => {
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours())).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    },
    nowKSTParams: (date) => {
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours() + 9)).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    },
    DateStrtoObj: (str) => {
        let obj = {};
        let date = str.split('T')[0];

        obj.year = parseInt(date.split('-')[0]);
        obj.month = parseInt(date.split('-')[1]);
        obj.day = parseInt(date.split('-')[2]);

        let time = str.split('T')[1];

        obj.hour = parseInt(time.split(':')[0]);
        obj.minutes = parseInt(time.split(':')[1]);
        obj.second = parseInt(time.split(':')[2].split('.')[0]);

        return obj;
    },
    DateStrtoObj2: (str) => {
        let obj = {};
        let date = str.split(' ')[0];

        obj.year = parseInt(date.split('-')[0]);
        obj.month = parseInt(date.split('-')[1]);
        obj.day = parseInt(date.split('-')[2]);

        let time = str.split(' ')[1];

        obj.hour = parseInt(time.split(':')[0]);
        obj.minutes = parseInt(time.split(':')[1]);
        obj.second = parseInt(time.split(':')[2]);

        return obj;
    },
    DateSubtraction: (d1, d2) => {
        let obj = {};
        obj.year = d1.year - d2.year;
        obj.month = d1.month - d2.month;
        obj.day = d1.day - d2.day;
        obj.hour = d1.hour - d2.hour;
        obj.minutes = d1.minutes - d2.minutes;
        obj.second = d1.second - d2.second;

        return obj;
    }

};

export default global;