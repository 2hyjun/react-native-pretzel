import React from 'react';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    TabBarTop,
} from 'react-navigation';
import login from '../screen/login';
import register from '../screen/register';
import post from '../screen/post';
import chat from '../components/ChatRoom';
import chatList from '../screen/ChatList';
import myPage from '../screen/myPage';
import alarm from '../screen/myPage/alarm';
import setting from '../screen/myPage/setting';
import auth from '../screen/auth';
import timelineHelpme from '../screen/timeline_helpme';
import timelineHelpyou from '../screen/timeline_helpyou';
import timelineTogether from '../screen/timeline_together';

import styles from './style';

export const MyPageStack = StackNavigator({
    MyPage: {
        screen: myPage,
    },
    Setting: {
        screen: setting,
    },
    Alarm: {
        screen: alarm,
    },
}, {
    headerMode: 'none',
});
export const ChatStack = StackNavigator({
    ChatList: {
        screen: chatList,
    },
    ChatRoom: {
        screen: chat,
    },
});
export const TypeTab = TabNavigator({
    Helpme: {
        screen: timelineHelpme,
        navigationOptions: {
            title: '해주세요',
        },
    },
    HelpYou: {
        screen: timelineHelpyou,
        navigationOptions: {
            title: '해줄게요',
        },
    },
    Together: {
        screen: timelineTogether,
        navigationOptions: {
            title: '같이해요',
        },
    },
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'Top',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        showLabel: true,
        indicatorStyle: {
            backgroundColor: '#E3502A',
        },
        labelStyle: {
            color: 'black',
            fontSize: 17,
            marginTop: 20,
        },
        style: {
            backgroundColor: 'white',
        },
    },
});

export const MainTab = TabNavigator({
    Timeline: {
        screen: TypeTab,
        navigationOptions: {

            gesturesEnabled: false,
            tabBarIcon: ({ focused }) => {
                const imgSource = focused
                    ? require('../../img/underBarIcon/underbar_home_highlighted.png')
                    : require('../../img/underBarIcon/underbar_home_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource} />;
            },
        },
    },
    Post: {
        screen: post,
        navigationOptions: () => ({
            tabBarIcon: ({ focused }) => {
                const imgSource = focused
                    ? require('../../img/underBarIcon/underbar_request_highlighted.png')
                    : require('../../img/underBarIcon/underbar_request_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource} />;
            },
        }),
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const imgSource = focused
                    ? require('../../img/underBarIcon/underbar_chatting_highlighted.png')
                    : require('../../img/underBarIcon/underbar_chatting_disabled.png');
                return (
                    <TouchableOpacity onPress={() => { navigation.navigate('Chat'); }}>
                        <Image style={styles.tabBarIcon} source={imgSource} />
                    </TouchableOpacity>
                );
            },
        }),
    },
    MyPage: {
        screen: MyPageStack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const imgSource = focused
                    ? require('../../img/underBarIcon/underbar_mypage_highlighted.png')
                    : require('../../img/underBarIcon/underbar_mypage_disabled.png');
                return (
                        <TouchableOpacity onPress={() => { navigation.navigate('MyPage'); }}>
                            <Image style={styles.tabBarIcon} source={imgSource} />
                        </TouchableOpacity>
                );
            },
        }),
    },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
    },
    gesturesEnabled: false,

});


export const Auth = StackNavigator({
    auth: {
        screen: auth,
    },
    Register: {
        screen: register,
    },
    MainTab: {
        screen: MainTab,
    },
    Login: {
        screen: login,
    },
}, {
    headerMode: 'none',
    gesturesEnabled: false,
});
