import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import styles from './style'
const contents = ['커피', '밥버거', '토스트', '데려다줘', '인쇄', '책반납', '기타'];

export default class timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableCoffee: true,
            enableRiceBurger: true,
            enableToast: true,
            enableTaxi: true,
            enablePrint: true,
            enableReturnBook: true,
            enableOthers: true,
        }

    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.filter}>
                    <View style={styles.filter_head}>
                        <Text style={{fontSize: 12}}>필터</Text>
                    </View>
                    <View style={styles.filter_content}>
                        <ScrollView horizontal={true}>
                            {contents.map((value, i) => (
                                <TouchableOpacity style={styles.filter_item_disabled}
                                                key={i}>
                                    <Text style={styles.filter_text_disable}>{value}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.timeline_container}>

                    </View>
                </View>
            </View>
        )
    }
}