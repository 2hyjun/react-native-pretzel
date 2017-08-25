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
        alignItems: 'flex-end',
    },
    cellTwo: { //User info : profile pic, major/student ID/name
        height: height(20),
        width: width(100),
        flexDirection: 'row',
        marginTop: 10,
    },
    cellTwoOne: { //User info : profile pic
        width: width(30),
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cellTwoOnePic: { //User info : profile pic
        flex:3,
        alignItems: 'center',
    },
    cellTwoOneID: { //User info : profile pic
        flex:1,
        alignItems: 'center',
    },
    cellTwoTwo: { //major/student ID/name
        width: width(70),
        flexDirection: 'row',
    },
    cellTwoTwoInfo: { //학교, 학과, 이름
        flex:1,
        flexDirection: 'column',
    },
    cellTwoRow:{
        flex:4,
        flexDirection:'row',
        alignItems:'center',
    },
    cellTwoRow1:{
        flex:1,
    },
    cellTwoRow2:{
        flex:3,
    },
    cellTwoTwoVari: { //사람에 따라 달라용
        flex:4,
        flexDirection: 'column',
    },
    cellTwoVariRow:{
        flex:1,
        justifyContent: 'center',
        //borderWidth: 0.5,
        //borderBottomColor: '#d6d7da',
    },
    cellThree: { //요청현황
        flex: 0.2,
        alignSelf:'flex-start',
        width:width(25),
        marginTop:10,
        marginLeft:20,
        borderWidth: 1,
        borderColor: '#eb6736',
        borderRadius:10,
        justifyContent: 'center',
    },
    cellFour: { //Detailed sets
        flex: 2,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: width(90),
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