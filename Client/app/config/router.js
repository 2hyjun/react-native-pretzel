import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import loading from '../screen/loading';
import login from '../screen/login';
import main from '../screen/meanless1';
import register from '../screen/register';



export const MainStack = StackNavigator({
    Main: {
        screen: main,
    },
    Main2: {
        screen: main,
    }
}, );

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
        navigationOptions: {
            title: '회원가입'
        }
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