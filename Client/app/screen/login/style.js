import React from 'react';
import {
    StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EAEAEA'
    },


    cell_logo: {
        flex: 1.5,
        alignItems: 'center'
    },
    logo: {
        marginTop: 60,
        resizeMode: 'center'
    },


    cell_form: {
        flex: 2
    },
    form_email: {
        flex: 1,
        borderWidth: 3,
        borderColor: '#EAEAEA',
        borderRadius: 17,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sae_form_email: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        borderColor: '#EAEAEA'
    },
    email_icon: {
        flex: 1,
        marginLeft: 10,
        height: 30,
        width: 30,
        resizeMode: 'center'

    },
    email_txt: {
        flex: 5,
        marginRight: 30,
    },
    form_pw: {
        flex: 1,
        borderWidth: 3,
        borderColor: '#EAEAEA',
        borderRadius: 17,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'row',
    },
    pw_icon: {
        flex: 1,
        marginLeft: 10,
        height: 30,
        width: 30,
        resizeMode: 'center'
    },
    pw_txt: {
        flex: 5,
        marginRight: 30,
    },
    form_config: {
        flex: 2,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    config_signin: {
        flex: 1.6,
        borderRadius: 10,
        backgroundColor: '#d3e229',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
    },
    signin_txt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    config_forgot_pw: {
        flex: 1,
        borderRadius: 17,
        marginTop: 10
    },
    config_register: {
        flex: 1,
        borderRadius: 17,
    },
    cell_wave: {
        flex: 1.2,
        alignItems: 'center',

    },
    wave: {
        flex: 1,
        resizeMode: 'contain'
    }
});


export default styles;