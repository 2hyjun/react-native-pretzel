import React from 'react';
import {
    Text,
    View
} from 'react-native';


class meanless2 extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Will 2');
    }

    componentDidMount() {
        console.log('Did 2');
    }


    render() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    Hi
                </Text>
            </View>
        )
    }
}

export default meanless2;