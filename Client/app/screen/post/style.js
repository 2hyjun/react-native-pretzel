import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    contents_container: {
        //height: height(5),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ripple: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        minHeight: height(5),
        width: width(40),
        margin: 4,
        borderRadius: 2,
        elevation: 3,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    ripple_text: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    detailInfo_text: {

    },
    detailInfo: {
        padding: 16,
        backgroundColor: '#efefef',
        //justifyContent: 'center',
        margin: 4,
        borderRadius: 2,
        elevation: 3,
        height: height(30),
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    detailInfo_toggle_view: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 2,
        elevation: 3,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    detailInfo_toggle: {
        //backgroundColor: 'skyblue'
    },
    ripple_detail: {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: width(82),
        minHeight: height(5),
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 2,
        elevation: 3,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dialog_button_detail: {
        alignSelf: 'center',
        marginBottom: 100,
        width: width(90),
    },
    detail_input: {
        height: 180,
        fontSize: 20,
        //backgroundColor: 'skyblue'
    },
    forms: {
        //backgroundColor: 'skyblue',
        height: height(70)
    },
    detail_cell_style: {
        alignItems: 'center',

        //backgroundColor: 'skyblue',
        marginTop: 10,
        marginBottom: 10
    },
    form_input: {
        marginLeft: 30,
        marginRight: 30,
        height: height(10),
        backgroundColor: "#F2F2F2",
    },
    deadline: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        padding: 16,
        height: height(10),
        // backgroundColor: 'skyblue',
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',

    },
    deadline_text: {
        //color: 'grey',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 7,
        paddingLeft: 0,
        marginLeft: 20,
        // marginBottom: 10,
        // backgroundColor: 'skyblue',
    },
    detail_done: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit_cell: {
        width: width(50),
        height: width(10),
        backgroundColor: 'red'
    },
    submitBtn: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#d3e229',
        alignItems: 'center',
        justifyContent: 'center',
        width: width(50),
        height: height(10),
        marginTop: 10,
        alignSelf: 'center'
    },
    submitTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    }



});

export default styles;
