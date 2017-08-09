import React from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import styles from './style';
class Tabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'首页',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator tabBarStyle={styles.tabBarStyle} tabBarShadowStyle={styles.tabBarShadowStyle}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Timeline'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_home_disabled.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabBarSelectedIcon ]} source={require('../../../img/underBarIcon/underbar_home_highlighted.png')}/>}
                        onPress={() => this.setState({ selectedTab: 'Timeline' })} >
                        <Text>Timeline</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Post'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_request_disabled.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabBarSelectedIcon ]} source={require('../../../img/underBarIcon/underbar_request_highlighted.png')}/>}
                        onPress={() => this.setState({ selectedTab: 'Post' })} >
                        <Text>产品</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Chat'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_chatting_disabled.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabBarSelectedIcon ]} source={require('../../../img/underBarIcon/underbar_chatting_highlighted.png')}/>}
                        onPress={() => this.setState({ selectedTab: 'Chat' })} >
                        <Text>活动</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'MyPage'}

                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image style={styles.tabBarIcon} source={require('../../../img/underBarIcon/underbar_mypage_disabled.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabBarSelectedIcon ]} source={require('../../../img/underBarIcon/underbar_mypage_highlighted.png')}/>}
                        onPress={() => this.setState({ selectedTab: 'MyPage' })} >
                        <Text>我的</Text>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

export default Tabs;