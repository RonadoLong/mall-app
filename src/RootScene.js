
import React, {PureComponent} from 'react'
import {StatusBar, Platform,PermissionsAndroid} from 'react-native'
import {TabNavigator,createBottomTabNavigator, TabBarBottom, createStackNavigator,StackNavigator} from 'react-navigation'

import color from './widget/color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeStack from './component/HomeStack'
import ServiceStack from './component/ServiceStack'
import ShopCartStack from "./component/ShopCartStack";
import MineStack from "./component/MineStack";
import LocalStorage from "./commonuUtils/StorageUtils"
import KeyUtils from "./commonuUtils/KeyUtils";
var Geolocation = require('Geolocation');
//监听定位的id
var watchID = null

const lightContentScenes = ['', 'Mine']
// import {registerAppWithDescription, registerApp} from 'react-native-wechat';

function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}

// if (lightContentScenes.indexOf(currentScene) >= 0) {
//     StatusBar.setBarStyle('light-content')
// } else {
//     StatusBar.setBarStyle('dark-content')
// }

class RootScene extends PureComponent {

    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
        this.state = {
            isLogin: true,
            show: true
        }

    }

    componentDidMount(){
        //            registerApp('wx26883b527f83e86e');
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
              .then(granted => {
                  console.log("granted ================ ", granted)
                if (granted){
                    this.watchLocation();
                }
              });

        } else {

            this.watchLocation();
          }
    }

    //开始监听位置变化
    watchLocation() {
            watchID = Geolocation.watchPosition(
                location => {
                    var result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;

                    let locations = {
                        "longitude": location.coords.longitude,
                        "latitude": location.coords.latitude
                    }

                    console.log("locationsResult ======= begin ", result)
                    console.log("locations ======= begin ", locations)
                    LocalStorage.set(KeyUtils.USER_LOCATION_KEY, locations)
                },
                error => {
                    console.log("获取位置失败："+ JSON.stringify(error))
                }
            );
    }

    render() {
        const Navigator = this.state.isLogin ?
            createStackNavigator (
                {
                    defaultTab: {
                        screen: defaultTab,
                    },
                },
                {
                    navigationOptions: {
                        header: null
                    }
                }
            )
            :
            createStackNavigator (
                {
                    defaultTab: {
                        screen: defaultTab,
                    },
                },
                {
                    navigationOptions: ({navigation}) => {
                        const {routeName} = navigation.state;
                        console.log(routeName)
                        return {
                            headerStyle: { backgroundColor: color.primary},
                            headerTintColor: 'white',
                            showIcon: true,
                            borderBottomWidth: 0,
                            elevation: 0,
                        }
                    }
                }
            )

        return (
            this.state.show ?
                <Navigator
                    onNavigationStateChange={
                        (prevState, currentState) => {
                            const currentScene = getCurrentRouteName(currentState)
                            const previousScene = getCurrentRouteName(prevState)

                            StatusBar.setBarStyle('light-content')
                            if (previousScene !== currentScene) {

                            }
                        }
                    }
                />: null
        )
    }
}

const defaultTab = createBottomTabNavigator(
    {
        HomeStack: HomeStack,
        ServiceStack: ServiceStack,
        ShopCartStack: ShopCartStack,
        MineStack: MineStack
    },
    {
        navigationOptions: ({navigation}) => {
                   const {routeName} = navigation.state;
                   const routesCount = navigation.state.routes.length;
                   // console.log(navigation.state)
                   let iconName;
                   let tabLabel;

                   if (routeName === 'HomeStack') {
                       iconName = `ios-home`;
                       tabLabel = `Home`;
                   } else if (routeName === 'ServiceStack') {
                       iconName = `ios-albums`;
                       tabLabel = `Service`;
                   }
                   else if (routeName === 'ShopCartStack') {
                       iconName = `ios-cart`;
                       tabLabel = `Cart`;
                   }
                   else if (routeName === 'MineStack') {
                       iconName = `ios-people`;
                       tabLabel = `Mine`;
                   }

                return {
                    tabBarVisible: routesCount < 2 ,
                    tabBarLabel: tabLabel,
                    tabBarIcon: ({focused, tintColor}) => (
                        <Ionicons
                            name={focused ? iconName : iconName + '-outline'}                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
        lazy: true,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.primary,
            inactiveTintColor: color.gray,
            style: {backgroundColor: '#ffffff'}
        }
    },
);



export default RootScene
