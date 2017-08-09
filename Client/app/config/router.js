import React from 'react';
import {
    StackNavigator,
    TabRouter,
    StackRouter,
    TabNavigator,
    TabView,
    TabBarBottom,
    TabBarTop
} from 'react-navigation';

import loading from '../screen/loading';
import login from '../screen/login';
import timeline from '../screen/timeline';
import register from '../screen/register';
import post from '../screen/post';
import chat from '../screen/chat';
import mypage from '../screen/myPage';
//import tab from '../components/Tabs';



export const MainTab = TabNavigator({
    Timeline: {
        screen: timeline,

    },
    Post: {
        screen: post,
    },
    Chat: {
        screen: chat,
    },
    MyPage: {
        screen: mypage,
    }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
        showIcon: true,
        showLabel: false,

    }

});


export const auth = StackNavigator({
    Login: {
        screen: login
    },
    Main: {
        screen: MainTab,
        navigationOptions: {
            title: '메인'
        }
    },
    Register: {
        screen: register,
    }
}, {
    headerMode: 'none'
});

export const Loading = StackNavigator({
    Loading: {
        screen: loading,
    },
    AuthStack: {
        screen: auth,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
}, {
    headerMode: 'none',
});