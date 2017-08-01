import React from 'react';
import {
    View,
    Image,
    Alert,
} from 'react-native'

import styles from './style';

class Loading extends React.Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        fetch('http://localhost:8124/')
            .then((res) => res.json())
            .then((rJSON) => {
                Alert.alert(JSON.stringify(rJSON));
                if (rJSON.resultCode === 100) {
                    this.props.navigation.navigate('Main')
                } else if (rJSON.resultCode === 1) {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((err) => console.error(err));

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