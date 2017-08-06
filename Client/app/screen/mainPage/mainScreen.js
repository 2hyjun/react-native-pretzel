/* This page is for showing orders briefly on three categories which is
 'hae-ju-se-yo', 'hae-jul-ge-yo', 'gati-hae-yo' */

import React, { Component, } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    TextInput,
    Text,
    Linking,
} from 'react-native';

import styles from './style';

class mainScreen extends Component {
    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.cellOne}>
                    <Text> logoBar </Text>
                </View>
                <View style={styles.cellTwo}>
                    <Text> DoItPlz </Text>
                </View>
                <View style={styles.cellThree}>
                    <Text> DoItMyself </Text>
                </View>
                <View style={styles.cellFour}>
                    <Text> DoItTogether </Text>
                </View>
                <View style={styles.cellFive}>
                    <Text> FooterBar </Text>
                </View>
            </View>
        );
    }
}


export default mainScreen;
