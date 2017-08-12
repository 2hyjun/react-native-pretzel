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
        marginTop: height(1.5),
        marginLeft: width(3),
        height: height(3),
    },
    filter_content: {
        backgroundColor: 'white',
        width: width(100),
        height: height(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filter_item_disabled: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#e6e6e6',
        backgroundColor: 'white',
        margin: 3,
        marginBottom: 10,
    },
    filter_text_disable: {
        color: '#e6e6e6',
        textAlign: 'center'
    },
    timeline_container: {
        height: height(90),
        width: width(100),
        backgroundColor: '#efefef'
    },
});

export default styles;