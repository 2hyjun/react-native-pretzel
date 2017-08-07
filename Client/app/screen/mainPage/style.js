import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#efefef',
        alignItems: 'center',
    },
    cellOne: { //상단 바
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default styles;