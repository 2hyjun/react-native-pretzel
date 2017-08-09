import React from 'react';
import {
    Image
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
import timeline from '../screen/timeline';
import register from '../screen/register';
import post from '../screen/post';
import chat from '../screen/chat';
import mypage from '../screen/myPage';

import meanless1 from '../screen/meanless/meanless1';
import meanless2 from '../screen/meanless/meanless2';
import meanless3 from '../screen/meanless/meanless3';
//import tab from '../components/Tabs';
import TypeTabs from '../screen/typeTabs';

import styles from './style';

export const TypeTab = TabNavigator({
    Helpme: {
        screen: meanless1,
        navigationOptions: {
           title: '해주세요'
        }
    },
    HelpYou: {
        screen: meanless2,
        navigationOptions: {
            title: '해줄게요'
        }
    },
    Together: {
        screen: meanless3,
        navigationOptions: {
            title: '같이해요'
        }
    }
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'Top',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
        showLabel: true,
        tabStyle: {
            marginTop: 10,
        },
        indicatorStyle: {
            backgroundColor: '#E3502A'
        },
        labelStyle: {
            color: 'black',
            fontSize: 17,
        },
        style: {
            backgroundColor: 'white'
        }
    }
});

export const MainTab = TabNavigator({
    Timeline: {
        screen: TypeTab,
        navigationOptions: {
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
        navigationOptions : {
            tabBarIcon: ({ focused }) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_request_highlighted.png')
                    : require('../../img/underBarIcon/underbar_request_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        }
    },
    Chat: {
        screen: chat,
        navigationOptions:{
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_chatting_highlighted.png')
                    : require('../../img/underBarIcon/underbar_chatting_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        }
    },
    MyPage: {
        screen: mypage,
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_mypage_highlighted.png')
                    : require('../../img/underBarIcon/underbar_mypage_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        }
    }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazyLoad: true,
    tabBarOptions: {
        showIcon: true,
        showLabel: false
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