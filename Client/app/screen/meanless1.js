import React from 'react';
import {
    View,
    Text,
    Alert,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

const STORAGE_KEY = '@PRETZEL:jwt';

class meanLess1 extends React.Component {

    constructor() {
        super();
        this.state = {
            user_email: '',
            user_name: "",
            user_univ: "",
            user_major: "",
        }
    }

    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }

    HTTPRequest(value) {
        return fetch('http://localhost:8124/api/timeline/mypage', {
                method: 'GET',
                headers: {
                    'x-access-token': value
                }
        })
            .then((res) => res.json())
    }

    Logout() {
        AsyncStorage.removeItem(STORAGE_KEY)
            .then(this.props.navigation.navigate('Login'))
            .catch((err) => console.log(err))
    }

    componentDidMount() {
        this.GetToken()
            .then(this.HTTPRequest)
            .then((res) => {
                console.log(res.result);

                this.setState({
                    user_email: res.myInfo.user_email,
                    user_name: res.myInfo.user_name,
                    user_univ: res.myInfo.user_univ,
                    user_major: res.myInfo.user_major,
                })
            })
            .catch((err) => console.error(err))

    }
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    Your Email: {this.state.user_email}
                </Text>
                <Text>
                    Your Name: {this.state.user_name}
                </Text>
                <Text>
                    Your Univ: {this.state.user_univ}
                </Text>
                <Text>
                    Your Major: {this.state.user_major}
                </Text>
                <TouchableOpacity
                    style={{height: 50, width: 50, backgroundColor: 'skyblue', marginTop: 100, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.Logout()}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{height: 50, width: 50, backgroundColor: 'skyblue', marginTop: 100, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                        this.props.navigation.navigate('Post')
                    }}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
 }

 export default meanLess1;