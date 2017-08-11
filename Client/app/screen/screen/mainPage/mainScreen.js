/* This page is for showing orders briefly on three categories which is
 'hae-ju-se-yo', 'hae-jul-ge-yo', 'gati-hae-yo' */

import React, { Component, } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    TextInput,
    Text,
    Linking,
    TouchableHighlight,
    Alert,
} from 'react-native';

import styles from './style';
import TabBar from 'react-native-xtabbar';

class mainScreen extends Component {
    constructor(props){
        super(props);
    }
    _handleback = () => {
        this.props.navigation.navigate('NoticeBoard');
    };
    _handleMain = () => {
        this.props.navigation.navigate('Main');
    };
    _handleNotice = () => {
        this.props.navigation.navigate('MakeOrder');
    };
    _handleChat = () => {
        this.props.navigation.navigate('mainPage');
    };
    _handleMy = () => {
        this.props.navigation.navigate('MyPage');
    };

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <ScrollableTabView
                        style={{marginTop: 20, }}
                        renderTabBar={() => <DefaultTabBar />}
                    >
                        <Text tabLabel='해주세요'>DoItPlz</Text>
                        <Text tabLabel='해줄게요'>DoMyself</Text>
                        <Text tabLabel='같이해요'>DoItTogether</Text>
                    </ScrollableTabView>
                </View>

                <TabBar style={styles.content}>
                    <TabBar.Item
                        onPress={this._handleMain}
                        icon={require('../../../img/underBarIcon/underbar_home_disabled.png')}
                        selectedIcon={require('../../../img/underBarIcon/underbar_home_highlighted.png')}
                        /*onPress={() => {
                         console.log("first onPress");
                         }}*/>
                        <View style={styles.text}>
                        </View>
                    </TabBar.Item>

                    <TabBar.Item
                        onPress={this._handleNotice}
                        icon={require('../../../img/underBarIcon/underbar_request_disabled.png')}
                        selectedIcon={require('../../../img/underBarIcon/underbar_request_highlighted.png')}>
                        <View style={styles.text}>
                        </View>

                    </TabBar.Item>
                    <TabBar.Item
                        onPress={this._handleChat}
                        icon={require('../../../img/underBarIcon/underbar_chatting_disabled.png')}
                        selectedIcon={require('../../../img/underBarIcon/underbar_chatting_highlighted.png')}>
                        <View style={styles.text}>
                        </View>
                    </TabBar.Item>

                    <TabBar.Item
                        onPress={this._handleMy}
                        icon={require('../../../img/underBarIcon/underbar_mypage_disabled.png')}
                        selectedIcon={require('../../../img/underBarIcon/underbar_mypage_highlighted.png')}>
                        <View style={styles.text}>
                        </View>
                    </TabBar.Item>
                </TabBar>
            </View>

        );
    }
}

export default mainScreen;



