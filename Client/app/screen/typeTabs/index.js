import React from 'react';
import {
    Text,
    View
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
import Meanless1 from '../meanless/meanless1'
import Meanless2 from '../meanless/meanless2';
import Meanless3 from '../meanless/meanless3';

export default class TypeTabs extends React.Component {
    render() {
        return  (
            <ScrollableTabView
                style={{marginTop: 20}}>
                <Meanless1
                    tabLabel="해주세요"/>
                <Meanless2
                    tabLabel="해줄게요"/>
                <Meanless3
                    tabLabel="같이해요"/>
            </ScrollableTabView>
        )
    }
}