import { Alert, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';
const global = {
    user_email: '',
    setEmail: (email) => { global.user_email = email; },
    MonthStrtoInt: (str) => {
        let month;
        switch (str) {
        case 'Jan':
            month = 1;
            break;
        case 'Feb':
            month = 2;
            break;
        case 'Mar':
            month = 3;
            break;
        case 'Apr':
            month = 4;
            break;
        case 'May':
            month = 5;
            break;
        case 'Jun':
            month = 6;
            break;
        case 'Jul':
            month = 7;
            break;
        case 'Aug':
            month = 8;
            break;
        case 'Sep':
            month = 9;
            break;
        case 'Oct':
            month = 10;
            break;
        case 'Nov':
            month = 11;
            break;
        case 'Dec':
            month = 12;
            break;
        default:
            console.error('switch error', str);
            break;
        }
        return month;
    },

    nowKST: () => {
        const obj = {};
        const str = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
        if (Platform.OS === 'ios') {
            const date = str.split('. ');

            // Reactotron.log(date);
            obj.year = parseInt(date[0], 10);
            obj.month = parseInt(date[1], 10);
            obj.day = parseInt(date[2], 10);

            const time = date[3];
            const ampm = time.split(' ')[0];
            const times = time.split(' ')[1];
            if (ampm === '오전') {
                obj.hour = parseInt(times.split(':')[0], 10);
                obj.minutes = parseInt(times.split(':')[1], 10);
                obj.second = parseInt(times.split(':')[2], 10);
            } else {
                obj.hour = parseInt(times.split(':')[0], 10) + 12;
                obj.minutes = parseInt(times.split(':')[1], 10);
                obj.second = parseInt(times.split(':')[2], 10);
            } 
        } else {
            const splited = str.split(' ');
            obj.month = global.MonthStrtoInt(splited[1]);
            obj.day = parseInt(splited[2], 10);
            obj.year = parseInt(splited[4], 10);

            const time = splited[3].split(':');

            obj.hour = parseInt(time[0], 10);
            obj.minutes = parseInt(time[1], 10);
            obj.second = parseInt(time[2], 10);
        }

        return obj;
    },
    nowParams: date =>
        date.getFullYear() + '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getDate()).slice(-2) + ' ' +
            ('00' + (date.getHours())).slice(-2) + ':' +
            ('00' + date.getMinutes()).slice(-2) + ':' +
            ('00' + date.getSeconds()).slice(-2),
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
    DateToStr3: (date) => {
        const obj = global.DateStrtoObj(date);
        let str = '' + obj.month + '월';
        str += obj.day + '일 ';
        str += obj.hour + ':';
        str += obj.minutes + ' 작성';

        return str;
    },
};

export default global;
