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
    cellOne: { // setting 톱니바퀴 아이콘
        height: 50,
        width: width(100),
        backgroundColor: '#ffffff',
        alignItems: 'flex-end',
    },
    cellTwo: { //User info : profile pic, major/student ID/name
        flex: 1.3,
        width: width(100),
        flexDirection: 'row',
        marginTop: 10,
    },
    cellTwoProfile: { //User info : profile pic
        width: width(25),
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cellTwoProfilePic: { //User info : profile pic
        flex:3,
        alignItems: 'center',
    },
    cellTwoProfileID: { //User info : profile pic
        flex:1,
        alignItems: 'center',
    },
    cellTwoInfo: { //major/student ID/name
        width: width(75),
        margin: 10,
        marginRight: 20,
        flexDirection: 'row',
    },
    cellTwoInfoFix: { //학교, 학과, 이름
        flex:1,
        flexDirection: 'column',
        marginTop:10,
    },
    rowFix: {
        flex: 1,
    },
    cellTwoInfoVari: { //사람에 따라 달라요
        flex:5,
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
        height: 35,
        alignItems: 'center',
    },

});


export default styles;