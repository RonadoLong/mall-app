import {createStackNavigator} from "react-navigation";
import color from "../widget/color";

import MinePage from "../page/mine/MinePage";
import MineSettingPage from "../page/mine/detail/MineSettingPage";
import LogindPage from "../page/login/LoginPage";
import MineOrderInfoPage from "../page/mine/detail/MineOrderInfoPage";
import MineAdtPage from "../page/mine/detail/MineAdtPage";
import MineFriendPage from "../page/mine/detail/MineFriendPage";
import MineAwardPage from "../page/mine/detail/MineAwardPage";
import ServiceClassPage from "../page/mine/service/ServiceClassPage";
import ServicePublishPage from "../page/mine/service/ServicePublishPage";
import ServicePreviewPage from "../page/mine/service/ServicePreviewPage";
import ServiceHistoryPage from "../page/mine/service/ServiceHistoryPage";
import ServiceDetailPage from "../page/mine/service/ServiceDetailPage";
import ServiceSelectPayPage from "../page/mine/service/ServiceSelectPayPage";
import AddressPage from "../page/cart/AddressPage";
import SaveAddressPage from "../page/cart/SaveAddressPage";

const MineStack = createStackNavigator({
    ServicePage: {
        screen: MinePage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                header: null
            }
        }
    },
    MineSettingPage: {
        screen: MineSettingPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "Setting",
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
    MineOrderInfoPage: {
        screen: MineOrderInfoPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "Detail",
            }
        }
    },
    MineAdtPage: {
        screen: MineAdtPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "My Adt",
            }
        }
    },
    MineFriendPage: {
        screen: MineFriendPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "Friends",
            }
        }
    },
    MineAwardPage: {
        screen: MineAwardPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "Awards",
            }
        }
    },
    MineAddressPage: {
        screen: AddressPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "Address",
            }
        }
    },
    ServiceClassPage: {
        screen: ServiceClassPage,
        navigationOptions: (props) => {
            const {navigation}=props
            return {
                title: "Select type",
                headerStyle: {
                    backgroundColor: color.primary,
                },
            }
        }
    },
    ServicePublishPage: {
        screen: ServicePublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            return {
                title: "Publish",
                headerStyle: {
                    backgroundColor: color.primary,
                },
            }
        }
    },
    ServicePriviewPage: {
        screen: ServicePreviewPage,
        navigationOptions: (props) => {
            const {navigation}=props
            return {
                title: "Preview",
                headerStyle: {
                    backgroundColor: color.primary,
                },
            }
        }
    },
    ServiceHistoryPage: {
        screen: ServiceHistoryPage,
        navigationOptions: (props) => {
            const {navigation}=props
            return {
                title: "History",
                headerStyle: {
                    backgroundColor: color.primary,
                },
            }
        }
    },
    ServiceDetailPage: {
        screen: ServiceDetailPage,
        navigationOptions: (props) => {
            return {
                header: null
            }
        }
    },
    ServiceSelectPayPage: {
        screen: ServiceSelectPayPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: color.primary,
                }
            }
        }
    },
    SaveAddressPage: {
        screen: SaveAddressPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    }
},{
    navigationOptions: ({navigation}) => {
        const {routeName} = navigation.state;

        return {
           headerStyle: { backgroundColor: color.primary,},
           headerTintColor: 'white',
           showIcon: true,
           borderBottomWidth: 0,
           elevation: 0,
       }
    }
});

export default MineStack
