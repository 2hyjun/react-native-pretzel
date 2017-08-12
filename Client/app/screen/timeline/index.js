import React from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,

} from 'react-native';
import DropdownAlert from '../../components/DropdownAlert';
import styles from './style'
const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];
const STORAGE_KEY = '@PRETZEL:jwt';

export default class timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'CoffeeEnabled': false,
            'RiceBurgerEnabled': false,
            'ToastEnabled': false,
            'RideEnabled': false,
            'PrintEnabled': false,
            'ReturnBookEnabled': false,
            'ETCEnabled': false,
            'QueryResult': [],
        };
        this.GetToken = this.GetToken.bind(this);
        this.HttpRequest = this.HttpRequest.bind(this);


    }
    GetToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }
    HttpRequest(token) {
        return (
            fetch('http://13.124.147.152:8124/api/timeline', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': token,
                },
            }).then((res) => res.json())
        )
    }

    componentWillMount() {
        this.GetToken()
            .then(this.HttpRequest)
            .then((res) => {
                if (res.resultCode === 100)
                    this.setState({QueryResult: res});
                else {
                    this.dropdown.alertWithType('error', '서버 에러', res.result);
                }
            })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.filter}>
                    <View style={styles.filter_head}>
                        <Text style={{fontSize: 12}}>필터</Text>
                    </View>
                    <View style={styles.filter_content}>
                        <ScrollView horizontal={true} style={styles.filter_scrollview}>
                            <TouchableOpacity style={styles.filter_item_enabled}>
                                <Text style={styles.filter_text_enabled}>Test</Text>
                            </TouchableOpacity>
                            {contents.map((value, i) => (
                                <TouchableOpacity style={styles.filter_item_disabled}
                                                key={i}>
                                    <Text style={styles.filter_text_disabled}>{value}</Text>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>
                    </View>

                    <View style={styles.timeline_container}>

                    </View>
                </View>
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref}
                    onCancel={() => this.setState({elevationToZero: false})}
                    onClose={() => this.setState({elevationToZero: false})}
                />
            </View>
        )
    }
}