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
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTwo: { //Choose Categories
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#009999',
    },
    cellThree: { //First Toggle : What to order
        flex: 4,
        marginTop: 20,
        flexDirection: 'column',
        backgroundColor: '#F2A54D',
    },
    cellFour: { //Second Toggle : Who will run
        flex: 3,
        marginTop: 20,
        flexDirection: 'column',
    },
    cellFive: { //NextButton
        flex: 1,
        backgroundColor: '#009999',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
    },
    cellSix: { //Under Bar(Tab bar)
        flexDirection: 'row',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        marginTop : 20,
        marginBottom : 20,
        resizeMode:'contain',
    },
    content: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default styles;