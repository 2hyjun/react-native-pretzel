import React from 'react';
import {
    Text,
    View
} from 'react-native';


class meanless4 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Will 4');
    }

    componentDidMount() {
        console.log('Did 4');
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

export default meanless4;