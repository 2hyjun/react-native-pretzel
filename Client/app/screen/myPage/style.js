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
        backgroundColor: '#F2A54D',
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
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'black',
    },
    cellThree: { //Detailed sets
        flex: 2,
        marginTop: 30,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    cellFour: { //Information Lists
        flex: 5,
        marginTop: 20,
        flexDirection: 'column',
    },
    cellFive: { //Under Bar(Tab bar)
        flexDirection: 'row',
        backgroundColor: '#000000',
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
        paddingTop: 30,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
});


export default styles;