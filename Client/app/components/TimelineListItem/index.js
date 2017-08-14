import React, { PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];

import styles from './style';
import global from '../../config/global';

export default class TimelineListItem extends React.Component {
    /**
     * {
            "user_email": "biper94@pusan.ac.kr",
            "content": "커피",
            "detailInfo": "시간이 이상해 얘들",
            "expectedPrice": 4500,
            "fee": 3000,
            "deadline": "2017-07-25T15:00:00.000Z",
            "rid": 8,
            "contentType": "해줄게요",
            "completed": "N",
            "title": "1234",
            "time": "2017-08-12T20:38:48.000Z",
            "place": "정문 스타벅스"
        },
    * */
    static propTypes = {
        "user_email": PropTypes.string.isRequired,
        "content": PropTypes.oneOf(contents),
        "detailInfo": PropTypes.string.isRequired,
        "expectedPrice": PropTypes.number.isRequired,
        "fee": PropTypes.number.isRequired,
        "deadline": PropTypes.string.isRequired,
        "rid": PropTypes.number.isRequired,
        "contentType": PropTypes.oneOf(['해주세요', '해줄게요', '같이해요']),
        "title": PropTypes.string.isRequired,
        "time": PropTypes.string.isRequired,
        "place": PropTypes.string.isRequired,
        "onPress": PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            uploadTime: '',
            timeToDeadLine: '',
        };
        this._computeDeadLine = this._computeDeadLine.bind(this);
        this._computeUploadTime = this._computeUploadTime.bind(this);
    }
    componentDidMount() {
        this._computeDeadLine()
            .then(this._computeUploadTime);
        //console.log(this.props.time);
    }

    _computeUploadTime(deadline) {
        //console.log(this.props.deadline);
        let uptime = global.DateStrtoObj(this.props.time);
        let current = global.nowKST();
        let cur = global.DateStrtoObj2(current);

        // console.log('uptime', uptime);
        // console.log('cur', cur)

        let sub = global.DateSubtraction(cur, uptime);
        console.log(this.props.title, sub);
        if (sub.year) {
            this.setState({uploadTime: sub.year.toString() + '년 전', timeToDeadLine: deadline})
        } else if (sub.month) {
            this.setState({uploadTime: sub.month.toString() + '개월 전', timeToDeadLine: deadline})
        } else if (sub.day) {
            this.setState({uploadTime: sub.day.toString() + '일 전', timeToDeadLine: deadline})
        } else if (sub.hour) {
            this.setState({uploadTime: sub.hour.toString() + '시간 전', timeToDeadLine: deadline})
        } else if (sub.minutes) {
            this.setState({uploadTime: sub.minutes.toString() + '분 전', timeToDeadLine: deadline})
        } else if (sub.second) {
            this.setState({uploadTime: sub.second.toString() + '초 전', timeToDeadLine: deadline})
        }


    }
    _computeDeadLine() {

        let deadline = global.DateStrtoObj(this.props.deadline);
        let current = global.nowKST();
        let cur = global.DateStrtoObj2(current);
        //console.log('deadline', deadline);
        //console.log('cur', cur);

        let sub = global.DateSubtraction(deadline, cur);
        if (sub.year) {
            let ba = sub.year > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.year).toString() + '년 ' + ba + '까지');
        } else if (sub.month) {
            let ba = sub.month > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.month).toString() + '개월 ' + ba + '까지');
        } else if (sub.day) {
            let ba = sub.day > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.day).toString() + '일 ' + ba + '까지');
        } else if (sub.hour) {
            let ba = sub.hour > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.hour).toString() + '시간 ' + ba + '까지');
        } else if (sub.minutes) {
            let ba = sub.minutes > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.minutes).toString() + '분 ' + ba + '까지');
        } else if (sub.second) {
            let ba = sub.second > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.second).toString() + '초 ' + ba + '까지');
        }
    }
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <View style={styles.infoms}>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>{this.props.title}</Text>
                        <Text style={styles.header_time}>{this.state.uploadTime}</Text>
                    </View>
                    <Text>{this.state.timeToDeadLine}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.acceptButtonView}>

                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}