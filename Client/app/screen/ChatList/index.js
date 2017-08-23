import React from 'react';
import {
    Text,
    View,
    ListView,
    RefreshControl,
    AsyncStorage,
    Alert,
} from 'react-native';

import Reactotron from 'reactotron-react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { ListItem } from 'react-native-elements';
import SwipeOut from 'react-native-swipeout';
import _ from 'lodash';

import socket from '../../config/socket.io';
import styles from './style';

const ChatListSTORAGEKEY = '@PRETZEL:chatlist';

export default class ChatList extends React.Component {

    static navigationOptions = {
        header: (
            <View style={styles.title}>
                <Text style={styles.headerTitle}>채팅 리스트</Text>
            </View>
        ),
        headerTitleStyle: styles.headerTitle,
        headerBackTitle: null,
    }
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            refreshing: false,
        };
        this.renderRefresh = this.renderRefresh.bind(this);
        this.delete = this.delete.bind(this);
        this.socket = socket.connectSocket();
        this.socket.on('message', (data) => { this.onChatRecieve(data); });
    }
    componentDidMount() {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
        .then((value) => {
            if (value) {
                let list = JSON.parse(value);
                // list = _.uniqBy(list, 'rid');
                list = _.reverse(list);
                Reactotron.log('*********', list);
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(list) });
            } else {
                this.setState({ dataSource: this.state.dataSource.cloneWithRows([]) });
            }
        })
        .catch(e => console.error(e))
        .done();
    }
    onChatRecieve(data) {
        socket.onReceive(data)
            .then(() => {
                Alert.alert('ChatList', 'Messages Got it!');
                this.renderRefresh();
            });
    }
    delete(item) {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                const list = JSON.parse(value);
                _.remove(list, (ele) => {
                    return ele.rid === item.rid;
                });
                AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                    .then(() => { Reactotron.log(list, 'saved'); })
                    .then(() => { this.setState(list); })
                    .catch((e) => console.error(e));
            })
            .then(() => {
                const ChatRoomSTORAGEKEY = '' + item.partner_email + ':' + item.rid;
                AsyncStorage.removeItem(ChatRoomSTORAGEKEY)
                    .then(() => { this.renderRefresh(); })
                    .then(() => Reactotron.log(ChatRoomSTORAGEKEY, 'removed'))
                    .catch(e => Reactotron.log(e));
            })
            .catch(e => Reactotron.log(e));
    }
    renderRefresh() {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (value) {
                    let list = JSON.parse(value);
                    // list = _.uniqBy(list, 'rid');
                    list = _.reverse(list);
                    // Reactotron.log('*********',list);
                    this.setState({ dataSource: this.state.dataSource.cloneWithRows([]) }, () => {
                        this.setState({ dataSource: this.state.dataSource.cloneWithRows(list) });
                    });
                } else {
                    this.state.dataSource.cloneWithRows([]);
                }
            })
            .catch(e => console.error(e))
            .done();
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.renderRefresh}
                        />
                    }
                    renderRow={(rowData) => (
                        this.state.dataSource.length === 0 ?
                            <View><Text>Empty..</Text></View>
                            :
                            <SwipeOut
                                key={rowData.rid}
                                right={[{
                                    text: '삭제',
                                    onPress: () => { this.delete(rowData); },
                                    backgroundColor: 'red',
                                }]}>
                                <ListItem
                                    key={rowData.rid}
                                    roundAvatar
                                    avatar={require('../../../img/chatting/chatting_main_default_profile.png')}
                                    avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
                                    containerStyle={{ backgroundColor: 'white' }}
                                    wrapperStyle={{ backgroundColor: 'white' }}
                                    title={rowData.title}
                                    subtitle={rowData.partner_email}
                                    onPress={() => {
                                        this.props.navigation.navigate('ChatRoom',
                                            {
                                                user_email: rowData.user_email,
                                                partner_email: rowData.partner_email,
                                                title: rowData.title,
                                                rid: rowData.rid,
                                            });
                                    }}
                                />
                            </SwipeOut>
                    )}
                />
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref}
                />
            </View>
        );
    }
}
