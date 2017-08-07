import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';


import styles from './style';
import Fumi from '../../components/TextInputEffect/Fumi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'



export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            name: '',
            univ: '',
            major: ''
        };
        this.Register = this.Register.bind(this);
        this._scrollToInput = this._scrollToInput.bind(this);
    }

    Register() {
        let params = {
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            name: this.state.name,
            univ: this.state.univ,
            major: this.state.major,
        };
        let formBody = [];
        if (!params.email || !params.password || !params.password_confirm || !params.name ||
            !params.univ || !params.major)
            Alert.alert('', '6개 항목을 모두 입력해주세요.');
        else if (this.state.password !== this.state.password_confirm)
            Alert.alert('', '비밀번호와 비밀번호 확인 값이 다릅니다.');
        else {
            //params.password = cryptDecrypt('pretzelWOwAwesome', params.password);
            for (let property in params) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('http://localhost:8124/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            }).then((res) => res.json())
                .then((rJSON) => {
                    if (rJSON.resultCode === 100) {
                        Alert.alert('회원가입 성공');
                    } else {
                        Alert.alert('회원가입 실패', rJSON.result)
                    }
                })
                .catch((err) => console.error(err))
        }



    }

    _scrollToInput (reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.refs.scroll.scrollToFocusedInput(reactNode)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cell_logo}>
                    <Image source={require('../../../img/join+login/join,login_logotype.png')}
                           style={styles.logo}/>
                </View>
                <View style={styles.cell_form}>
                    <View style={styles.cell_info}>

                    </View>


                    {/*<ScrollView style={styles.form_scroll}*/}
                                {/*ref={ref => this.scrollView = ref}*/}
                                {/*onContentSizeChange={( contentWidth, contentHeight ) => {*/}
                                    {/*this._contentHeight = contentHeight*/}
                                {/*}}>*/}
                    <KeyboardAwareView
                        animated={false}

                        >
                        <ScrollView
                            ref="scroll"
                            contentContainerStyle={{paddingVertical: 20}}
                        >
                            <Fumi
                                ref="email"
                                style={styles.textInput}
                                label={'이메일'}
                                iconClass={FontAwesomeIcon}
                                iconName={'envelope'}
                                iconColor={'#f95a25'}
                                secure={false}
                                onTextChanged={(email) => this.setState({email})}
                                autoCorrection={false}

                                autoCapital={'none'}/>
                            <Fumi
                                ref="name"
                                style={styles.textInput}
                                label={'이름'}
                                iconClass={FontAwesomeIcon}
                                iconName={'user-circle-o'}
                                iconColor={'#f95a25'}
                                secure={false}
                                onTextChanged={(name) => this.setState({name})}
                                autoCorrection={false}
                                myOnFocus={() =>
                                    this.refs.scroll.scrollTo({x: 0, y: 70, animated: true})
                                }
                                autoCapital={'none'}/>
                            <Fumi
                                ref="password"
                                style={styles.textInput}
                                label={'비밀번호'}
                                iconClass={FontAwesomeIcon}
                                iconName={'unlock-alt'}
                                iconColor={'#f95a25'}
                                secure={true}
                                onTextChanged={(password) => this.setState({password})}
                                autoCorrection={false}
                                myOnFocus={() =>
                                    this.refs.scroll.scrollTo({x: 0, y: 100, animated: true})
                                }
                                autoCapital={'none'}/>
                            <Fumi
                                ref="password_confirm"
                                style={styles.textInput}
                                label={'비밀번호 확인'}
                                iconClass={FontAwesomeIcon}
                                iconName={'unlock-alt'}
                                iconColor={'#f95a25'}
                                secure={true}
                                onTextChanged={(password_confirm) => this.setState({password_confirm})}
                                autoCorrection={false}
                                myOnFocus={() =>
                                    this.refs.scroll.scrollTo({x: 0, y: 130, animated: true})
                                }
                                autoCapital={'none'}/>
                            <Fumi
                                ref="univ"
                                style={styles.textInput}
                                label={'소속 대학'}
                                iconClass={FontAwesomeIcon}
                                iconName={'university'}
                                iconColor={'#f95a25'}
                                secure={false}
                                onTextChanged={(univ) => this.setState({univ})}
                                autoCorrection={false}
                                myOnFocus={() =>
                                    this.refs.scroll.scrollTo({x: 0, y: 200, animated: true})
                                }
                                autoCapital={'none'}/>
                            <Fumi
                                ref="major"
                                style={styles.textInput}
                                label={'소속 학과'}
                                iconClass={FontAwesomeIcon}
                                iconName={'graduation-cap'}
                                iconColor={'#f95a25'}
                                secure={false}
                                onTextChanged={(major) => this.setState({major})}
                                autoCorrection={false}
                                myOnFocus={() => {
                                    this.refs.scroll.scrollTo({x: 0, y: 250, animated: true})
                                    //this._scrollToInput(ReactNative.findNodeHandle(event.target))
                                }}
                                autoCapital={'none'}/>
                            {/*<View>*/}
                                {/*<Text style={{*/}
                                    {/*textAlign: 'center',*/}
                                    {/*fontWeight: 'bold',*/}
                                    {/*fontSize: 17,*/}
                                    {/*color: '#f95a25',*/}
                                {/*}}>*/}
                                    {/*키보드를 내리면 회원가입 버튼이 있습니다. 찡긋*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        </ScrollView>
                    </KeyboardAwareView>

                </View>

                <View style={styles.cell_register}>
                    <TouchableOpacity style={styles.registerBtn}
                                        onPress={this.Register}>
                        <Text style={styles.registerTxt}>회원 가입</Text>
                    </TouchableOpacity>
                </View>
                {/*<View style={styles.cell_wave}>*/}
                    {/*<Image source={require('../../../img/join+login/login_wave.png')}*/}
                           {/*style={styles.wave}/>*/}
                {/*</View>*/}

            </View>
        );
    }
}