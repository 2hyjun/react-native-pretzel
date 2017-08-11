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
} from 'react-native';
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
            content: '', // 커피
            detailInfo: '',
            expectedPrice: '',
            fee: '',
            deadLine: '배달 기한 설정',
            contentType: '', // 해주세요
            title: '',
            place: '',


            contentItem: '배달 항목 선택',
            typeItem: '방식 선택',
            isPopupShowing: false,
            isDateTimePickerVisible: false,

        };
        this.handleDateTimePick = this.handleDateTimePick.bind(this);
    }
    content_showPopOver() {
        //console.log(this.refs);
        this.setState({isPopupShowing: true});

        this.content.show();

    }
    type_showPopOver() {
        //console.log(this.refs);
        this.setState({isPopupShowing: true});
        this.type.show();
    }
    detail_showPopOver() {
        this.setState({isPopupShowing: true});
        this.detail.show();
        this.detail_input.focus();

    }
    content_setItem(index) {
        this.setState({contentItem: contents[index]});
        this.content.dismiss();
    }
    type_setItem(index) {
        this.setState({typeItem: types[index]});
        this.type.dismiss();
    }

    componentWillMount() {
        this.setState({user_email: global.user_email});
        console.log(global.now());
        console.log(global.nowKST());
    }
    handleDateTimePick(date) {
        console.log(date);
        this.setState({isDateTimePickerVisible: false});
    }
    render() {

        const elevation = this.state.isPopupShowing ? {elevation: 0} : {elevation: 5};
        return(
            <View style={styles.container}>
                    <View style={{flex: 1}}>
                        <View style={styles.contents_container}>
                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple, elevation]}
                                onPress={this.content_showPopOver.bind(this)}>
                                <Icon name="briefcase" size={20} color={'#f95a25'}/>
                                <Text style={styles.ripple_text}>#{this.state.contentItem}</Text>
                            </Ripple>

                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple, elevation]}
                                onPress={this.type_showPopOver.bind(this)}>
                                <Icon name="question" size={24} color={'#f95a25'}/>
                                <Text style={styles.ripple_text}>#{this.state.typeItem}</Text>
                            </Ripple>
                        </View>

                        <View style={styles.detail_cell_style}>
                            <Ripple
                                rippleColor={"#f95a25"}
                                rippleOpacity={0.87}
                                rippleDuration={500}
                                style={[styles.ripple_detail, elevation]}
                                onPress={this.detail_showPopOver.bind(this)}>
                                <Icon name="asterisk" size={24} color={'#f95a25'}/>
                                <Text style={styles.ripple_text}>상세 정보 작성</Text>
                            </Ripple>
                        </View>
                        <View style={styles.forms}>
                            <KeyboardAwareView>
                                <ScrollView>
                                    <Fumi style={styles.form_input}
                                          label={'수령위치'}
                                          iconClass={IconM}
                                          iconName={'place'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(email) => this.setState({email})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                    />
                                    <Fumi style={styles.form_input}
                                          label={'예상금액'}
                                          iconClass={Icon}
                                          iconName={'money'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(email) => this.setState({email})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                    />
                                    <Fumi style={styles.form_input}
                                          label={'배달금액'}
                                          iconClass={Icon}
                                          iconName={'motorcycle'}
                                          iconColor={'#f95a25'}
                                          secure={false}
                                          onTextChanged={(email) => this.setState({email})}
                                          autoCorrection={false}
                                          autoCapital={'none'}
                                    />
                                    <TouchableOpacity
                                        style={styles.deadline}
                                        onPress={() => this.setState({isDateTimePickerVisible: true})}>
                                        <IconM name="timer" size={20} color={this.state.deadLine === '배달 기한 설정' ? 'grey' : '#f95a25'}/>
                                        <Text style={styles.deadline_text}>{this.state.deadLine}</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </KeyboardAwareView>
                        </View>

                    </View>
                <PopupDialog
                    ref={(ref) => {this.content = ref}}
                    dialogAnimation = { new SlideAnimation({slideFrom: 'left'})}
                    dialogTitle={<DialogTitle title="배달 항목 선택" />}>
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
                    dialogTitle={<DialogTitle title="방식 선택" />}>
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
                    dialogTitle={<DialogTitle title="상세 정보 작성" titleTextStyle={{color: '#f95a25'}}/>}
                    actions={[
                        <DialogButton
                            text="작성 완료"
                            onPress={() => {
                                this.detail.dismiss();
                            }}
                            textContainerStyle={styles.dialog_button_detail}
                            buttonStyle={styles.dialog_button_detail}
                            textStyle={[{color: '#f95a25', textAlign: 'center'}, styles.dialog_button_detail, ]}
                            align={'center'}
                            key="button-1"
                        />,
                    ]}
                    onDismissed={() => {
                        Keyboard.dismiss();
                        this.setState({isPopupShowing: false});
                    }}
                    spellCheck={false}
                    dialogStyle={{marginTop: -300}}
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
                        />
                    </View>
                    <View style={styles.forms}>


                    </View>
                </PopupDialog>
                <DateTimePicker
                    mode="datetime"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDateTimePick}
                    onCancel={() => this.setState({isDateTimePickerVisible: false})}
                />
            </View>
        )
    }
}