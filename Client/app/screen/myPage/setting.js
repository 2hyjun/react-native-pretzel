/* This page is for "My page" which includes logout and sets */

import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    ListView,
    Alert,
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import styles from './settingStyle';
import socket from '../../config/socket.io';

class settingScreen extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
                '비밀번호 변경', '푸시알림 설정', '피드백',
            ]),
        };
    }

    Logout() {
        AsyncStorage.getAllKeys()
            .then((values) => {
                AsyncStorage.multiRemove(values)
                    .then(() => {
                        socket.disconnect();
                        this.props.navigation.navigate('auth');
                    })
                    .catch((e) => { console.error(e); });
            });
    }

    LogOut = () => {
        // this.props.navigation.navigate('main');
        Alert.alert('', '로그아웃 하시겠습니까?', [
            {
                text: '네',
                onPress: () => {
                    this.Logout();
                },
            },
            {
                text: '계속있을래요',
                onPress: () => {
                    Reactotron.log('button press no');
                },
            },
        ]);
    };

    handleBack = () => {
        this.props.navigation.goBack();
    };

    Alarm = () => {
        this.props.navigation.navigate('Alarm');
    };


    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <TouchableOpacity onPress={this.handleBack}>
                        <Image
                            source={require('../../../img/basic/basic_arrow_left.png')}
                            style={{ resizeMode: 'center' }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.LogOut}>
                    <View style={styles.cellTwo}>
                        <Text style={{ color: '#ff6666' }}>로그아웃</Text>
                    </View>
                </TouchableOpacity>

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
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => { this.props.navigation.navigate('auth') ;}}>
                            <Text>피드백</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default settingScreen;
