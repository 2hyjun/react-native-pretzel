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
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const ChatListSTORAGEKEY = '@PRETZEL:chatlist';

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            refreshing: false
        };


        this._renderRefresh = this._renderRefresh.bind(this);
        this._delete = this._delete.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (value) {
                    let list = JSON.parse(value);
                    list = _.uniqBy(list, 'rid');
                    console.log('*********',list);
                    this.setState({dataSource: list})
                } else {
                    this.setState({dataSource: []})
                }
            })
            .catch(e => console.error(e))
            .done();
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
                    this.setState({dataSource: []}, () => {
                        this.setState({dataSource: list})
                    });

                } else {
                    this.setState({dataSource: []})
                }
            })
            .catch(e => console.error(e))
            .done();
    }

    render() {
        console.log('render',this.state.dataSource);

        return (
            <View style={{flex: 1}}>
                <List
                    containerStyle={{marginTop: 50}}>
                    {this.state.dataSource.length > 0 && typeof(this.state.dataSource) === typeof([]) ?
                        this.state.dataSource.map((item, i) => (
                            <SwipeOut
                                key={item.rid}
                                right={[{
                                    text: '삭제',
                                    onPress: () => {this._delete(item)},
                                    backgroundColor: 'red'
                                }]}>
                                <ListItem
                                    key={item.rid}
                                    roundAvatar
                                    avatar={require('../../../img/chatting/chatting_main_default_profile.png')}
                                    title={item.title}
                                    subtitle={item.partner_email}
                                    onPress={() => {
                                        this.props.navigation.navigate('ChatRoom',
                                            {
                                                user_email: item.user_email,
                                                partner_email: item.partner_email,
                                                title: item.title,
                                                rid: item.rid
                                            })
                                    }}
                                />
                            </SwipeOut>

                    )): undefined}
                </List>
            </View>

        )
    }
}