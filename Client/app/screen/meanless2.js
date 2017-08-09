import React from 'react';
import {
    View,
    Text,
    Alert,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import { encrypt } from 'react-native-simple-encryption';

const STORAGE_KEY = '@PRETZEL:jwt';

class meanless2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'thisiSSimplepretzelClientEncryptionKEy',
            value: 'zk5687'
        };

        this._encrypt = this._encrypt.bind(this);
    }
    _encrypt() {
        let encrypted = encrypt(this.state.key, this.state.value);
        this.setState({value: encrypted});
    }
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                    value: {this.state.key}
                </Text>
                <Text style={{textAlign: 'center'}}>
                    value: {this.state.value}
                </Text>
                <TouchableOpacity
                    style={{height: 50, width: 50, backgroundColor: 'skyblue', marginTop: 100, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this._encrypt()}
                >
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default meanless2;