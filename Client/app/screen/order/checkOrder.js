/* This page is for checking order so you can find details
 * such as meeting time, meeting place ... */

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

import styles from './styleCheckOrder';
import TabBar from 'react-native-xtabbar';

class checkOrderScreen extends Component {
    constructor(props){
        super(props);
    }
    _handleback = () => {
        this.props.navigation.navigate('NoticeBoard');
    };
    _handleMain = () => {
        this.props.navigation.navigate('mainScreen');
    };
    _handleNotice = () => {
        this.props.navigation.navigate('makeOrderScreen');
    };
    _handleChat = () => {
        this.props.navigation.navigate('mainPage');
    };
    _handleMy = () => {
        this.props.navigation.navigate('myPageScreen');
    };

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <View style={styles.cellOneBack}>
                        <TouchableHighlight onPress={this._handleback}>
                            <Image source={require('../../../img/basic/basic_arrow_left.png')}/>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.cellOneLogo}>
                        <TouchableHighlight onPress={this._handleMain}>
                            <Image source={require('../../../img/index/index_logo.png')}
                                   style={{resizeMode:'center'}}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.cellTwo}>
                    <Text> Brief Info </Text>
                </View>

                <View style={styles.cellThree}>
                    <View style={styles.cellThreePerson}>
                        <View style={styles.cellThreePersonPic}>
                            <Image source={require('../../../img/home/home_detail_default_profile.png')}
                            resizeMode='contain'/>
                        </View>
                        <View style={styles.cellThreePersonID}>
                            <Text style={{fontWeight:'bold'}}> User ID </Text>
                        </View>
                    </View>
                    <View style={styles.cellThreeDetail}>
                        <Text>aa</Text>
                    </View>
                </View>
                <View style={styles.cellFour}>
                    <Text> Information Lists </Text>
                </View>


                <View style={styles.cellFive}>
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
            </View>
        );
    }
}


export default checkOrderScreen;
