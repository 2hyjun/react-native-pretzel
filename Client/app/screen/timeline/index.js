import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native';

import styles from './style'
export default class timeline extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) =>
            <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_home_highlighted.png')}/>
    };
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