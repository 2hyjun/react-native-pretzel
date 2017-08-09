import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native';

import styles from './style'
export default class Chat extends React.Component {

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    Chat
                </Text>
            </View>
        )
    }
}