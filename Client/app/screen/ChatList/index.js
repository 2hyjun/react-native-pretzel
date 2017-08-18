import React from 'react';
import {
    Text,
    View,
    ListView,
    RefreshControl,
    ScrollView,
    AsyncStorage
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';
import {List, ListItem} from 'react-native-elements';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
export default class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            refreshing: false,
        };


        this._renderRefresh = this._renderRefresh.bind(this);
    }

    componentWillMount() {
        //this.dropdown.alertWithType('info', '', '아래로 스크롤해 채팅 리스트를 갱신 할 수 있습니다.');
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((list) => {
                console.log(list);
                if (list) {
                    this.setState({dataSource: JSON.parse(list)})
                } else {
                    this.setState({dataSource: []})
                }
            })
            .catch(e => console.error(e))
            .done();
    }
    _renderRefresh() {

    }

    render() {
        const dataSource = this.state.dataSource;

        console.log(dataSource);
        console.log(dataSource.length, typeof(dataSource));
        return (
            <View style={{flex: 1}}>
                <List>
                    {dataSource.length > 0 && typeof(dataSource) === typeof([]) ?
                        dataSource.map((item) => (
                        <ListItem
                            key={item.rid}
                            roundAvatar
                            avatar={require('../../../img/chatting/chatting_main_default_profile.png')}
                            title={item.title}
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
                    )): undefined}
                </List>
            </View>

        )
    }
}