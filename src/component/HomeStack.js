import HomePage from "../page/home/HomePage";
import InfoWebViewPage from "./InfoWebViewPage";
import GoodsPage from "../page/home/goods/GoodsPage";
import InformationPage from "../page/home/info/InformationPage";
import {createStackNavigator} from "react-navigation";
import GoodsDetailPage from "../page/home/goods/GoodsDetailPage";
import VideoPlayScreen from "../page/home/video/VideoPlayScreen";
import VideoPage from "../page/home/video/VideoPage";
import VideoListScreen from "../page/home/video/VideoListScreen";
import color from "../widget/color";
import LogindPage from "../page/login/LoginPage";
import WebViewPage from "./WebViewPage";
import {ParallaxDemo} from "../page/home/ParallaxDemo";

/** home */
const HomeStack = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                header: null
            }
        }
    },
    VideoPage: {
        screen: VideoPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
                headerStyle: {
                    backgroundColor: color.primary,
                },
                tabBarVisible:false,
            }
        }
    },
    VideoListScreen: {
        screen: VideoListScreen,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    VideoPlayScreen: {
        screen: VideoPlayScreen,
        navigationOptions: (props) => {
            return {
                header: null
            }
        }
    },
    GoodsPage: {
        screen: GoodsPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    InformationPage: {
        screen: InformationPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    GoodsDetailPage: {
        screen: GoodsDetailPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    InfoWebViewPage: {
        screen: InfoWebViewPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    LoginPage: {
        screen: LogindPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                header: null
            }
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                 header: null
            }
        }
    },
    ParallaxDemo: {
        screen: ParallaxDemo,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                header: null
            }
        }
    }
},{
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
})

export default HomeStack