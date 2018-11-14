import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
    RefreshControl
} from 'react-native'
import GlobalStyles from '../../widget/styles/GlobalStyles'
import NavigatorUtil from "../../commonuUtils/NavigatorUtil";
import HomeMenuView from "../../component/HomeMenuView"
import {getServiceCagetgory, getServiceRoomByHome} from "../../api/ServiceApi";
import Homeheader from "../../component/Homeheader";
import color,  {isSystemIOS, statusBarHeight, screenHeight, screenWidth} from "../../widget/color";
import ServiceRoomCell from "./view/ServiceRoomCell";
import LocalStorage from "../../commonuUtils/StorageUtils";
import KeyUtils from "../../commonuUtils/KeyUtils";
import ServiceDetailUtils from "./ServiceDetailUtils"
import {getLocationByCon} from '../../api/LocationApi'


type Props = {}
export default class ServicePage extends Component<Props>{

    constructor(props){
        super(props)
        this.state = {
            menuInfos: [],
            roomsArray: [],
            themeColor: color.primary,
            isShow: false,
            query: {
                category: "",
            },
            isRefreshing: false,
            address: ''
        }
        this.getLocation()
    }

    componentDidMount(){
        this.onRefresh()
    }

    getLocation = async () => {
        LocalStorage.get(KeyUtils.USER_LOCATION_KEY).then(res => {
            console.log("USER_LOCATION_KEY ===== " , res)
            if (res !== ""){
                const query = {category: "",}
                this.setState({query: query});
                this.getState(res);
            }
            this.getServiceRoom()
        })
    }

    getState(res){
        getLocationByCon(res.latitude, res.longitude)
        .then(data => {
            console.log("data ===== " , data)
            if(data.status === "OK"){
                data.results.forEach(result => {
                    if (result.types[0] === "street_address"){
                       var conutryIndex = 0;
                       result.address_components.forEach((address, index) => {
                           if (address.long_name === "United States" || address.long_name === "美国"){
                               conutryIndex = index
                           }
                       });
                       let state = result.address_components[conutryIndex - 1].long_name
                       this.setState({address: state});
                    }
                })
            }
        })
    }

    getCategoryList() {
        getServiceCagetgory()
            .then(res => {
                // console.log("getCategoryList", res)
                if (res.code === 1000){
                    this.setState({menuInfos: res.data, isShow: true,})
                }
            })
    }

    getServiceRoom() {
        // console.log("query ==== ", this.state.query)
        getServiceRoomByHome(this.state.query, 1, 10).then(res => {
            console.log(res)
            if (res.code === 1000){
                this.setState({roomsArray: res.data.content, isRefreshing: false,})
            }else {
                this.setState({isRefreshing: false,})
            }
        })
    }

    onMenuSelected = (i) => {
        // console.log(i)
        let item =  this.state.menuInfos[i];
        ServiceDetailUtils.gotoClassDetail(
            item,
            this.state.address,
            this.props.navigation
        )
    }

    onRefresh = () => {
        this.setState({isRefreshing: true});
        this.getCategoryList()
        this.getServiceRoom()
    }



    render(){

        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView = (<View style={[{backgroundColor:color.primary}, {height: statusBarHeight}]}/>);
        }

        let contentView =
            this.state.roomsArray.map((item, index)  => {
                let indexStr = index + '';
                return (
                    <ServiceRoomCell
                        key={indexStr}
                        item={item}
                        onSelect={()=>{
                            this.props.navigation.navigate("ServiceDetailPage", {
                                item: item
                            })
                        }}
                    />
                )
            });

        return (
            <View style={color.root_container}>
                {statusBarView}

                <ScrollView  style={{width: screenWidth}} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        tintColor={color.primary}
                    />
                }>
                    <Image style={{width: screenWidth, height: Math.floor(300*screenWidth/screenHeight), backgroundColor: "white"}}
                        source={{uri: 'http://img.58cdn.com.cn/fangrs/pc-catelist/imgs/operating_01.jpg'}}
                    />

                    <HomeMenuView
                        menuInfos={this.state.menuInfos}
                        onMenuSelected={this.onMenuSelected}
                        themeColor={this.state.themeColor}
                    />

                    <Homeheader title={"Recommend"}/>

                    {contentView}

                </ScrollView>

            </View>
        )
    }
}
