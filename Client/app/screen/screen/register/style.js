import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F9F7F6'
    },
    cell_logo: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logo: {
        flex: 1,
        resizeMode: 'contain'
    },
    cell_info: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    cell_form: {
        marginTop: 10,
        flex: 3.5,
    },
    form_scroll: {
        flex: 1,
    },
    textInput: {
        height: '15%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    cell_wave: {
        flex: 1.5,
        //width: '100%',
        alignItems: 'center',

    },
    wave: {
        flex: 1,
        width: width,
        //resizeMode: 'contain'
    },
    cell_register: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'skyblue'
    },
    registerBtn: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#d3e229',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
    },
    registerTxt:  {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default styles;
