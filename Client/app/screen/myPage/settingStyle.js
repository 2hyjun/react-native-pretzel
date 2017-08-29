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
    cellOne: { //logoBar
        height: height(7),
        width: width(100),
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent:'center',
    },
    cellTwo: { //Log Out
        width: width(100),
        height: height(7),
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
    },
    cellThree: { //Detailed sets
        marginTop: 40,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    container:{
        padding: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        height: height(7),
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        borderBottomColor : 'lightgray',
    },
});


export default styles;