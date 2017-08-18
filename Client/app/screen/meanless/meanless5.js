import React from 'react';
import {
    Text,
    View,
    Alert,
} from 'react-native';

import Meanless2 from './meanless5';

class meanless5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: {},
        }
    }
    componentWillMount() {
        //Alert.alert('componentWillMount!');
    }

    componentDidMount() {
        //Alert.alert('componentDidMount!');
    }
    componentWillReceiveProps() {
        Alert.alert('hehe');
        this.setState({nav: this.props.navigation})
    }
    componentDidUpdate() {
        Alert.alert('componentDidUpdate');
    }
    render() {
        return (
            <View>
                <Text>
                    {JSON.stringify(this.props.navigation)}
                </Text>
                <Text>
                    {this.props.navigation.state.params ? this.props.navigation.state.params.user_email: ''}
                </Text>
                <Text>
                    {this.props.navigation.state.params ? this.props.navigation.state.params.partner_email: ''}
                </Text>
            </View>
        )

    }
}

export default meanless5;