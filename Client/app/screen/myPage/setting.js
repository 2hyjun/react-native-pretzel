/* This page is for "My page" which includes logout and sets */

import React, { Component, } from 'react';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    Alert,
} from 'react-native';

import styles from './settingStyle';

const STORAGE_KEY = '@PRETZEL:jwt';

class settingScreen extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                '비밀번호 변경', '푸시알림 설정', '피드백'
            ])
        };
    }

    Logout() {
        AsyncStorage.removeItem(STORAGE_KEY)
            .then(this.props.navigation.navigate('Login'))
            .catch((err) => console.log(err))
    };

    LogOut = () => {
        //this.props.navigation.navigate('main');
        Alert.alert('','로그아웃 하시겠습니까?',[{
                text: '네',
                onPress: (text)=>{
                    this.Logout();
                }
            },
                {
                    text:'계속있을래요',
                    onPress: (text)=> {
                        console.log('button press no')
                    }
                },

            ]
        );
    };

    handleBack = () => {
        this.props.navigation.navigate('MyPage');
    };

    Alarm = () => {
        this.props.navigation.navigate('Alarm');
    };


    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <TouchableHighlight onPress={this.handleBack}>
                        <Image source={require('../../../img/basic/basic_arrow_left.png')}
                               style={{resizeMode:'center'}}/>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight onPress={this.LogOut}>
                    <View style={styles.cellTwo}>
                        <Text style={{color: '#ff6666'}}>로그아웃</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.cellThree}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text>비밀번호 변경</Text>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.Alarm}>
                                <Text>푸시알림 설정</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text>피드백</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default settingScreen;
