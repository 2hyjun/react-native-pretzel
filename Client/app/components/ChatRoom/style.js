import {
    StyleSheet,
    Platform
} from 'react-native';

import { height, width, totalSize } from 'react-native-dimension';
const headerTitleMarginBottom = Platform.OS === 'ios' ? 10 : 0;
const styles = StyleSheet.create({
    tabBarIcon: {
        width: width(10), height: height(5),
        resizeMode: 'contain'
    },
    headerTitle: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: '#f95a25',
        marginBottom: headerTitleMarginBottom,
    }
});

export default styles;