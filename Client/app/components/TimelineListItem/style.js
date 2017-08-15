import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';

export default StyleSheet.create({
    container: {
        height: height(15),
        width: width(90),
        flexDirection: 'row',
        //backgroundColor: 'skyblue',
        //borderWidth: 1,
        //borderColor: 'red',
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        elevation: 6,
        shadowRadius: 4,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    acceptButtonView: {
        height: height(15),
        width: width(10),
        backgroundColor: '#D2DB08',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,

    },
    infoms: {
        height: height(15),
        width: width(80),
        backgroundColor: 'white',
    },
    header: {
        //backgroundColor: 'red',
        height: height(5),
        width: width(80),
        marginTop: 5,
        justifyContent: 'center',
        flexDirection: 'row',

    },
    header_title: {
        width: width(60),
        height: height(5),
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#585858'

    },
    header_time: {
        width: width(20),
        height: height(5),
        marginTop: 5,
        fontSize: 15,
        color: '#585858'
    },
    acceptButtonTxt1: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 10,
    },
    acceptButtonTxt2: {
        padding: 10,
        paddingBottom: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 0,
    },
    body: {
        //backgroundColor: 'red',
        height: height(10),
        width: width(80),
        flexDirection: 'row',
        marginTop: 10,
        //justifyContent: 'center',
        // backgroundColor: 'skyblue'
    },
    body_header: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    body_body: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    body_location: {

        width: width(25)
    },
    body_fee: {

        width: width(25)
    },
    body_deadline: {

        marginLeft: 10,
        width: width(25)
    },
    body_header_text: {
        fontSize: 15,
        color: '#333333'
    },
    body_header_line: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        height: 0.5,
        width: width(10),
        backgroundColor: '#eb6736'
    },
    body_body_text: {
        marginTop: 10,
        color: '#eb6736',
        fontSize: 17,
    }
})