import React from 'react';
import {
    StackNavigator
} from 'react-navigation';

import loading from '../../../summertime-pretzel/Client/app/screen/loading/loading';
import login from '../../../summertime-pretzel/Client/app/screen/login/login';
import mainScreen from '../../../summertime-pretzel/Client/app/screen/mainPage/mainScreen';
import myPageScreen from '../../../summertime-pretzel/Client/app/screen/myPage/myPageScreen';

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
        screen: mainScreen,
    },
    MyPage: {
        screen: myPageScreen,
    },


}, {
    headerMode: 'none',
});