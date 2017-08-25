/* This page is for "My page" which includes logout and sets */

import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ListView,
    AsyncStorage,
    Alert,
    Switch,
    Button,
} from 'react-native';
import TabBar from 'react-native-xtabbar';
import { Navigator } from 'react-native-deprecated-custom-components';
import styles from './style';
import TimelineListItem from '../../components/TimelineListItem';
import { ListItem, Icon } from 'react-native-elements'; //ㅅㅈ
import global from '../../config/global';
import { width, height, totalSize } from 'react-native-dimension';
const STORAGE_KEY = '@PRETZEL:jwt';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); //ㅅㅈ


class myPageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true,
            user_email: '',
            user_name: '',
            user_univ: '',
            user_major: '',
            title: '',
            content: '',
            contentType: '',
            complete:'진행',
            dataSource: ds.cloneWithRows([]), //ㅅㅈ
        };
        
        this.Setting = this.Setting.bind(this);
    }

    _onValueChange(value) {
        this.setState({ value });
        if (this.props._onValueChange) {
            this.props._onValueChange(value);
        }
    };

    componentDidMount() {
        this.setState({dataSource: ds.cloneWithRows([])}, ()=>{  //수정
        this.GetToken()
            .then(this.HTTPRequest)
            .then((res) => {
                //Alert.alert('', JSON.stringify(res.result));
                this.setState({
                    user_email: res.myInfo.user_email,
                    user_name: res.myInfo.user_name,
                    user_univ: res.myInfo.user_univ,
                    user_major: res.myInfo.user_major,
                    /*title: res.result.title,
                    content: res.result.content,
                    contentType: res.result.contentType,*/
                    //ㅅㅈ
                    dataSource: this.state.dataSource.cloneWithRows(res.result),
                });
            })
            .catch((err) => console.error(err))
        }); //ㅅㅈ
        }

    HTTPRequest(value) {
        return fetch('http://13.124.147.152:8124/api/timeline/mypage', {
            method: 'GET',
            headers: {
                'x-access-token': value,
            },
        })
            .then((res) => res.json());
    }

    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            });
        });
    }

    Setting() {
        this.props.navigation.navigate('Setting');
    }

    Complete(item){
        Alert.alert('', '완료하셨어요?', [
            {
                text: '네',
                onPress: () => {
                    this._onValueChange()
                },
            },
            {
                text: '아니요',
                onPress: () => {
                },
            },
        ]);
    };

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <View>
                        <TouchableOpacity onPress={this.Setting}>
                            <Image
                                source={require('../../../img/mypage/mypage_main_settingbutton.png')}
                                style={{ marginTop: 10, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cellTwo}>
                    <View style={styles.cellTwoOne}>
                        <View style={styles.cellTwoOnePic}>
                            <Image
                                source={require('../../../img/mypage/mypage_main_default_profile_user.png')}
                                style={{ resizeMode: 'center' }} />

                        </View>
                        <View style={styles.cellTwoOneID}>
                            <Text>{this.state.user_email.split("@")[0]}</Text>
                        </View>
                    </View>
                    <View style={styles.cellTwoTwo}>
                        <View style={styles.cellTwoTwoInfo}>
                            <View style={styles.cellTwoTwoInfo}>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{ color: '#dae000', fontWeight: 'bold' }}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{ fontWeight: 'bold' }}>학교</Text>
                                    </View>
                                </View>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{ color: '#dae000', fontWeight: 'bold' }}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{ fontWeight: 'bold' }}>학과</Text>
                                    </View>
                                </View>
                                <View style={styles.cellTwoRow}>
                                    <View style={styles.cellTwoRow1}>
                                        <Text style={{ color: '#dae000', fontWeight: 'bold' }}>●</Text>
                                    </View>
                                    <View style={styles.cellTwoRow2}>
                                        <Text style={{ fontWeight: 'bold' }}>이름</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cellTwoTwoVari}>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{ textDecorationLine: 'underline' }}>{this.state.user_univ}</Text>
                            </View>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{ textDecorationLine: 'underline' }}>{this.state.user_major}</Text>
                            </View>
                            <View style={styles.cellTwoVariRow}>
                                <Text style={{ textDecorationLine: 'underline' }}>{this.state.user_name}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.cellThree}>
                    <Text style={{ alignSelf: 'center', color: '#eb6736' }}>작성 글</Text>

                </View>
                <View style={styles.cellFour}>
                <ListView 
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={(rowData) => (
                    this.state.dataSource.length === 0 ?
                        <View><Text>Empty..</Text></View>
                        :
                            <ListItem
                                key={rowData.rid}
                                roundAvatar
                                hideChevron
                                avatar={require('../../../img/chatting/chatting_main_default_profile.png')}
                                avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
                                avatarStyle={{alignSelf:'flex-end'}}
                                containerStyle={{ backgroundColor: 'white' }}
                                wrapperStyle={{ backgroundColor: 'white' }}
                                title={rowData.title}
                                subtitle={global.DateToStr3(rowData.time)}
                                
                                label={
                                    <Button
                                    key={rowData.rid}
                                    title={(this.state.value)? "진행":"완료"}
                                    onPress={()=>this.Complete(rowData)}
                                >
                                </Button>
                                }                          
                           >
                            </ListItem>
                    
                )}

                
            />
            </View>
            </View>
        );
    }
}


export default myPageScreen;
