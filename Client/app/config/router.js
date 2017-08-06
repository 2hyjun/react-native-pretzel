import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import loading from '../screen/loading';
import login from '../screen/login';
import main from '../screen/meanless1';
import register from '../screen/register';
export const Root = StackNavigator({
    Loading: {
        screen: loading,
    },
    Login: {
        screen: login,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },

    Main: {
        screen: main
    },

    Register: {
        screen: register
    }
}, {
    headerMode: 'none',
});