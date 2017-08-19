import React, { PropTypes } from 'react';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const PADDING = 16;
const ICON_WIDTH = 40;

export default class Fumi extends BaseInput {
    static propTypes = {
        iconClass: PropTypes.func.isRequired,
        iconName: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        iconSize: PropTypes.number,
        passiveIconColor: PropTypes.string,
        height: PropTypes.number,

        secure: PropTypes.bool.isRequired,
        onTextChanged: PropTypes.func.isRequired,
        autoCorrection: PropTypes.bool.isRequired,
        autoCapital: PropTypes.oneOf([
            'none',
            'sentences',
            'words',
            'characters',
        ]),
        keyType: PropTypes.oneOf([
            'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search'
        ]),
        myOnFocus: PropTypes.func,
    };

    static defaultProps = {
        height: 48,
        iconColor: '#00aeef',
        iconSize: 20,
        passiveIconColor: '#a3a3a3',
        animationDuration: 300,
        keyType: 'default',
        autoCapital: 'none'
    };
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            iconClass,
            iconColor,
            iconSize,
            passiveIconColor,
            iconName,
            label,
            style: containerStyle,
            inputStyle,
            height: inputHeight,
            labelStyle,
            secure,
            onTextChanged,
            keyType,
            autoCorrection,
            autoCapital,
            myOnFocus
        } = this.props;
        const { focusedAnim, value } = this.state;
        const AnimatedIcon = Animated.createAnimatedComponent(iconClass);
        const ANIM_PATH = PADDING + inputHeight;
        const NEGATIVE_ANIM_PATH = ANIM_PATH * -1;

        return (
            <View
                style={[styles.container, containerStyle]}
                onLayout={this._onLayout}
            >
                <TouchableWithoutFeedback onPress={this.focus}>
                    <AnimatedIcon
                        name={iconName}
                        color={iconColor}
                        size={iconSize}
                        style={{
                            position: 'absolute',
                            left: PADDING,
                            bottom: focusedAnim.interpolate({
                                inputRange: [0, 0.5, 0.51, 0.7, 1],
                                outputRange: [
                                    24,
                                    ANIM_PATH,
                                    NEGATIVE_ANIM_PATH,
                                    NEGATIVE_ANIM_PATH,
                                    24,
                                ],
                            }),
                            color: focusedAnim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [passiveIconColor, iconColor, iconColor],
                            }),
                        }}
                    />
                </TouchableWithoutFeedback>
                <View
                    style={[
                        styles.separator,
                        {
                            height: inputHeight,
                            left: ICON_WIDTH + 8,
                        },
                    ]}
                />
                <TouchableWithoutFeedback onPress={this.focus}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            left: ICON_WIDTH + PADDING,
                            height: inputHeight,
                            top: focusedAnim.interpolate({
                                inputRange: [0, 0.5, 0.51, 0.7, 1],
                                outputRange: [
                                    24,
                                    ANIM_PATH,
                                    NEGATIVE_ANIM_PATH,
                                    NEGATIVE_ANIM_PATH,
                                    PADDING / 2,
                                ],
                            }),
                        }}
                    >
                        <Animated.Text
                            style={[
                                styles.label,
                                {
                                    fontSize: focusedAnim.interpolate({
                                        inputRange: [0, 0.7, 0.71, 1],
                                        outputRange: [16, 16, 12, 12],
                                    }),
                                    color: focusedAnim.interpolate({
                                        inputRange: [0, 0.7],
                                        outputRange: ['#696969', '#a3a3a3'],
                                    }),
                                },
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TextInput
                    ref="input"
                    //{...this.props}
                    height={this.props.height}
                    style={[
                        styles.textInput,
                        {
                            marginLeft: ICON_WIDTH + PADDING,
                            color: iconColor,
                        },
                        inputStyle,
                    ]}
                    keyboardType={keyType}
                    value={value}
                    onBlur={this._onBlur}
                    onFocus={(event) => {
                        this._onFocus(event);
                        if (typeof(myOnFocus) === 'function')
                            myOnFocus(event);
                    }}
                    onChange={this._onChange}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={secure}
                    onChangeText={onTextChanged}
                    autoCorrect={autoCorrection}
                    autoCapitalize={autoCapital}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingTop: 16,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 18,
        //fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        color: 'black',
        fontSize: 18,
        padding: 7,
        paddingLeft: 0,
    },
    separator: {
        position: 'absolute',
        width: 1,
        backgroundColor: '#f0f0f0',
        top: 8,
    },
});
