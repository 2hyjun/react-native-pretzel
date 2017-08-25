import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        // justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
    },
    filter_text_disabled: {
        color: 'lightgrey',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: totalSize(2), //15
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
        fontSize: totalSize(2),
    },
    filter_scrollview: {
        height: height(8),
        // backgroundColor: 'red'
    },
    timeline_container: {
        height: height(90),
        width: width(100),
        // backgroundColor: '#e2e2e2',
        // backgroundColor: 'skyblue'
    },
    timeline_scrollview: {
        height: height(90),
        width: width(100),
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
    },
    dialog_container: {
        marginTop: -200,
        height: height(60),
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
    },

    // 팝업창 스타일
    popCell:{
        flexDirection:'column',
        backgroundColor:'#ffffff',
        height: height(60),
        alignItems: 'center',
        borderRadius: 10,
    },
    popCellOne: { //날짜, 항목(커피), 타입(해주세요)
        flex: 1,
        width: width(100),
        flexDirection:'column',
    },
    popCellOneRow:{
        flexDirection:'row'
    },
    popCellOneLine:{
        flex:5,
        borderTopColor: '#D2DB08',
        borderColor: 'transparent',
        borderWidth: 2,
        marginTop:10,
        marginLeft: 10,
    },
    popCellOneDate:{
        flex:1,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        marginLeft:15,
        marginTop:5,
    },
    popCellOneInfo:{
        flex:1,
        borderColor: '#D2DB08',
        borderWidth: 1,
        borderRadius: 30,
        height: height(6.5),
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'row',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    popCellTwo: { //상세
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        width: width(75),
    },
    popCellTwoTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#292929',
    },
    popCellThree: { //배달장소, 배달기한, 예상가격, 배달료
        flex: 2,
        backgroundColor: '#f7f7f7',
        marginTop: 20,
        width: width(85),
        flexDirection: 'column',
        borderRadius: 10,
        marginBottom: 10,
    },
    popCellThreeInfo:{
        marginTop:10,
        flex:1,
        flexDirection:'row',
    },
    popCellThreeRow: { //배달장소, 배달기한, 예상가격, 배달료 글씨
        flex: 1,
        alignItems: 'flex-end',
    },
    popCellThreeColumn: { //받아오는 정보
        flex: 2.5,
        alignItems: 'center',
    },
    popCellFour: {
        flex:0.1,
        borderTopColor: '#D2DB08',
        borderColor: 'transparent',
        borderWidth: 2,
        marginLeft:10,
        marginRight:10,
        width: width(95),
    },
    popCellText:{
        color : '#333333',
        fontWeight:'bold',
    },
});

export default styles;
