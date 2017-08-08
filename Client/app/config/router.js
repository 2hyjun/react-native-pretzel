import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import loading from '../screen/loading';
import login from '../screen/login';
import main from '../screen/meanless1';
import register from '../screen/register';
import post from '../screen/post';



export const MainStack = StackNavigator({
    Main: {
        screen: main,
    },
    Post: {
        screen: post,
    }
}, {
    headerMode: 'none'
});




export const auth = StackNavigator({
    Login: {
        screen: login
    },
    Main: {
        screen: MainStack,
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