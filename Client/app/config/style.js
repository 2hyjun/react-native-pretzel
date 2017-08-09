import {
    StyleSheet,
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
    tabBarIcon: {
        width: width(10), height: height(5),
        resizeMode: 'contain'
    }
});

export default styles;