import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Picker,
    Image
} from 'react-native';

import ToggleBox from '../../components/ToggleBox';
import styles from './style';
import global from '../../config/global';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import { Select, Option } from 'react-native-chooser';
/*
            * "user_email": "biper94@gmail.com",
            "content": "커피",
            "detailInfo": "나 2시 45분에 수업끈나고 스타벅스갔다가 올라올건데 커피 필요한 사람있음? 선착 10",
            "expectedPrice": 4500,
            "fee": 3000,
            "deadline": "2017-07-25T06:00:00.000Z",
            "rid": 2,
            "contentType": "해줄게요",
            "completed": "N",
            "title": "UPDATE SAMPLE HEHE2",
            "time": "2017-08-03T05:42:04.000Z",
            "place": "정문 스타벅스"*/

export default class post extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user_email: '',
            content: '', // 커피
            detailInfo: '',
            expectedPrice: '',
            fee: '',
            deadLine: '',
            contentType: '', // 해주세요
            title: '',
            place: ''
        }
    }

    componentWillMount() {
        this.setState({user_email: global.user_email})
    }
    render() {
        return(
            <View style={styles.container}>

                <TextInput
                    style={{marginTop: 40, height: 40, borderColor: 'grey', borderWidth: 1}}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={(detailInfo) => this.setState({detailInfo})}
                    value={this.state.detailInfo}
                    placeholder={'상세설명'}
                />






            </View>


        )
    }
}