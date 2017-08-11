/* This page is for "My page" which includes logout and sets */

import React, { Component, } from 'react';
import {
    Image,
    View,
    Button,
    TextInput,
    Text,
    TouchableHighlight,
    ListView,
    AsyncStorage,
    Alert,
} from 'react-native';
import {
    List,
    ListItem,
} from 'react-native-elements';

import styles from './style';
import TabBar from 'react-native-xtabbar';
import {Navigator} from 'react-native-deprecated-custom-components';
const STORAGE_KEY = '@PRETZEL:jwt';

class myPageScreen extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                '학교', '학과열세글자까지가능', '이름'
            ])
        };

    }

    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }

    HTTPRequest(value) {
        return fetch('http://13.124.147.152:8124/api/timeline/mypage', {
            method: 'GET',
            headers: {
                'x-access-token': value
            }
        })
            .then((res) => res.json())
    }

    componentDidMount() {
        this.GetToken()
            .then(this.HTTPRequest)
            .then((res) => {
                console.log(res.result);

                this.setState({
                    user_email: res.myInfo.user_email,
                    user_name: res.myInfo.user_name,
                    user_univ: res.myInfo.user_univ,
                    user_major: res.myInfo.user_major,
                })
            })
            .catch((err) => console.error(err))

    }

    Setting() {
        this.props.navigation.navigate('Setting');
    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <View>
                        <TouchableHighlight onPress={this.Setting}>
                            <Image source={require('../../../img/mypage/mypage_main_settingbutton.png')}
                                   style={{marginTop:10, marginRight:10,}}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.cellTwo}>
                    <View style={styles.cellTwoProfile}>
                        <View style={styles.cellTwoProfilePic}>
                            <Image source={require('../../../img/mypage/mypage_main_default_profile_user.png')}
                                   style={{resizeMode:'center'}}/>

                        </View>
                        <View style={styles.cellTwoProfileID}>
                            <Text>user101</Text>
                        </View>
                    </View>
                    <View style={styles.cellTwoInfo}>
                        <View style={styles.cellTwoInfoFix}>

                                <View style={styles.rowFix}>

                                    <Text>학교 : {this.state.user_email}</Text>
                                </View>
                                <View style={styles.rowFix}>
                                    <Text>학과</Text>
                                </View>
                                <View style={styles.rowFix}>
                                    <Text>이름</Text>
                                </View>
                        </View>
                        <View style={styles.cellTwoInfoVari}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) =>
                                    <View style={styles.row}>
                                        <Text>{rowData}</Text>
                                    </View>
                                }
                                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                                    <View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}
                                    />}
                            />
                        </View>
                    </View>
                </View>


                <View style={styles.cellThree}>
                    <Text>adsf</Text>
                    <Text>
                        Your Email: {this.state.user_email}
                    </Text>
                </View>
            </View>
        );
    }
}

export default myPageScreen;


/*
 <List>
 <ListView style={styles.cellTwoInfoVari}
 dataSource={this.state.dataSource}
 renderRow={(rowData) =>
 <View style={styles.row}>
 <Text>{rowData}</Text>
 </View>
 }
 renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
 <View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}
 />}
 />
 </List>
 */