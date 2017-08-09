import React, { Component, } from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    Alert,
    AsyncStorage
} from 'react-native';

const STORAGE_KEY = '@PRETZEL:jwt';

import styles from './style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fumi from '../../components/TextInputEffect/Fumi';
//import { Fumi, } from 'react-native-textinput-effects';
import { encrypt } from 'react-native-simple-encryption';
class login extends Component {
    constructor(props) {
        super(props);
        this._handleSignIn = this._handleSignIn.bind(this);
        this.httpRequest = this.httpRequest.bind(this);
        this.Register = this.Register.bind(this);
        this.state={
            email: '',
            password: '',
        }
    }

    componentWillMount() {

    }
    _handleSignIn() {
        this.httpRequest();
    }

    static FindPassword() {
        Alert.alert('', '구현중입니다.ㅠㅠ')
    }

    Register() {
        this.props.navigation.navigate('Register')
    }
    httpRequest() {
        if (this.state.email && this.state.password) {
            let params = {
                email: this.state.email,
                password: this.state.password,
            };
            let enc1 = encrypt('thisiSfIrStSimplepretzelClientEncryptionKEy', params.password);
            params.password = encrypt('thisiSSeCONdSimplepretzelClientEncryptionKEy', enc1);
            let formBody = [];
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log(formBody);

            fetch('http://13.124.147.152:8124/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            }).then((res) => res.json())
                .then((resJSON) => {
                    console.log('hehe');
                    if (resJSON.resultCode === 100) {
                        const token = resJSON.result;

                        AsyncStorage.setItem(STORAGE_KEY, token)
                            .then(() =>  {
                                console.log('saved token to disk: ' + token);
                                this.props.navigation.navigate('Main');
                            })
                            .catch((error) => console.log('AsynchStorage error:' + error.message))
                            .done();
                    } else {
                        Alert.alert('로그인 실패', resJSON.result)
                    }


                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            Alert.alert('아이디와 비밀번호 모두 입력해주세요.');
        }


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
                              onTextChanged={(email) => this.setState({email})}
                              autoCorrection={false}
                              autoCapital={'none'}
                        />
                    </View>
                    <View style={styles.sae_form_email}>
                        <Fumi style={{flex: 1}}
                              label={'비밀번호'}
                              iconClass={FontAwesomeIcon}
                              iconName={'lock'}
                              iconColor={'#f95a25'}
                              secure={true}
                              onTextChanged={(password) => this.setState({password})}

                              autoCorrection={false}
                              autoCapital={'none'}
                        />
                    </View>
                    <View style={styles.form_config}>
                        <TouchableOpacity style={styles.config_signin}
                                        onPress={this._handleSignIn}>
                            <Text style={styles.signin_txt}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.config_forgot_pw}
                                        onPress={this.FindPassword}>
                            <Text>비밀번호를 잊으셨나요?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.config_register}
                                        onPress={this.Register}>
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
