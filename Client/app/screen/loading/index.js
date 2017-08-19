import React, { PropTypes } from 'react';
import {
    View,
    Image,
    AsyncStorage,
    Alert,

} from 'react-native'

import styles from './style';
import global from '../../config/global'
const STORAGE_KEY = '@PRETZEL:jwt';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // AsyncStorage.getItem(STORAGE_KEY)
        //     .then((value) => {
        //         if (value) {
        //             fetch('http://13.124.147.152:8124/api/auth/check', {
        //                 method: 'GET',
        //                 headers: {
        //                     'Content-Type': 'application/x-www-form-urlencoded',
        //                     'x-access-token': value
        //                 }
        //             }).then((res) => res.json())
        //                 .then((rJSON) => {
        //                     if (rJSON.resultCode === 100) {
        //                         global.setEmail(rJSON.result.user_email);
        //                         this.props.navigation.navigate('Main');
        //                     } else {
        //                         this.props.navigation.navigate('Login')
        //                     }
        //                 })
        //                 .catch((err) => console.error(err))
        //
        //         } else {
        //             this.props.navigation.navigate('Login')
        //         }
        //     }).catch((err) => console.error(err));
        // setTimeout(() => {
        //     this.props.navigation.navigate('AuthStack')
        // }, 1000)


    }

    render() {
        return(
            <Image source={require("../../../img/index/index_background_minimalize.jpg")}
                                   style={styles.backgroundImg}
                                   >
                <View style={styles.logo}>
                    <Image source={require('../../../img/index/index_logo.png')}
                           style={styles.logoDesign}/>

                    <Image source={require("../../../img/index/index_logotype.png")}
                           style={styles.logoDesign}/>
                </View>
            </Image>
        );
    }
}

export default Loading;