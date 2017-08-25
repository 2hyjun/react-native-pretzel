import React from 'react';
import { Avatar } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Reactotron from 'reactotron-react-native';

import styles from './style';
import global from '../../config/global';
import socket from '../../config/socket.io';


export default class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.partner_email,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: '#f95a25',
        headerBackTitle: null,
    })
    constructor(props) {
        super(props);
        this.state = {
            partnerId: -1,
            messages: [],
            user_email: global.user_email,
            typingText: null,
        };
        this.onSend = this.onSend.bind(this);
        this.onRecieve = this.onRecieve.bind(this);
        this.storeMessages = this.storeMessages.bind(this);

        this.socket = socket.connectSocket();
        this.socket.on('message', this.onRecieve);
        // console.log(this.props.navigation.state.params.partner_email);
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        const ChatRoomSTORAGEKEY = `${params.partner_email}:${params.rid}`;
        Reactotron.log('ChatRoomSTORAGEKEY: ' + ChatRoomSTORAGEKEY);
        AsyncStorage.getItem(ChatRoomSTORAGEKEY)
            .then((messages) => {
                Reactotron.log('messages' + messages);
                if (messages !== null) {
                    this.setState({ messages: JSON.parse(messages) });
                }
            })
            .catch(e => Reactotron.error(e));
    }
    onSend(messages = []) {
        this.socket = socket.checkConnection();
        const message = messages;
        const { params } = this.props.navigation.state;
        message[0].to = params.partner_email;
        message[0].title = params.title;
        message[0].rid = params.rid;
        this.socket.emit('message', messages[0]);
        this.storeMessages(messages);
    }

    onRecieve(data) {
        const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (!value) {
                    return new Promise.resolve([]);
                } else {
                    return new Promise.reject({ em: 'already exist' });
                }
            })
            .then((list) => {
                list.push({
                    user_email: data.to,
                    partner_email: data.user.name,
                    title: data.title,
                    rid: data.rid,
                });
                AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                    .then(() => Reactotron.log(list, 'List saved'))
                    .catch(e => console.error(e))
                    .done();
            })
            .catch((e) => {
                if (!e.em) {
                    console.error(e);
                }
            })
            .done();
        this.storeMessages(data);
    }

    storeMessages(messages) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            const arr = this.state.messages;
            const str = JSON.stringify(arr);

            const { params } = this.props.navigation.state;
            const ChatRoomSTORAGEKEY = '' + params.partner_email + ':' + params.rid;

            AsyncStorage.setItem(ChatRoomSTORAGEKEY, str)
                .then(() => Reactotron.log(str, 'saved'))
                .catch(e => console.error(e))
                .done();
        });
    }


    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                placeholder={this.props.navigation.state.params.title}
                locale={'ko'}
                isAnimated={true}
                renderAvatarOnTop={true}

                renderAvatar={() => {
                    return (
                        <Avatar
                            overlayContainerStyle={{ backgroundColor: 'transparent' }}
                            /* global require */
                            source={require('../../../img/chatting/chatting_main_default_profile.png')}
                        />

                    );
                }}
                user={{
                    _id: global.user_email,
                    name: global.user_email,
                }}
            />

        );
    }
}
