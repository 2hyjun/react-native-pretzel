import React from 'react';
import {
    View,
    Text
} from 'react-native'
import {
    Root
} from '../config/router.js';

import Register from '../screen/register';
class App extends React.Component {
    render() {
        return (
            <Register/>
        );
    }
}

export default App;