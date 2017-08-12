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
        "place": PropTypes.string.isRequired

    };


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            uploadTime: '',
            timeToDeadLine: '',
        };
        this._computeDeadLine = this._computeDeadLine.bind(this);
        this._computeUploadTime = this._computeUploadTime.bind(this);
    }
    componentDidMount() {
        this._computeDeadLine();
        this._computeUploadTime();
        //console.log(this.props.time);
    }

    _computeUploadTime() {
        //console.log(this.props.deadline);
        let deadline = global.DateStrtoObj(this.props.deadline);
        let current = global.nowKST();
        console.log(deadline, current)
        //let current = global.DateStrtoObj(global.nowKST());
        //console.log(deadline, current);


    }
    _computeDeadLine() {
        let uptime = this.props.time;

    }
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.infoms}>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>{this.props.title}</Text>
                        <Text style={styles.header_time}>{this.props.time}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.acceptButtonView}>
                        <Text>{this.props.deadline}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}