const global = {
    user_email: '',
    setEmail: (email) => { global.user_email = email; },

    nowKST: () => {
        let date;
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
        let date;
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
    nowParams: date =>
        date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours())).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2),
    nowKSTParams: date =>
        date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours() + 9)).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2),
    DateStrtoObj: (str) => {
        const obj = {};
        const date = str.split('T')[0];

        obj.year = parseInt(date.split('-')[0], 10);
        obj.month = parseInt(date.split('-')[1], 10);
        obj.day = parseInt(date.split('-')[2], 10);

        const time = str.split('T')[1];

        obj.hour = parseInt(time.split(':')[0], 10);
        obj.minutes = parseInt(time.split(':')[1], 10);
        obj.second = parseInt(time.split(':')[2].split('.')[0], 10);

        return obj;
    },
    DateStrtoObj2: (str) => {
        const obj = {};
        const date = str.split(' ')[0];

        obj.year = parseInt(date.split('-')[0]);
        obj.month = parseInt(date.split('-')[1]);
        obj.day = parseInt(date.split('-')[2]);

        const time = str.split(' ')[1];

        obj.hour = parseInt(time.split(':')[0]);
        obj.minutes = parseInt(time.split(':')[1]);
        obj.second = parseInt(time.split(':')[2]);

        return obj;
    },
    DateSubtraction: (d1, d2) => {
        const obj = {};
        obj.year = d1.year - d2.year;
        obj.month = d1.month - d2.month;
        obj.day = d1.day - d2.day;
        obj.hour = d1.hour - d2.hour;
        obj.minutes = d1.minutes - d2.minutes;
        obj.second = d1.second - d2.second;

        return obj;
    },
    CheckKorean: (str) => {
        const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return check.test(str);
    },
    DateToStr: (date) => {
        const obj = global.DateStrtoObj(date);
        let str = obj.hour + '시 ';
        str += obj.minutes + '분';

        return str;
    },
    DateToStr2: (date) => {
        const obj = global.DateStrtoObj(date);
        let str = '' + obj.month + '월 ';
        str += obj.day + '일 ';
        str += obj.hour + '시 ';
        str += obj.minutes + '분 ';
        str += '까지';

        return str;
    },
};

export default global;
