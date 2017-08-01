import React, { Component, } from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    Alert,
    TextInput,
} from 'react-native';

import styles from './style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fumi from '../../components/TextInputEffect/Fumi';
//import { Fumi, } from 'react-native-textinput-effects';

class login extends Component {
    constructor(props) {
        super(props);
        this._handleSignIn = this._handleSignIn.bind(this);
        this.httpRequest = this.httpRequest.bind(this);
        this.state={
            email: '',
            password: '',
        }
    }

    componentWillMount() {
        fetch('http://localhost:8124/')
            .then((res) => res.json())
            .then((rJSON) => {
                if (rJSON.resultCode === 100) {
                    Alert.alert('Hi!')
                }
            })
            .catch((err) => console.error(err))
            .done();
    }
    _handleSignIn() {
        this.httpRequest();
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

        fetch('http://127.0.0.1:8124/login', {
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
                    Alert.alert('이메일과 비밀번호 모두 입력 해주세요.');
                } else if (resJSON.resultCode === 3) {
                    Alert.alert('잘못 된 비밀번호 입니다.');
                } else if (resJSON.resultCode === 2) {
                    Alert.alert('등록 되지 않은 이메일 입니다')
                } else {
                    Alert.alert('알 수 없는 오류입니다.')
                }
            })
            .catch((err) => {
                console.error(err)
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
                    <View style={styles.sae_form_email}>
                        <Fumi style={{flex: 1}}
                              label={'이메일'}
                              iconClass={FontAwesomeIcon}
                              iconName={'pencil'}
                              iconColor={'#f95a25'}
                              secure={false}
                              onTextChanged={(email) => this.setState({email}, console.log(this.state))}
                              keyType="email-address"
                              autoCorrection={false}
                              autoCapital={'none'}
                        />
                        {/*<Jiro*/}
                            {/*style={{flex: 1, marginTop: 20, marginBottom: 20}}*/}
                            {/*label={"이메일"}*/}
                            {/*borderColor={'#f95a25'}*/}
                            {/*inputStyle={{color: 'white'}}*/}
                            {/*secureTextEntry={true}/>*/}
                    </View>
                    <View style={styles.sae_form_email}>
                        <Fumi style={{flex: 1}}
                              label={'비밀번호'}
                              iconClass={FontAwesomeIcon}
                              iconName={'lock'}
                              iconColor={'#f95a25'}
                              secure={true}
                              onTextChanged={(password) => this.setState({password})}
                              keyType="number-pad"
                              autoCorrection={false}
                              autoCapital={'none'}
                        />
                        {/*<Jiro*/}
                            {/*style={{flex: 1, marginTop: 20, marginBottom: 20}}*/}
                            {/*label={"비밀번호"}*/}
                            {/*borderColor={'#f95a25'}*/}
                            {/*inputStyle={{color: 'white'}}*/}
                            {/*secureTextEntry={true}/>*/}


                    </View>
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
