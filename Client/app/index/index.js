import React from 'react';
import {
    View,
    Text
} from 'react-native'
import {
    Loading
} from '../config/router.js';

//import Loading from '../screen/loading'
import Register from '../screen/register';

class App extends React.Component {
    render() {
        return (
            <Loading/>
        );
    }
}

export default App;