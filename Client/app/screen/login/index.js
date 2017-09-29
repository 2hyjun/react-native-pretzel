import React, { Component, PropTypes } from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    Alert,
    AsyncStorage,
    ScrollView,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { encrypt } from 'react-native-simple-encryption';
import Reactoron from 'reactotron-react-native';
import { totalSize } from 'react-native-dimension';

import styles from './style';
import Fumi from '../../components/TextInputEffect/Fumi';
import DropdownAlert from '../../components/DropdownAlert';
import global from '../../config/global';
import './../../index/ReactotronConfig';

const STORAGE_KEY = '@PRETZEL:jwt';

class login extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.handleSign = this.handleSign.bind(this);
        this.httpRequest = this.httpRequest.bind(this);
        this.Register = this.Register.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentWillMount() {

    }
    FindPassword() {
        Alert.alert('', '구현중입니다.ㅠㅠ');
    }
    handleSign() {
        this.httpRequest();
    }
    Register() {
        this.props.navigation.navigate('Register');
    }
    httpRequest() {
        if (this.state.email && this.state.password) {
            const params = {
                email: this.state.email,
                password: this.state.password,
            };
            const enc1 = encrypt('thisiSfIrStSimplepretzelClientEncryptionKEy', params.password);
            params.password = encrypt('thisiSSeCONdSimplepretzelClientEncryptionKEy', enc1);
            // Reactoron.log(params.password);
            let formBody = [];
            for (const property in params) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
            Reactoron.log(formBody);

            fetch('http://13.124.147.152:8124/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            }).then((res) => res.json())
                .then((resJSON) => {
                    if (resJSON.resultCode === 100) {
                        const token = resJSON.result;
                        global.setEmail(this.state.email);
                        AsyncStorage.setItem(STORAGE_KEY, token)
                            .then(() => {
                                Reactoron.log('saved token to disk: ' + token);
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'MainTab' }),
                                    ],
                                });
                                this.props.navigation.dispatch(resetAction);
                            })
                            .catch((error) => Reactoron.log('AsynchStorage error:' + error.message))
                            .done();
                    } else {
                        this.dropdown.alertWithType('error', '로그인 실패', resJSON.result);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.dropdown.alertWithType('error', '로그인 실패', '아이디와 비밀번호 모두 입력해주세요.');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareView style={styles.kav}>
                    <ScrollView >
                        <View style={styles.cell_logo}>
                            <Image
                                source={require('../../../img/join+login/join,login_logotype.png')}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.cell_form}>
                            <View style={styles.sae_form_email}>
                                <Fumi
                                    style={{ flex: 1 }}
                                    label={'이메일'}
                                    labelStyle={{ fontSize: totalSize(2) }}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'pencil'}
                                    iconColor={'#f95a25'}
                                    secure={false}
                                    keyType={'email-address'}
                                    onTextChanged={(email) => this.setState({ email })}
                                    autoCorrection={false}
                                    autoCapital={'none'}
                                />
                            </View>
                            <View style={styles.sae_form_email}>
                                <Fumi
                                    style={{ flex: 1 }}
                                    label={'비밀번호'}
                                    labelStyle={{ fontSize: totalSize(2) }}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'lock'}
                                    iconColor={'#f95a25'}
                                    secure={true}
                                    onTextChanged={(password) => this.setState({ password })}
                                    autoCorrection={false}
                                    autoCapital={'none'}
                                />
                            </View>
                            <View style={styles.form_config}>
                                <TouchableOpacity
                                    style={styles.config_signin}
                                    onPress={this.handleSign}>
                                    <Text style={styles.signin_txt}>로그인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.config_forgot_pw}
                                    onPress={this.FindPassword}>
                                    <Text style={{ fontSize: totalSize(1.5) }}>비밀번호를 잊으셨나요?</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.config_register}
                                    onPress={this.Register}>
                                    <Text style={{ fontSize: totalSize(1.5) }}>회원가입</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.cell_wave}>
                            <Image
                                source={require('../../../img/join+login/login_wave.png')}
                                style={styles.wave}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAwareView>
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref} />
            </View>
        );
    }
}

export default login;
