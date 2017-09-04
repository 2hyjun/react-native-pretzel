// `\import Reactotron from 'reactotron-react-native'
import React from 'react';
import PushNotification from 'react-native-push-notification';

import {
    Auth
} from '../config/router';
import './ReactotronConfig';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.PushConfigure();
    }
    PushConfigure() {
        PushNotification.configure({
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
        return <Auth />;
    }
}
// import React, {Component} from 'react'
// import {AppState, Text, View} from 'react-native'
// import { StackNavigator } from 'react-navigation';
// import Button from "react-native-elements/src/buttons/Button";

// class screen1 extends React.Component {

//   state = {
//     appState: AppState.currentState
//   }

//   componentDidMount() {
//     AppState.addEventListener('change', this._handleAppStateChange);
//   }

//   componentWillUnmount() {
//     AppState.removeEventListener('change', this._handleAppStateChange);
//   }

//   _handleAppStateChange = (nextAppState) => {
//     Reactotron.log(nextAppState)
//   }

//   render() {
//     return (
//         <View>
//             <Text>{'\n\n\n\n\n'}Current state is: {this.state.appState}</Text>
//             <Button
//                 title={'go'}
//                 onPress={() => {
//                     this.props.navigation.navigate('S2');
//                 }}    
//             />
//         </View>
//     );
//   }

// }

// class screen2 extends React.Component {
//     render() {
//         return(
//             <View>
//                 <Text>{'\n\n\n'}Hi</Text>
//             </View>
//         )
//     }
// }

// const App = StackNavigator({
//     S1: {
//         screen: screen1
//     },
//     S2: {
//         screen: screen2
//     }
// })
// export default App;