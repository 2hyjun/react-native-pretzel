import React from 'react';
import {
    Text,
    View,
    AsyncStorage,
    Alert
} from 'react-native';

import Meanless4 from './meanless5';
import Button from "react-native-elements/src/buttons/Button";

class meanless7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            str: ''
        };
        this._get = this._get.bind(this);
        this._store = this._store.bind(this);
        this._delete = this._delete.bind(this);
    }
    _get() {
        AsyncStorage.getItem('hehe')
            .then((value) => {
                if (value)
                    Alert.alert('', value);
                else
                    Alert.alert('', 'undefined')
            })
            .catch(e => {console.error(e)})
    }
    _store() {
        AsyncStorage.setItem('hehe', 'fuckyou')
            .then(() => Alert.alert('', 'saved!'))
            .catch(e => {console.error(e)})
    }
    _delete() {
        AsyncStorage.removeItem('hehe')
            .then(() => { Alert.alert('', 'deleted')})
            .catch(e => {console.error(e)})
    }
    render() {
        return (
            <View>
                <Button
                  title={'get'}
                  onPress={this._get}
                />
                <Button
                    title={'set'}
                    onPress={this._store}
                />
                <Button
                    title={'remove'}
                    onPress={this._delete}
                />

            </View>
        )

    }
}

export default meanless7;