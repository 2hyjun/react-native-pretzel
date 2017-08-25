/* no-console: 0 */
import React, { PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    AsyncStorage,
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import { height, width, totalSize } from 'react-native-dimension';
import styles from './style';
import global from '../../config/global';

// const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];
const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
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
        user_email: PropTypes.string.isRequired,
        // content: PropTypes.oneOf(contents).isRequired,
        // detailInfo: PropTypes.string.isRequired,
        // expectedPrice: PropTypes.number.isRequired,
        fee: PropTypes.number.isRequired,
        deadline: PropTypes.string.isRequired,
        rid: PropTypes.number.isRequired,
        // contentType: PropTypes.oneOf(['해주세요', '해줄게요', '같이해요']).isRequired,
        title: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        onNavigate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            uploadTime: '',
            timeToDeadLine: '',
            minimizedPlace: '',
            minimizedTitle: '',
        };
        this._computeDeadLine = this._computeDeadLine.bind(this);
        this._computeUploadTime = this._computeUploadTime.bind(this);
        this._minimizePlace = this._minimizePlace.bind(this);
        this._minimizeTitle = this._minimizeTitle.bind(this);
        this._handleAccept = this._handleAccept.bind(this);
    }
    componentDidMount() {
        this._computeDeadLine()
            .then(this._minimizePlace)
            .then(this._minimizeTitle)
            .then(this._computeUploadTime);
    }
    _minimizeTitle(obj) {
        let title = this.props.title;
        const isKorean = global.CheckKorean(title);
        if (isKorean) {
            if (title.length >= 14)
                title = title.substring(0, 13) + '..';
            obj.title = title;
        } else {
            if (title.length >= 22)
                title = title.substring(0, 22) + '..';
            obj.title = title;
        }

        return Promise.resolve(obj);
    }
    _minimizePlace(deadline) {
        const obj = {};
        obj.deadline = deadline;
        let location = this.props.place;
        const isKorean = global.CheckKorean(location);
        if (isKorean) {
            if (location.length >= 5)
                location = location.substring(0, 4) + '..';
            obj.location = location;
        } else {
            if (location.length >= 7)
                location = location.substring(0, 6) + '..';
            obj.location = location;
        }
        return Promise.resolve(obj);
    }
    _computeUploadTime(obj) {
        // console.log(this.props.deadline);
        const uptime = global.DateStrtoObj(this.props.time);
        const cur = global.nowKST();
        // Reactotron.log(obj.title, cur, uptime);
        // Reactotron.log(cur);
        // Reactotron.log(uptime);

        const sub = global.DateSubtraction(cur, uptime);
        // console.log(this.props.title, sub);
        sub.year = Math.abs(sub.year);
        sub.month = Math.abs(sub.month);
        sub.day = Math.abs(sub.day);
        sub.hour = Math.abs(sub.hour);
        sub.minutes = Math.abs(sub.minutes);
        sub.second = Math.abs(sub.second);
        // Reactotron.log(sub);

        if (sub.year) {
            this.setState({uploadTime: sub.year.toString() + '년 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        } else if (sub.month) {
            this.setState({uploadTime: sub.month.toString() + '개월 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        } else if (sub.day) {
            this.setState({uploadTime: sub.day.toString() + '일 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        } else if (sub.hour) {
            this.setState({uploadTime: sub.hour.toString() + '시간 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        } else if (sub.minutes) {
            this.setState({uploadTime: sub.minutes.toString() + '분 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        } else if (sub.second) {
            this.setState({uploadTime: sub.second.toString() + '초 전', timeToDeadLine: obj.deadline, minimizedPlace: obj.location, minimizedTitle: obj.title});
        }
    }
    _computeDeadLine() {
        const deadline = global.DateStrtoObj(this.props.deadline);
        const cur = global.nowKST();
        // console.log('deadline', deadline);
        // console.log('cur', cur);

        const sub = global.DateSubtraction(deadline, cur);
        if (sub.year) {
            const ba = sub.year > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.year).toString() + '년 ' + ba + '까지');
        } else if (sub.month) {
            const ba = sub.month > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.month).toString() + '개월 ' + ba + '까지');
        } else if (sub.day) {
            const ba = sub.day > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.day).toString() + '일 ' + ba + '까지');
        } else if (sub.hour) {
            const ba = sub.hour > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.hour).toString() + '시 ' + ba + '까지');
        } else if (sub.minutes) {
            const ba = sub.minutes > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.minutes).toString() + '분 ' + ba + '까지');
        } else if (sub.second) {
            const ba = sub.second > 0 ? '후' : '전';
            return Promise.resolve(Math.abs(sub.second).toString() + '초 ' + ba + '까지');
        }
    }
    _handleAccept() {
        Alert.alert('', this.props.user_email + '님과의 채팅화면으로 이동하시겠습니까?', [{
            text: '네',
            onPress: () => {
                const props = {
                    user_email: global.user_email,
                    partner_email: this.props.user_email,
                };
                // this.props.navigation.navigate('Chat', { user:  'Lucy' });
                AsyncStorage.getItem(ChatListSTORAGEKEY)
                    .then((value) => {
                        if (value) {
                            return new Promise.resolve(JSON.parse(value));
                        } else {
                            return new Promise.resolve([]);
                        }
                    })
                    .then((list) => {
                        list.push({
                            user_email: global.user_email,
                            partner_email: props.partner_email,
                            title: this.props.title,
                            rid: this.props.rid,
                        });
                        AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                            .then(() => console.log(JSON.stringify(list), 'saved'))
                            .catch(e => console.error(e))
                            .done();
                    })
                    .catch(e => console.error(e))
                    .done();
                this.props.onNavigate('ChatRoom',
                    {
                        user_email: global.user_email,
                        partner_email: this.props.user_email,
                        title: this.props.title,
                        rid: this.props.rid,
                    });
            },
        }, {
            text: '아니오',
            onPress: () => {

            },
        }]);
    }
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <View style={styles.infoms}>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>{this.state.minimizedTitle}</Text>
                        <Text style={styles.header_time}>{this.state.uploadTime}</Text>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.body_location}>
                            <View style={styles.body_header}>
                                <Text style={styles.body_header_text}>위치</Text>
                                <View style={styles.body_header_line}/>
                            </View>
                            <View style={styles.body_body}>
                                <Text style={styles.body_body_text}>{this.state.minimizedPlace}</Text>
                            </View>
                        </View>
                        <View style={styles.body_fee}>
                            <View style={styles.body_header}>
                                <Text style={styles.body_header_text}>배달비</Text>
                                <View style={styles.body_header_line}/>
                            </View>
                            <View style={styles.body_body}>
                                <Text style={styles.body_body_text}>{this.props.fee}원</Text>
                            </View>
                        </View>
                        <View style={styles.body_deadline}>
                            <View style={styles.body_header}>
                                <Text style={styles.body_header_text}>시간</Text>
                            </View>
                            <View style={styles.body_body}>
                                <Text style={styles.body_body_text}>{this.state.timeToDeadLine}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View>
                    <TouchableOpacity
                        style={styles.acceptButtonView}
                        onPress={this._handleAccept}
                    >
                        <Text style={styles.acceptButtonTxt1}>수</Text>
                        <Text style={styles.acceptButtonTxt2}>락</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}