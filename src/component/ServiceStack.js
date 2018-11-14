import ServicePage from "../page/service/ServicePage";
import {createStackNavigator} from "react-navigation";
import color from "../widget/color";
import FangchanPublishPage from "../page/service/detail/FangchanPublishPage";
import ServiceClassPage from "../page/mine/service/ServiceClassPage";
import JiaZhenPublishPage from "../page/service/detail/JiaZhenPublishPage";
import ZhaoShengPublishPage from "../page/service/detail/ZhaoShengPublishPage";
import ChuZhuPublishPage from "../page/service/detail/ChuZhuPublishPage";
import BussChuZhuPublishPage from "../page/service/detail/BussChuZhuPublishPage";
import ZhuangXiuPublishPage from "../page/service/detail/ZhuangXiuPublishPage";
import ServiceSelectPayPage from "../page/mine/service/ServiceSelectPayPage"
import FangChanDetailPage from "../page/service/detail/FangChanDetailPage"
import RoomDetailPage from "../page/service/detail/RoomDetailPage"
import JobServiceDetailPage from "../page/service/particulars/JobServiceDetailPage";
import ServiceDetailPage from "../page/mine/service/ServiceDetailPage";
import ServiceClassDetailPage from "../page/service/particulars/ServiceClassDetailPage";

/** servcei */
const ServiceStack = createStackNavigator({
    ServicePage: {
        screen: ServicePage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                header: null
            }
        }
    },
    ServicePublishPage: {
        screen: ServiceClassPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "发布广告",
                headerStyle: {
                    backgroundColor: params.themeColor,
                },
            }
        }
    },
    FangchanPublishPage: {
        screen: FangchanPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return (
                params.show ?
                    {
                        headerStyle: {
                            height: 0
                        }
                    }:
                    {
                        title: params.title,
                        headerStyle: {
                            backgroundColor: params.themeColor,
                        }
                    }
            )
        }
    },
    JiaZhenPublishPage: {
        screen: JiaZhenPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    ZhaoShengPublishPage: {
        screen: ZhaoShengPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },

    ChuZhuPublishPage: {
        screen: ChuZhuPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    BussChuZhuPublishPage:{
        screen: BussChuZhuPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    ZhuangXiuPublishPage: {
        screen: ZhuangXiuPublishPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
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
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    FangChanDetailPage: {
        screen: FangChanDetailPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    RoomDetailPage: {
        screen: RoomDetailPage,
        navigationOptions: (props) => {
            return  {
                header: null,
            }
        }
    },
    JobServiceDetailPage: {
        screen: JobServiceDetailPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return  {
                title: params.title,
                headerStyle: {
                    backgroundColor: params.themeColor,
                }
            }
        }
    },
    ServiceDetailPage: {
        screen: ServiceDetailPage,
        navigationOptions: (props) => {
            return  {
                header: null,
            }
        }
    },
    ServiceClassDetailPage: {
        screen: ServiceClassDetailPage,
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
    }
},{
    navigationOptions: ({navigation}) => ({
        headerStyle: { backgroundColor: color.primary,},
        headerTintColor: 'white',
        showIcon: true,
        borderBottomWidth: 0,
        elevation: 0,
    })
});

export default ServiceStack
