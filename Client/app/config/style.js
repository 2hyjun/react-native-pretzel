import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
    tabBarIcon: {
        width: width(10), height: height(5),
        resizeMode: 'contain'
    },
    orange: {
        color: '#f95a25',
    },
    background: {
        color: '#f7f7f7',
    },
    popTitle: { //메인화면 팝업창에 제목 색상임다
        color: '#292929',
    },
    popDetail:{
        color: '#333333', //메인화면 팝업창 세부정보(사람마다 다름) 색상
    },
    lime:{
        color:'#D2DB08', //수락색깔
    }
});

export default styles;