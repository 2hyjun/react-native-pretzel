import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import loading from '../screen/loading/loading';
import login from '../screen/login/login';


export const Loading = StackNavigator({
    Loading: {
        screen: loading
    },
    Login: {
        screen: login
    },

}, {
    headerMode: 'none',
});