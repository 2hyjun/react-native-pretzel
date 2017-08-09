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
        height: height(12.5),
        width: width(100),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellOneLogo: { //Left arrow
        width: width(86),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cellOneBack: { //index logo
        width: width(14),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTwo: { //Log Out
        width: width(100),
        height: 60,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
    },
    cellThree: { //Detailed sets
        //flex: 2,
        marginTop: 40,
        flexDirection: 'row',
        backgroundColor: '#ffffff',

    },
    cellFive: { //Under Bar(Tab bar)
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        marginTop : 20,
        marginBottom : 20,
        resizeMode:'contain',
    },
    content: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container:{
        padding: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
});


export default styles;