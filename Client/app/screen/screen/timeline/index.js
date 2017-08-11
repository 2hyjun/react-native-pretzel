import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native';

import styles from './style'

export default class timeline extends React.Component {

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    Timeline
                </Text>
            </View>
        )
    }
}