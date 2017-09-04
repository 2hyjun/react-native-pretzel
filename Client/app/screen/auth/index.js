import React from 'react';
import {
    AsyncStorage,
    AppState,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
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
        AppState.addEventListener('change', (state) => {
            Reactotron.log("Current AppState " + state);
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
