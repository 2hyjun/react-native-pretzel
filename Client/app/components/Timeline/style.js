import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        //justifyContent: 'center',
        alignItems: 'center'
    },
    filter: {
        height: height(10),
        width: width(100),
        backgroundColor: 'white',
    },
    filter_head: {
        marginLeft: width(3),
        height: height(3),
    },
    filter_content: {
        backgroundColor: 'white',
        width: width(100),
        height: height(10),
        flexDirection: 'row',
    },
    filter_item_disabled: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        margin: 3,
        marginBottom: 10,
        justifyContent: 'center'
    },
    filter_text_disabled: {
        color: 'lightgrey',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    filter_item_enabled: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#f95a25',
        backgroundColor: '#f95a25',
        margin: 3,
        marginBottom: 10,
        justifyContent: 'center',

    },
    filter_text_enabled: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    filter_scrollview: {
        height: height(8),
        //backgroundColor: 'red'
    }
    ,
    timeline_container: {
        height: height(90),
        width: width(100),
        //backgroundColor: '#e2e2e2',
        //backgroundColor: 'skyblue'
    },
    timeline_scrollview: {
        height: height(90),
        width: width(100),
        backgroundColor: '#e2e2e2',
        alignItems: 'center'
    },
    dialog_container: {
        marginTop: -200,
        height: height(60),
        backgroundColor: 'skyblue',
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,

    },

});

export default styles;