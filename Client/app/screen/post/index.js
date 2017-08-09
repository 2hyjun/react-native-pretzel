import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    Picker,
    Image
} from 'react-native';

import ToggleBox from '../../components/ToggleBox'
import styles from './style';
export default class post extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) =>
            <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_request_highlighted.png')}/>
    };
    constructor(props){
        super(props);

        this.state = {
            language: '',
        }
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, marginTop: 100}}>
                    <ToggleBox label={'Choose Category'}>
                        <View style={{backgroundColor: 'skyblue', flex: 1}}>
                            <Picker
                                style={{backgroundColor: 'skyblue'}}
                                selectedValue={this.state.language}
                                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>

                    </ToggleBox>
                </ScrollView>
                <View style={{flex: 1, alignSelf: 'baseline'}}>
                    <Text style={{textAlign: 'center'}}>
                        State: {this.state.language}
                    </Text>
                </View>
            </View>


        )
    }
}