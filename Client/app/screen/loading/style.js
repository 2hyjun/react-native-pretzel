import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: height,
        width: width,
    },
    backgroundImg: {
        flex: 1,
        height: height,
        width: width
    },
    logo: {
        flex: 1,
        borderWidth: 30,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'black'
    },
    logotype: {
        flex: 1,
        resizeMode: 'center'
    },
    logoContainer: {
        flex: 1,
        backgroundColor: 'white',
        //borderRadius: 100,
    },
    logoDesign: {
        //flex: 1,
        resizeMode: 'center'
    }
});

export default styles;