import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBarStyle: {
        backgroundColor: '#fff',
        overflow: 'visible',
    },
    tabBarShadowStyle: {
        height: 0,
    },
    tabBarIcon: {
        width: 35, height: 35,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        width: 35, height: 35,
        resizeMode: 'contain',
       // tintColor: '#b42325',
    }
});

export default styles;