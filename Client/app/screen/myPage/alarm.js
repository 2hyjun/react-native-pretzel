import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Switch,
    View,
    TouchableOpacity,
    TimePickerAndroid,
} from 'react-native';
import {
    List,
    ListItem,
    Text,
} from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import { BoxShadow } from 'react-native-shadow';
import DateTimePicker from 'react-native-modal-datetime-picker';


class alarmScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: false};
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
        console.log('A date has been picked: ', time);
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
                        <Text style={{color: '#ff6666', margin: 10}}>시작 시간</Text>

                    <TouchableOpacity onPress={this._showTimePicker}>
                        <View style={styles.button}>
                            <Text>시작 시각 정하기</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={this._hideTimePicker}
                    />
                        <Text style={{color: '#0066cc', margin: 10}}>종료 시간</Text>

                    <TouchableOpacity onPress={this._showTimePicker}>
                        <View style={styles.button}>
                            <Text>종료료 시각 정하기</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={this._hideTimePicker}
                    />

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
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

});




export default alarmScreen;