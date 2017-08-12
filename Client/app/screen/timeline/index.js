import React from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    ListView

} from 'react-native';
import DropdownAlert from '../../components/DropdownAlert';
import styles from './style'


import TimelineListItem from '../../components/TimelineListItem';
const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];
const STORAGE_KEY = '@PRETZEL:jwt';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


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
            dataSource: ds.cloneWithRows([]),

        };
        this.GetToken = this.GetToken.bind(this);
        this.HttpRequest = this.HttpRequest.bind(this);
        this._renderRefresh = this._renderRefresh.bind(this);


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

    _renderRefresh() {
        this.GetToken()
            .then(this.HttpRequest)
            .then((res) => {
                if (res.resultCode !== 100) {
                    this.dropdown.alertWithType('error', '서버 에러', res.result);
                } else {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(res.result)
                    })

                }
            })
    }
    componentDidMount() {
        this._renderRefresh();
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
                                <Text style={styles.filter_text_enabled}>모두보기</Text>
                            </TouchableOpacity>
                            {contents.map((value, i) => (
                                <TouchableOpacity style={styles.filter_item_disabled}
                                                  key={i}>
                                    <Text style={styles.filter_text_disabled}>{value}</Text>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>
                    </View>
                </View>
                <View style={styles.timeline_container}>

                    <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(rowData) =>
                            <TimelineListItem
                                user_email={rowData.user_email}
                                detailInfo={rowData.detailInfo}
                                expectedPrice={rowData.expectedPrice}
                                fee={rowData.fee}
                                deadline={rowData.deadline}
                                rid={rowData.rid}
                                title={rowData.title}
                                time={rowData.time}
                                place={rowData.place}
                            />
                        }
                    />
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