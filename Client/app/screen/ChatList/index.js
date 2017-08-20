import React from 'react';
import {
    Text,
    View,
    ListView,
    RefreshControl,
    ScrollView,
    AsyncStorage,
    Alert
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';
import {List, ListItem} from 'react-native-elements';
import SwipeOut from 'react-native-swipeout';
import _ from 'lodash';
import Button from "react-native-elements/src/buttons/Button";
import SocketIOClient from 'socket.io-client';
import global from '../../config/global'

const ChatListSTORAGEKEY = '@PRETZEL:chatlist';

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            refreshing: false
        };

        this.socket = global.SocketIo();
        this.socket.on('message', () => {Alert.alert('', 'got it')});

        this._getAllKey = this._getAllKey.bind(this);
        this._renderRefresh = this._renderRefresh.bind(this);
        this._delete = this._delete.bind(this);
    }
    _onRecieve() {

    }
    componentWillMount() {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (value) {
                    let list = JSON.parse(value);
                    list = _.uniqBy(list, 'rid');
                    console.log('*********',list);
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(list)})
                } else {
                    this.setState({dataSource: this.state.dataSource.cloneWithRows([])})
                }
            })
            .catch(e => console.error(e))
            .done();
    }

    componentDidMount() {

    }
    _delete(item) {

        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                let list = JSON.parse(value);
                _.remove(list, (ele) => {
                    return ele.rid === item.rid;
                });
                AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                    .then(() => {console.log(list, 'saved')})
                    .then(() => {this.setState({list: list})})
                    .catch((e) => console.error(e));

            })
            .then(() => {
                const ChatRoomSTORAGEKEY = '' + item.partner_email + ':'+ item.rid;
                AsyncStorage.removeItem(ChatRoomSTORAGEKEY)
                    .then(() => {this._renderRefresh()})
                    .then(() => console.log(ChatRoomSTORAGEKEY, 'removed'))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e));


    }
    _renderRefresh() {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (value) {

                    let list = JSON.parse(value);
                    list = _.uniqBy(list, 'rid');
                    //console.log('*********',list);
                    this.setState(this.state.dataSource.cloneWithRows([]), () => {
                        this.setState({dataSource: this.state.dataSource.cloneWithRows(list)})
                    });

                } else {
                    this.state.dataSource.cloneWithRows([])
                }
            })
            .catch(e => console.error(e))
            .done();
    }
    _getAllKey() {
        AsyncStorage.getAllKeys()
            .then(keys => {
                //Alert.alert('', JSON.stringify(keys))
            });
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then(key => this.setState({temp: key}))
    }

    render() {
        console.log('render',this.state.dataSource);

        return (
            <View style={{flex: 1}}>
                <Button
                    title={'GetAllKey'}
                    onPress={this._getAllKey}
                    buttonStyle={{height: 50}}/>
                <Text>{this.state.temp}</Text>
                <ListView

                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._renderRefresh}
                        />
                    }
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                        this.state.dataSource.length === 0 ?
                            <View><Text>Empty..</Text></View>
                            :
                            <SwipeOut
                                key={rowData.rid}
                                right={[{
                                    text: '삭제',
                                    onPress: () => {this._delete(rowData)},
                                    backgroundColor: 'red'
                                }]}>
                                <ListItem
                                    key={rowData.rid}
                                    roundAvatar
                                    avatar={require('../../../img/chatting/chatting_main_default_profile.png')}
                                    title={rowData.title}
                                    subtitle={rowData.partner_email}
                                    onPress={() => {
                                        this.props.navigation.navigate('ChatRoom',
                                            {
                                                user_email: rowData.user_email,
                                                partner_email: rowData.partner_email,
                                                title: rowData.title,
                                                rid: rowData.rid
                                            })
                                    }}
                                />
                            </SwipeOut>
                    }
                >

                </ListView>

            </View>

        )
    }
}