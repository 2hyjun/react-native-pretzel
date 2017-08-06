import React from 'react'
import {
    Text,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import styles from './style';

class ErrorMsg extends React.Component {

    render() {
        return(
            <Animatable.View style={styles.wrong}
                                animation="shake"
                                easing="ease-in-circ">
                <Text style={styles.wrongTxt}>
                    {this.props.msg}
                </Text>
            </Animatable.View>
        )
    }
}

export default ErrorMsg;