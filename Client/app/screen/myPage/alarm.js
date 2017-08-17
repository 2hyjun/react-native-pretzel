import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Switch,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
} from 'react-native';
import {
    List,
    ListItem,
    Text,
} from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import DateTimePicker from 'react-native-modal-datetime-picker';
import global from '../../config/global';

const STORAGE_KEY = '@PRETZEL:time';

class alarmScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: false,
            timeStart: '',
            timeEnd: '',
        };
    }
    _onValueChange(value){
        this.setState({value: value});
        if(this.props._onValueChange){
            this.props._onValueChange(value);
        }
    }

    state = {
        isDateTimePickerVisible: true,
    };

    _showTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    _handleTimePicked = time => {
        if (Platform.OS === 'ios')
            this.setState({
                timeStart: global.nowKSTParams(time),
                isDateTimePickerVisible: false
            });
        else if (Platform.OS === 'android')
            this.setState({
                timeStart: global.nowParams(time),
                isDateTimePickerVisible: false,
            })
        this._hideTimePicker();
    };
    _handleTimePicked2 = time => {
        AsyncStorage.setItem(STORAGE_KEY)
            .then(() =>  {
                if (value !== null) {
                    this.setState({timeEnd: Number(value)});
                }
            })
            .catch((error) => console.log('AsynchStorage error:' + error.message))
            .done();
        if (Platform.OS === 'ios')
            this.setState({
                timeEnd: global.nowKSTParams(time),
                isDateTimePickerVisible: false
            });
        else if (Platform.OS === 'android')
            this.setState({
                timeEnd: global.nowParams(time),
                isDateTimePickerVisible: false,
            })
        this._hideTimePicker();
    };

    render() {
        //const { email, phone, login, dob, location } = this.props.navigation.state.params;
        return (
            <ScrollView>
                <View style={styles.parent}>
                    <List style={styles.cellOne}>
                        <ListItem style={styles.cellOneFirst}
                                  title="푸시알림 받기"
                                  hideChevron
                        />
                        <Switch style={styles.cellOneSecond}
                                onValueChange={(value) => this.setState({value: value})}
                                value={this.state.value}
                        />
                    </List>
                </View>
                <List>
                    <ListItem
                        title="시간대 설정"
                        hideChevron
                    />
                    <View style={styles.cell}>
                        <TouchableOpacity onPress={this._showTimePicker}>
                            <View style={styles.buttonStart}>
                                <Text style={{color:'white', fontSize:totalSize(3),}}>시작 시각</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>바뀐시각 : {this.state.timeStart.split(" ")[1]}</Text>
                        <DateTimePicker
                            mode="time"
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                        />
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity onPress={this._showTimePicker}>
                            <View style={styles.buttonEnd}>
                                <Text style={{color:'white', fontSize:totalSize(3)}}>종료 시각</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>바뀐시각 : {this.state.timeEnd.split(" ")[1]}</Text>
                        <DateTimePicker
                            mode="time"
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleTimePicked2}
                            onCancel={this._hideTimePicker}
                        /></View>
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'column',
        backgroundColor: '#efefef',
    },
    cellOne: {
        height: height(5),
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    cellOneFirst: { // listView
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellOneSecond: { //switch
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    buttonStart: {
        backgroundColor: '#eb6736',
        width:width(40),
        height: height(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    buttonEnd: {
        backgroundColor: '#511e81',
        width:width(40),
        height: height(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    cell: {
        flex: 1,
        height: height(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default alarmScreen;