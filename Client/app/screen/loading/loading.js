import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'

import styles from './style';
class Loading extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 500);
    }

    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../../img/index/index_background.png')}
                       style={styles.backgroundImg}>
                    <View style={styles.logo}>
                        <Image source={require('../../../img/index/index_logo.png')}
                            style={styles.logoDesign}/>

                        <Image source={require("../../../img/index/index_logotype.png")}
                               style={styles.logoDesign}/>
                    </View>
                </Image>
            </View>
        );
    }
}

export default Loading;