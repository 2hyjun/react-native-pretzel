export const MainTab = TabNavigator({
    Timeline: {
        screen: TypeTab,
        navigationOptions: {

            gesturesEnabled: false,
            tabBarIcon: ({ focused }) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_home_highlighted.png')
                    : require('../../img/underBarIcon/underbar_home_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        }
    },
    Post: {
        screen: post,
        navigationOptions : ({navigation}) => ({
            tabBarIcon: ({ focused }) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_request_highlighted.png')
                    : require('../../img/underBarIcon/underbar_request_disabled.png');
                return <Image style={styles.tabBarIcon} source={imgSource}/>
            }
        })
    },
    Chat: {
        screen: ChatStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_chatting_highlighted.png')
                    : require('../../img/underBarIcon/underbar_chatting_disabled.png');
                return <TouchableOpacity onPress={() => {navigation.navigate('Chat')}}><Image style={styles.tabBarIcon} source={imgSource}/></TouchableOpacity>
            }
        })
    },
    MyPage: {
        screen: MyPageStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                let imgSource = focused
                    ? require('../../img/underBarIcon/underbar_mypage_highlighted.png')
                    : require('../../img/underBarIcon/underbar_mypage_disabled.png');
                return <TouchableOpacity onPress={() => {navigation.navigate('MyPage')}}><Image style={styles.tabBarIcon} source={imgSource}/></TouchableOpacity>
            }
        })
    }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
    },
    gesturesEnabled: false,

});