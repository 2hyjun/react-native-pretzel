/* This page is for intending initial screen which is showing our logo and name
 to log in screen which helps users to login, find the password, or registration */

import React, { Component, } from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    Alert,
} from 'react-native';

import styles from './style';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

class login extends Component {
    constructor(props) {
        super(props);
        this._handleSignIn = this._handleSignIn.bind(this);
        this.httpRequest = this.httpRequest.bind(this);
        this.state={
            incorrectInfo: false,
            errorString: '',
            email: '',
            password: '',

        }
    }

    _handleSignIn() {
        this.setState({
            incorrectInfo: true,
            errorString: '',
        }, this.httpRequest)
    }

    httpRequest() {
        let params = {
            email: this.state.email,
            password: this.state.password,
        };
        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:8124/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }).then((res) => res.json())
            .then((resJSON) => {
                if (resJSON.resultCode === 100) {
                    Alert.alert('Login Success', "Hello, " + resJSON.result.user_name)
                } else if (resJSON.resultCode === 4) {
                    this.setState({
                        incorrectInfo: true,
                        errorString: '이메일과 비밀번호 모두 입력 해주세요.'
                    })
                } else if (resJSON.resultCode === 3) {
                    this.setState({
                        incorrectInfo: true,
                        errorString: '잘못 된 비밀번호 입니다.'
                    })
                } else if (resJSON.resultCode === 2) {
                    this.setState({
                        incorrectInfo: true,
                        errorString: '잘못 된 이메일 입니다.'
                    })
                } else {
                    this.setState({
                        incorrectInfo: true,
                        errorString: '알 수 없는 오류입니다.'
                    })
                }
            })
            .catch((err) => {
                Alert.alert("ERROR",JSON.stringify(err))
            })
            .done()
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.cell_logo}>
                    <Image source={require('../../../img/join+login/join,login_logotype.png')}
                        style={styles.logo}/>
                </View>
                <View style={styles.cell_form}>
                    <View style={styles.form_email}>
                        <View style={{flex: 1}}>
                            <Image source={require('../../../img/join+login/login_idicon.png')}
                                   style={styles.email_icon}/>
                        </View>
                        <TextInput style={styles.email_txt}
                                   placeholder={"Example@pusan.ac.kr"}
                                    keyboardType="email-address"
                                    onChangeText={(email) => this.setState({email})}
                                   autoCapitalize = 'none'/>
                    </View>
                    <View style={styles.form_pw}>
                        <View style={{flex: 1}}>
                            <Image source={require('../../../img/join+login/login_passwordicon.png')}
                                   style={styles.pw_icon}/>
                        </View>
                        <TextInput style={styles.pw_txt}
                                    placeholder="Password"
                                   secureTextEntry={true}
                                   onChangeText={(password) => this.setState({password})}
                                   autoCapitalize = 'none'
                            />
                    </View>
                    {
                        this.state.incorrectInfo ? <ErrorMsg msg={this.state.errorString}/> : undefined
                    }

                    <View style={styles.form_config}>
                        <TouchableOpacity style={styles.config_signin}
                                        onPress={this._handleSignIn}>
                            <Text style={styles.signin_txt}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.config_forgot_pw}>
                            <Text>비밀번호를 잊으셨나요?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.config_register}>
                            <Text>회원가입</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.cell_wave}>
                    <Image source={require('../../../img/join+login/login_wave.png')}
                        style={styles.wave}/>


                </View>
            </View>
        );
    }
}


export default login;
