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
        justifyContent: 'center',
        flexDirection: 'row',
    },
    header_title: {
        width: width(60),
        height: height(5),
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#585858'

    },
    header_time: {
        width: width(20),
        height: height(5),
        fontSize: 12,
        color: '#585858'

    }
})