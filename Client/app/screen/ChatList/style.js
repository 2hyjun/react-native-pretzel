import {
    StyleSheet,
    Platform,
} from 'react-native';

import { height, width } from 'react-native-dimension';

const HeaderTitleMarginTop = Platform.OS === 'ios' ? 5 : 0;
const headerFontWeight = Platform.OS === 'ios' ? undefined : 'bold';
const titleHeight = Platform.OS === 'ios' ? height(10) : height(7);
const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: headerFontWeight,
        marginTop: HeaderTitleMarginTop,
    },
    title: {
        width: width(100),
        height: titleHeight,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowRadius: 1,
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 0.8,
        },
    }
});


export default styles;