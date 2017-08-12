/* This page is for "My page" which includes logout and sets */

import React, { Component, } from 'react';
import {
    Image,
    View,
    Button,
    TextInput,
    Text,
    TouchableHighlight,
    ListView,
    AsyncStorage,
    Alert,
} from 'react-native';

import styles from './style';
import TabBar from 'react-native-xtabbar';
import {Navigator} from 'react-native-deprecated-custom-components';
const STORAGE_KEY = '@PRETZEL:jwt';

class myPageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            user_name: '',
            user_univ: '',
            user_major: '',
        }
    }

    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }

    HTTPRequest(value) {
        return fetch('http://13.124.147.152:8124/api/timeline/mypage', {
            method: 'GET',
            headers: {
                'x-access-token': value
            }
        })
            .then((res) => res.json())
    }

    componentDidMount() {
        this.GetToken()
            .then(this.HTTPRequest)
            .then((res) => {
                console.log(res.result);

                this.setState({
                    user_email: res.myInfo.user_email,
                    user_name: res.myInfo.user_name,
                    user_univ: res.myInfo.user_univ,
                    user_major: res.myInfo.user_major,
                })
            })
            .catch((err) => console.error(err))

    }

    Setting() {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <View>
                        <TouchableHighlight onPress={this.Setting}>
                            <Image source={require('../../../img/mypage/mypage_main_settingbutton.png')}
                                   style={{marginTop:10, marginRight:10,}}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.cellTwo}>
                    <View style={styles.cellTwoOne}>
                        <View style={styles.cellTwoOnePic}>
                            <Image source={require('../../../img/mypage/mypage_main_default_profile_user.png')}
                                   style={{resizeMode:'center'}}/>

                        </View>
                        <View style={styles.cellTwoOneID}>
                            <Text>user101</Text>
                        </View>
                    </View>
                    <View style={styles.cellTwoTwo}>
                        <View style={styles.cellTwoTwoInfo}>
                            <View style={styles.cellTwoTwoInfo}>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{color:'#dae000', fontWeight:'bold',}}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{fontWeight:'bold',}}>학교</Text>
                                    </View>
                                </View>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{color:'#dae000', fontWeight:'bold',}}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{fontWeight:'bold',}}>학과</Text>
                                    </View>
                                </View>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{color:'#dae000', fontWeight:'bold',}}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{fontWeight:'bold',}}>이름</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cellTwoTwoVari}>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{textDecorationLine:'underline',}}>{this.state.user_univ}</Text>
                            </View>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{textDecorationLine:'underline',}}>{this.state.user_major}</Text>
                            </View>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{textDecorationLine:'underline',}}>{this.state.user_name}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.cellThree}>
                    <Text style={{alignSelf:'center', color:'orange'}}>요청현황</Text>

                </View>
                <View style={styles.cellFour}>
                    <Text>그그그그그 게시글 올린거</Text>

                </View>
            </View>
        );
    }
}

export default myPageScreen;