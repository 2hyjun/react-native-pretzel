import React from 'react';
import {
    AsyncStorage,
    AppState,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import Reactotron from 'reactotron-react-native';

import global from '../../config/global';
import Loading from '../loading';
import Login from '../login';

const STORAGE_KEY = '@PRETZEL:jwt';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signed: null,
        };
        this.PushConfigure();
    }
    componentWillMount() {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((value) => {
                if (value) {
                    fetch('http://13.124.147.152:8124/api/auth/check', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'x-access-token': value,
                        },
                    }).then((res) => res.json())
                        .then((rJSON) => {
                            if (rJSON.resultCode === 100) {
                                global.setEmail(rJSON.result.user_email);
                                this.setState({ signed: true }, () => {
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'MainTab' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                });
                            } else {
                                this.setState({ signed: false });
                            }
                        })
                        .catch((err) => console.error(err));
                } else {
                    this.setState({ signed: false });
                }
            }).catch((err) => console.error(err));
    }
    componentDidMount = () => {
        this.PushConfigure();
        AppState.addEventListener('change', (state) => {
            Reactotron.log("Current AppState " + state);
        });
    }
    PushConfigure() {
        PushNotification.configure({
            onRegister: (device) => {
                // Reactotron.log("REGISTER DEVICE", device);
                //registerDevice(device.token, device.os);
            },
            onNotification: (notification) => {
                console.log('NOTIFICATION:', JSON.stringify(notification));
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }
    render() {
        const Render = this.state.signed === null ?
            <Loading /> : this.state.signed ?
                <Loading />
                :
                <Login
                    navigation={this.props.navigation} />;
        return (
            Render
        );
    }
}

export default Auth;
