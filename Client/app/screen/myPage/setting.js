/* This page is for "My page" which includes logout and sets */

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
    TouchableOpacity,
    ListView,
    Alert,
} from 'react-native';

import styles from './settingStyle';
import TabBar from 'react-native-xtabbar';
import {Navigator} from 'react-native-deprecated-custom-components';

class settingScreen extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                '비밀번호 변경', '푸시알림 설정', '피드백'
            ])
        };
    }

    handleMain = () => {
        this.props.navigation.navigate('main');
    };
    LogOut = () => {
        //this.props.navigation.navigate('main');
        Alert.alert('','로그아웃 하시겠습니까?',[{
                text: '네',
                onPress: (text)=>{
                    console.log('button press yes')
                }
            },
                {
                    text:'계속있을래요',
                    onPress: (text)=> {
                        console.log('button press no')
                    }
                },

            ]
        );
    };
    handleMyPage = () => {
        this.props.navigation.navigate('MyPage');
    };


    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <View>
                        <TouchableHighlight onPress={this._handleback}>
                            <Image source={require('../../../img/basic/basic_arrow_left.png')}
                                   style={{resizeMode:'center'}}/>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={this.handleMain}>
                            <Image source={require('../../../img/index/index_logo.png')}
                                   style={{resizeMode:'center'}}/>
                        </TouchableHighlight>
                    </View>
                </View>

                <TouchableHighlight onPress={this.LogOut}>
                    <View style={styles.cellTwo}>
                        <Text style={{color: '#ff6666'}}>로그아웃</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.cellThree}>
                    <ListView style={styles.container}
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) =>
                                  <TouchableOpacity
                                      onPress={()=>this.props.navigator.push({index: 1,
                                          passProps:{}})}
                                  >
                                      <View style={styles.row}>
                                          <Text>{rowData}</Text>
                                      </View>
                                  </TouchableOpacity>
                              }
                              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                                  <View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}
                                  />}
                    />
                </View>

                <View style={styles.cellFive}>
                    <TabBar style={styles.content}>
                        <TabBar.Item
                            icon={require('../../../img/underBarIcon/underbar_home_disabled.png')}
                            selectedIcon={require('../../../img/underBarIcon/underbar_home_highlighted.png')}
                            onPress={() => {this.handleMain}}
                        >
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
                            selectedIcon={require('../../../img/underBarIcon/underbar_mypage_highlighted.png')}
                            onPress={() => {this.handleMyPage}}>
                            <View style={styles.text}>
                            </View>
                        </TabBar.Item>
                    </TabBar>
                </View>
            </View>
        );
    }
}

export default settingScreen;
