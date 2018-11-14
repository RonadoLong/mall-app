import React, {Component} from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    DeviceEventEmitter,
    TouchableOpacity,
    Platform
} from 'react-native'
import BannerCoursel from '../../../component/BannerCoursel';
import color, {screenWidth, isSystemIOS, statusBarHeight} from '../../../widget/color';
import ContactBottomView from '../view/ContactBottomView';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {List} from 'antd-mobile-rn';
import Homeheader from "../../../component/Homeheader";

const Item = List.Item;
const Brief = Item.Brief;

//全局变量
var SwiperH = screenWidth / 16 * 9

export default class RoomDetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.navigation.state.params.item,
        }
    }

    onTapBackButton = () => {
        console.log("back")
        this.props.navigation.goBack();
    }

    render() {
        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView =
                (<View style={[{backgroundColor: color.primary}, {height: statusBarHeight}]}/>);
        }
        console.log(this.state.item.pics)
        return (
            <View style={color.root_container}>
                {statusBarView}
                <ScrollView style={{flex: 1}}>

                    <BannerCoursel
                        isLoop={false}
                        swiperH={SwiperH}
                        dataArray={this.state.item.pics}
                        onTapBackButton={this.onTapBackButton}
                    />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            {"整租 | " + this.state.item.title + " | " + this.state.item.roomType}
                        </Text>
                    </View>

                    <View style={styles.priceView}>

                        <View style={{}}>
                            <Text style={styles.priceTitle}>
                                {"$" + this.state.item.price + "/月"}
                            </Text>
                            <Text style={styles.priceDesc}>
                                月租
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.priceTitle}>
                                {this.state.item.roomType}
                            </Text>
                            <Text style={styles.priceDesc}>
                                房型
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.priceTitle}>
                                {this.state.item.area + "平米"}
                            </Text>
                            <Text style={styles.priceDesc}>
                                面积
                            </Text>
                        </View>
                    </View>

                    <View style={styles.addressView}>
                        <Homeheader
                            title={'地址信息'}
                        />
                        <List  className="my-list">

                            <Item>
                                <View style={{flexDirection: "row"}}>
                                    <Ionicons
                                        size={15}
                                        color={color.primary}
                                        name={'ios-funnel'}
                                    />
                                    <Text style={{
                                        marginLeft: 5,
                                        color: color.normalTitle
                                    }}>
                                        {this.state.item.address}</Text>
                                </View>
                            </Item>

                            <Item arrow="horizontal" onClick={() => {
                            }}>
                                <Text style={{color: color.normalTitle}}>
                                    点击查看地图
                                </Text>
                            </Item>

                            <TouchableOpacity>
                                <Image
                                    style={{height: 150, width: screenWidth, margin: 0}}
                                    resizeMode={"center"}
                                    source={require("../../../res/public/map.png")}>
                                </Image>
                            </TouchableOpacity>

                        </List>
                    </View>

                </ScrollView>

                <ContactBottomView
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        backgroundColor: "white",
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        margin: 20,
    },
    priceView: {
        marginTop: 1,
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    priceTitle: {
        color: color.primary,
        fontSize: 18,
        fontWeight: "600",
    },
    priceDesc: {
        marginTop: 8,
        fontSize: 14,
        color: color.normalTitle,
        textAlign: "center"
    },
    addressView: {
        backgroundColor: "white",
        marginTop: 8,
    }
})
