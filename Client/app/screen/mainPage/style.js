import React from 'react';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    cellOne: { //logoBar
        flex: 1,
        backgroundColor: '#F2A54D',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTwo: { //DoItPlz
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#009999',
    },
    cellThree: { //DoItMyself
        flex: 3,
        marginTop: 20,
        flexDirection: 'column',
        backgroundColor: '#F2A54D',
    },
    cellFour: { //DoItTogether
        flex: 3,
        marginTop: 20,
        flexDirection: 'column',
    },
    cellFive: { //FooterBar
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 20,
        flexDirection: 'row',
    },
});


export default styles;