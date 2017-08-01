import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import loading from '../screen/loading/loading';
import login from '../screen/login/login';
import main from '../screen/meanless1';

export const Loading = StackNavigator({
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
    }

}, {
    headerMode: 'none',
});