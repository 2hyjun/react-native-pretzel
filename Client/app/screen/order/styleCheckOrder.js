import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

//noinspection JSAnnotator,JSAnnotator
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
    cellTwo: { //Brief Info
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    cellThree: { //Detailed Info includes User's Profile
        flex: 2,
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    cellThreePerson: { //User Profile pic and ID
        flex: 1,
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'center',
backgroundColor:'skyblue',
    },
    cellThreePersonPic: { //User Profile pic
        flex: 3,
        marginTop: 10,

        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'blue',
    },
    cellThreePersonID: { //User Profile ID
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
    },
    cellThreeDetail: { //Detailed Msg
        flex: 3,
        marginTop: 20,
        marginLeft: 10,
        flexDirection: 'column',
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
});


export default styles;