/* This page is for making order. You can choose which notice board you
 want to display your order, what you want to do */

import React, { Component, } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    TextInput,
    Text,
    ScrollView,
    PickerIOS,
    Platform
} from 'react-native';

import styles from './styleMkOrder';
import TogglePicker from 'react-native-toggle-picker';
//import SmartPicker from 'react-native-smart-picker';
import TabBar from 'react-native-xtabbar';


/*
class makeOrderScreen extends Component {
    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <Text> logoBar </Text>
                </View>
                <View style={styles.cellTwo}>
                    <Text> Choose Categories </Text>
                </View>
                <ScrollView style={styles.cellThree}>
                    <TogglePicker
                        selectedValue='CZ'
                        label='First Toggle : What to order'
                    >
                        <Picker.Item label='Austria' value='A' />
                        <Picker.Item label='Czechia' value='CZ' />
                        <Picker.Item label='Germany' value='DE' />
                        <Picker.Item label='Poland' value='PL' />
                        <Picker.Item label='Slovakia' value='SLO' />
                    </TogglePicker>
                </ScrollView>

                <View style={styles.cellFour}>
                    <Text> Second Toggle : Who will run </Text>
                </View>
                <View style={styles.cellFive}>
                    <Text> NextButton </Text>
                </View>
                <View style={styles.cellSix}>
                    <Text> FooterBar </Text>
                </View>
            </View>
        );
    }
}
*/

class makeOrderScreen extends Component {
    constructor(props){
        super(props);
    }
    handleChange = () => {
        Alert.alert('back');
        //나중에 네비게이션 넣기
        //this.props.navigation.navigate('NoticeBoard');
    }

    render() {
        return (
            <View>
            <ScrollView>
                <View style={{flex: 1, marginTop: 20}}>
                    <ScrollView style>
                        <TogglePicker
                            selectedValue='CZ'
                            label='Set you favorite country'
                            onValueChange={() => {this.handleChange}}>
                            <Picker.Item label='Austria' value='A' />
                    <Picker.Item label='Czechia' value='CZ' />
                    <Picker.Item label='Germany' value='DE' />
                    <Picker.Item label='Poland' value='PL' />
                    <Picker.Item label='Slovakia' value='SLO' />
                </TogglePicker>
            </ScrollView>
                </View>
            </ScrollView>
                <View style={styles.cellFive}>
                    <TabBar style={styles.content}>
                        <TabBar.Item
                            icon={require('../../../img/underBarIcon/underbar_home_disabled.png')}
                            selectedIcon={require('../../../img/underBarIcon/underbar_home_highlighted.png')}
                            onPress={() => {
                                console.log("first onPress");
                            }}>
                            <View style={styles.text}>
                            </View>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={require('../../../img/underBarIcon/underbar_request_disabled.png')}
                            selectedIcon={require('../../../img/underBarIcon/underbar_request_highlighted.png')}>
                            <View style={styles.text}>
                            </View>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={require('../../../img/underBarIcon/underbar_chatting_disabled.png')}
                            selectedIcon={require('../../../img/underBarIcon/underbar_chatting_highlighted.png')}>
                            <View style={styles.text}>
                            </View>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={require('../../../img/underBarIcon/underbar_mypage_disabled.png')}
                            selectedIcon={require('../../../img/underBarIcon/underbar_mypage_highlighted.png')}>
                            <View style={styles.text}>
                            </View>
                        </TabBar.Item>
                    </TabBar>
                </View>
            </View>
        );
    }
}

export default makeOrderScreen;
