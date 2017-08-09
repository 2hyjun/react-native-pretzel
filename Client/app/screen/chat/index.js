import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native';

import styles from './style'
export default class Chat extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) =>
            <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_chatting_highlighted.png')}/>
    };
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