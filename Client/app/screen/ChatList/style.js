
import React from 'react';
import {
    StyleSheet,
    Platform
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const HeaderTitleMarginTop = Platform.OS === 'ios' ? 5 : 0;

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: HeaderTitleMarginTop
    },
    title: {
        width: width(100),
        height: height(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowRadius: 1,
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 0.8,
        },
    }
});


export default styles;