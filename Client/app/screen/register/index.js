import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import styles from './style';
import Fumi from '../../components/TextInputEffect/Fumi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';

import { Hoshi } from 'react-native-textinput-effects';

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

        this.HandleTextChange = this.HandleTextChange.bind(this);
        this.HandleWarningState = this.HandleWarningState.bind(this);
        this.Register = this.Register.bind(this);

    }
    componentDidMount() {
        this.HandleWarningState();
    }

    Register() {
        console.log('state: ', this.state);
    }
    HandleTextChange(stateStr, value) {
        if (stateStr === 'email')
            this.setState({email: value});

        else if (stateStr === 'password')
            this.setState({password: value});

        else if (stateStr === 'password_confirm')
            this.setState({password_confirm: value});

        else if (stateStr === 'name')
            this.setState({name: value});

        else if (stateStr === 'univ')
            this.setState({univ: value});

        else if (stateStr === 'major')
            this.setState({major: value});


    }

    HandleWarningState() {


    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cell_logo}>
                    <Image source={require('../../../img/join+login/join,login_logotype.png')}
                           />
                </View>
                <View style={styles.cell_form}>
                    <View style={styles.cell_info}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: '#f95a25',
                        }}>
                            6개 항목을 모두 입력해주세요.
                        </Text>
                    </View>


                    {/*<ScrollView style={styles.form_scroll}*/}
                                {/*ref={ref => this.scrollView = ref}*/}
                                {/*onContentSizeChange={( contentWidth, contentHeight ) => {*/}
                                    {/*this._contentHeight = contentHeight*/}
                                {/*}}>*/}
                        <Fumi
                            ref="email"
                            style={styles.textInput}
                            label={'이메일'}
                            iconClass={FontAwesomeIcon}
                            iconName={'envelope'}
                            iconColor={'#f95a25'}
                            secure={false}
                            onTextChanged={(email) => this.HandleTextChange('email', email)}
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
                            onTextChanged={(name) => this.HandleTextChange('name', name)}
                            onEndEditing={this.HandleWarningState}
                            autoCorrection={false}
                            autoCapital={'none'}/>
                        <Fumi
                            ref="password"
                            style={styles.textInput}
                            label={'비밀번호'}
                            iconClass={FontAwesomeIcon}
                            iconName={'unlock-alt'}
                            iconColor={'#f95a25'}
                            secure={true}
                            onTextChanged={(password) => this.HandleTextChange('password', password)}
                            onEndEditing={this.HandleWarningState}
                            autoCorrection={false}
                            autoCapital={'none'}/>
                        <Fumi
                            ref="password_confirm"
                            style={styles.textInput}
                            label={'비밀번호 확인'}
                            iconClass={FontAwesomeIcon}
                            iconName={'unlock-alt'}
                            iconColor={'#f95a25'}
                            secure={true}
                            onTextChanged={(password_confirm) => this.HandleTextChange('password_confirm', password_confirm)}
                            onEndEditing={this.HandleWarningState}
                            autoCorrection={false}
                            autoCapital={'none'}/>
                        <Fumi
                            ref="univ"
                            style={styles.textInput}
                            label={'소속 대학'}
                            iconClass={FontAwesomeIcon}
                            iconName={'university'}
                            iconColor={'#f95a25'}
                            secure={false}
                            onTextChanged={(univ) => this.HandleTextChange('univ', univ)}
                            onEndEditing={this.HandleWarningState}
                            autoCorrection={false}
                            autoCapital={'none'}/>
                        <Fumi
                            ref="major"
                            style={styles.textInput}
                            label={'소속 학과'}
                            iconClass={FontAwesomeIcon}
                            iconName={'graduation-cap'}
                            iconColor={'#f95a25'}
                            secure={false}
                            onTextChanged={(major) => this.HandleTextChange('major', major)}
                            onEndEditing={this.HandleWarningState}
                            autoCorrection={false}
                            autoCapital={'none'}/>

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