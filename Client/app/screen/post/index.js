import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image,
    Keyboard,
    AsyncStorage
} from 'react-native';
const STORAGE_KEY = '@PRETZEL:jwt';

import ToggleBox from '../../components/ToggleBox';
import styles from './style';
import global from '../../config/global';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareView }from 'react-native-keyboard-aware-view';
import PopupDialog, {
    DialogTitle,
    SlideAnimation,
    ScaleAnimation,
    DialogButton,
} from 'react-native-popup-dialog';
import Picker from 'react-native-wheel-picker'
import Fumi from '../../components/TextInputEffect/Fumi';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropdownAlert from '../../components/DropdownAlert';



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


const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];
const types = ['해주세요', '해줄게요', '같이해요'];

export default class post extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user_email: '',
            content: '배달 항목 선택', // 커피
            detailInfo: '',
            expectedPrice: '',
            fee: '',
            deadLine: '배달 기한 설정',
            contentType: '방식 선택', // 해주세요
            title: '',
            place: '',
            elevationToZero: false,

            contentItem: '',
            typeItem: '',
            isPopupShowing: false,
            isDateTimePickerVisible: false,

        };
        this._submit = this._submit.bind(this);
        this.GetToken = this.GetToken.bind(this);

        this.handleDateTimePick = this.handleDateTimePick.bind(this);
        this.content_showPopOver = this.content_showPopOver.bind(this);
        this.type_showPopOver = this.type_showPopOver.bind(this);
        this.detail_showPopOver = this.detail_showPopOver.bind(this);
        this.HttpRequest = this.HttpRequest.bind(this);
        this.content_setItem = this.content_setItem.bind(this);
        this.type_setItem = this.type_setItem.bind(this);

    }
    content_showPopOver() {
        //console.log(this.refs);
        this.setState({elevationToZero: true});

        this.content.show();

    }
    type_showPopOver() {
        //console.log(this.refs);
        this.setState({elevationToZero: true});
        this.type.show();
    }
    detail_showPopOver() {
        this.setState({elevationToZero: true});
        this.detail.show();
        this.detail_input.focus();
    }
    content_setItem(index) {
        this.setState({content: contents[index]});
        this.content.dismiss();
    }
    type_setItem(index) {
        this.setState({contentType: types[index]});
        this.type.dismiss();
    }

    componentWillMount() {
        this.setState({user_email: global.user_email});
        console.log(global.now());
        console.log(global.nowKST());
    }
    handleDateTimePick(date) {
        console.log(global.nowKstParms(date));
        this.setState({
            deadLine: global.nowKstParms(date),
            isDateTimePickerVisible: false
        });
    }
    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }
    HttpRequest(token) {
        let params = {
            content: this.state.content,
            expectedPrice: this.state.expectedPrice,
            fee: this.state.fee,
            deadLine: this.state.deadLine,
            detailInfo: this.detailTxt,
            contentType: this.state.contentType,
            title: this.state.title,
            place: this.state.place,
        };
        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            console.log(encodedKey + "=" + encodedValue);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join('&');
        console.log(formBody);
        return (
            fetch('http://13.124.147.152:8124/api/timeline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': token,
                },
                body: formBody,
            }).then((res) => res.json())
        )
    }

    _submit() {
        this.GetToken()
            .then(this.HttpRequest)
            .then((rJSON) => {
                if (rJSON.resultCode === 100) {
                    this.setState({elevationToZero: true}, () => {
                        this.dropdown.alertWithType('success', '글 작성 성공', '');

                        setTimeout(() => {
                            this.props.navigation.navigate('Timeline')
                        }, 1000);
                    });

                }
                else {
                    this.setState({elevationToZero: true}, () => {
                        this.dropdown.alertWithType('error', '글 작성 실패', rJSON.result);
                    });

                }

            })
    }
    render() {

        const elevation = this.state.elevationToZero ? {elevation: 0} : {elevation: 5};
        const deadLineText = this.state.deadLine === '배달 기한 설정' ? {color: 'grey'} : {color: '#f95a25'};
        console.log(this.state.elevationToZero);
        return(
            <View style={styles.container}>
                    <View style={{flex: 1, marginTop: 30}}>
                        <View style={styles.contents_container}>
                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple, elevation]}
                                onPress={this.content_showPopOver.bind(this)}>
                                {/*<Icon name="briefcase" size={20} color={'#f95a25'}/>*/}
                                <Text style={{fontSize: 25, color: '#f95a25'}}>#</Text>
                                <Text style={styles.ripple_text}>{this.state.content}</Text>
                            </Ripple>

                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple, elevation]}
                                onPress={this.type_showPopOver.bind(this)}>
                                {/*<Icon name="question" size={24} color={'#f95a25'}/>*/}
                                <Text style={{fontSize: 25, color: '#f95a25'}}>#</Text>
                                <Text style={styles.ripple_text}>{this.state.contentType}</Text>
                            </Ripple>
                        </View>

                        <View style={styles.detail_cell_style}>
                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple_detail, elevation]}
                                onPress={this.detail_showPopOver.bind(this)}>
                                {/*<Icon name="asterisk" size={24} color={'#f95a25'}/>*/}
                                <Text style={{fontSize: 25, color: '#f95a25'}}>#</Text>
                                <Text style={styles.ripple_text}>상세 정보 작성</Text>
                            </Ripple>
                        </View>
                        <View style={styles.forms}>
                            <KeyboardAwareView >
                                <ScrollView>
                                    <Fumi style={styles.form_input}
                                          label={'제목'}
                                          iconClass={IconM}
                                          iconName={'title'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(title) => this.setState({title})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                    />
                                    <Fumi style={styles.form_input}
                                          label={'수령위치'}
                                          iconClass={IconM}
                                          iconName={'place'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(place) => this.setState({place})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                    />
                                    <Fumi style={styles.form_input}
                                          label={'예상금액 (숫자만)'}
                                          iconClass={Icon}
                                          iconName={'money'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(expectedPrice) => this.setState({expectedPrice})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                          keyType={"decimal-pad"}
                                    />
                                    <Fumi style={styles.form_input}
                                          label={'배달금액 (숫자만)'}
                                          iconClass={Icon}
                                          iconName={'motorcycle'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(fee) => this.setState({fee})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                          keyType="decimal-pad"
                                    />
                                    <TouchableOpacity
                                        style={styles.deadline}
                                        onPress={() => this.setState({isDateTimePickerVisible: true})}>
                                        <IconM name="timer" size={20} color={this.state.deadLine === '배달 기한 설정' ? 'grey' : '#f95a25'}/>
                                        <Text style={[styles.deadline_text, deadLineText]}>{this.state.deadLine}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.submitBtn}
                                        onPress={this._submit}>
                                        <Text style={styles.submitTxt}>
                                            글 작성
                                        </Text>
                                    </TouchableOpacity>

                                </ScrollView>
                            </KeyboardAwareView>
                        </View>

                    </View>
                <PopupDialog
                    ref={(ref) => {this.content = ref}}
                    dialogAnimation = { new SlideAnimation({slideFrom: 'left'})}
                    dialogTitle={<DialogTitle title="배달 항목 선택" />}
                    onDismissed={() => this.setState({elevationToZero: false})}>
                    <View style={styles.dialogContentView}>
                        <Picker style={{width: 150, height: 180}}
                            //selectedValue={this.state.contentItem}
                                itemStyle={{color:"grey", fontSize:26}}
                                onValueChange={(index) => this.content_setItem(index)}>
                            {contents.map((value, i) => (
                                <Picker.Item label={value} value={i} key={value}/>
                            ))}
                        </Picker>
                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(ref) => {this.type = ref}}
                    dialogAnimation = { new SlideAnimation({slideFrom: 'right'})}
                    dialogTitle={<DialogTitle title="방식 선택" />}
                    onDismissed={() => this.setState({elevationToZero: false})}>
                    <View style={styles.dialogContentView}>
                        <Picker style={{width: 150, height: 180}}
                                selectedValue={this.state.contentItem}
                                itemStyle={{color:"grey", fontSize:26}}
                                onValueChange={(index) => this.type_setItem(index)}>
                            {types.map((value, i) => (
                                <Picker.Item label={value} value={i} key={value}/>
                            ))}
                        </Picker>

                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(ref) => {this.detail = ref}}
                    dialogAnimation = { new ScaleAnimation()}
                    dialogTitle={<DialogTitle title="상세 정보 작성" titleTextStyle={{color: '#f95a25'}}
                    />}
                    // actions={[
                    //     <DialogButton
                    //         text="작성 완료"
                    //         onPress={() => {
                    //             this.detail.dismiss();
                    //         }}
                    //         textContainerStyle={styles.dialog_button_detail}
                    //         buttonStyle={styles.dialog_button_detail}
                    //         textStyle={[{color: '#f95a25', textAlign: 'center'}, styles.dialog_button_detail, ]}
                    //         align={'center'}
                    //         key="button-1"
                    //     />,
                    // ]}
                    onDismissed={() => {
                        Keyboard.dismiss();
                        this.setState({
                            isPopupShowing: false,
                            elevationToZero: false,
                        });
                    }}
                    spellCheck={false}
                    dialogStyle={{marginTop: -250}}
                >
                    <View style={styles.detailInfo}>
                        <TextInput
                            clearButtonMode="always"
                            ref={(ref) => this.detail_input = ref}
                            multiline={true}
                            numberOfLines={6}
                            spellCheck={false}
                            style={styles.detail_input}
                            placeholder={'12시까지 제도관 학생회실로 노스커피 아이스 아메리카노 4잔 배달해주세요.'}
                            onChangeText={(value) => this.detailTxt = value}

                        />
                    </View>
                    <View style={styles.detail_done}>
                        <TouchableOpacity
                            style={{width: 300}}
                            onPress={() => { this.detail.dismiss() }}>
                            <Text style={{fontSize: 18, color: '#f95a25', textAlign: 'center'}}>작성 완료</Text>
                        </TouchableOpacity>

                    </View>
                </PopupDialog>

                <DateTimePicker
                    mode="datetime"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDateTimePick}
                    onCancel={() => this.setState({isDateTimePickerVisible: false})}
                />
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref}
                    onCancel={() => this.setState({elevationToZero: false})}
                    onClose={() => this.setState({elevationToZero: false})}
                />
            </View>
        )
    }
}