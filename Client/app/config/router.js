import React from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';
import {
    StackNavigator,
    TabRouter,
    StackRouter,
    TabNavigator,
    TabView,
    TabBarBottom,
    TabBarTop,
} from 'react-navigation';

import loading from '../screen/loading';
import login from '../screen/login';
import timeline_helpme from '../screen/timeline_helpme';
import timeline_helpyou from '../screen/timeline_helpyou';
import timeline_together from '../screen/timeline_together';
import register from '../screen/register';
import post from '../screen/post';
import chat from '../components/ChatRoom';
import chatList from '../screen/ChatList';
import myPage from '../screen/myPage';
import alarm from '../screen/myPage/alarm';
import setting from '../screen/myPage/setting';
import auth from '../screen/auth';

import meanless1 from '../screen/meanless/meanless1';
import meanless2 from '../screen/meanless/meanless2';
import meanless3 from '../screen/meanless/meanless3';
import meanless4 from '../screen/meanless/meanless4';
import meanless5 from '../screen/meanless/meanless5';
import meanless6 from '../screen/meanless/meanless6';
import meanless7 from '../screen/meanless/meanless7';


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
    }
}, {
    headerMode: 'none'
});
export const ChatStack = StackNavigator({
    ChatList: {
        screen: chatList,

    },
    ChatRoom: {
        screen: chat
    }
}, {

    headerMode: 'none'
});

export const TypeTab = TabNavigator({
    Helpme: {
        screen: timeline_helpme,
        navigationOptions: {
           title: '해주세요'
        }
    },
    HelpYou: {
        screen: timeline_helpyou,
        navigationOptions: {
            title: '해줄게요'
        }
    },
    Together: {
        screen: timeline_together,
        navigationOptions: {
            title: '같이해요'
        }
    }
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'Top',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        showLabel: true,
        indicatorStyle: {
            backgroundColor: '#E3502A'
        },
        labelStyle: {
            color: 'black',
            fontSize: 17,
            marginTop: 20,
        },
        style: {
            backgroundColor: 'white',

        }
    }
});

export const MainTab = TabNavigator({
    Timeline: {
        screen: TypeTab,
        navigationOptions: {

            gesturesEnabled: false,
            tabBarIcon: ({ focused }) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_home_highlighted.png')
                    : require('../../img/underBarIcon/underbar_home_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        }
    },
    Post: {
        screen: post,
        navigationOptions : ({navigation}) => ({
            tabBarIcon: ({ focused }) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_request_highlighted.png')
                    : require('../../img/underBarIcon/underbar_request_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        })
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_chatting_highlighted.png')
                    : require('../../img/underBarIcon/underbar_chatting_disabled.png');
                return <TouchableOpacity onPress={() => {navigation.navigate('Chat')}}><Image style={styles.tabBarIcon} source={imgSource}/></TouchableOpacity>
            }
        })
    },
    MyPage: {
        screen: MyPageStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_mypage_highlighted.png')
                    : require('../../img/underBarIcon/underbar_mypage_disabled.png');
                return <TouchableOpacity onPress={() => {navigation.navigate('MyPage')}}><Image style={styles.tabBarIcon} source={imgSource}/></TouchableOpacity>
            }
        })
    }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
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
        screen: MainTab
    },
    Login: {
        screen: login
    }

}, {
    headerMode: 'none',
    gesturesEnabled: false,
});

