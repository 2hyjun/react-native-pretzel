import React from 'react';
import {
    Text,
    View
} from 'react-native';


class meanless3 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Will 3');
    }

    componentDidMount() {
        console.log('Did 3');
    }
    render() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    HEHE
                </Text>
            </View>
        )
    }
}

export default meanless3;