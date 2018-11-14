import React, {PureComponent} from 'react'

import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native'
import color, {screenWidth} from "../../widget/color";
import Homeheader from "../../component/Homeheader";
import {List, WhiteSpace, Toast} from 'antd-mobile-rn'
import {SaveOrder} from "../../api/OrderAPi";

export default class OrderConfirmationPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            productList: this.props.navigation.state.params.productList,
            totalMoney: this.props.navigation.state.params.totalMoney,
            address: null
        }
    }

    render() {

        let contentViews = []
        if (this.state.address != null) {
            for (let [key, value] of Object.entries(this.state.address)) {
                if (key === "id" || key === "userId") {
                } else {
                    let contentView = <Text key={key} style={{color: color.bigTitle, fontSize: 15, marginTop: 4}}>{value}</Text>
                    contentViews.push(contentView)
                }
            }
        } else {
            contentViews.push(<Text style={{fontSize: 13, color: color.smallLabel}}>Select Address</Text>)
        }


        let goodsView =
            <View style={{
                backgroundColor: "white",
                borderBottomColor: color.bodyColor,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderTopColor: color.bodyColor,
                paddingBottom: 10
            }}>
                {
                    this.state.productList.map((goods, index) => {
                        let source = {uri: goods.goodsImages}
                        return (
                            <View key={index} style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 10, marginLeft: 15,}}>
                                <Image source={source} style={{height: 80, width: 80, borderRadius: 4, borderWidth: 0.5, borderColor: color.bodyColor}}/>
                                <View style={{marginLeft: 10, marginRight: 10}}>
                                    <Text numberOfLines={2} style={{color: color.bigTitle, fontSize: 14, width: screenWidth - 115}}>{goods.goodsTitle}</Text>
                                    <Text style={{color: color.pink, fontSize: 14, margin: 4}}>x{goods.goodsCount}</Text>
                                    <Text style={{color: color.pink, fontSize: 14, margin: 4}}>US ${goods.price}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>


        return (
            <View style={color.root_container}>
                <ScrollView style={{marginBottom: 50}}>
                    <Homeheader title={'Shopping Address'}/>
                    <List>
                        <List.Item arrow="horizontal" multipleLine align="center" wrap
                                   onClick={() => {
                                       console.log("AddressPage")
                                       this.props.navigation.navigate("AddressPage", {
                                           title: "Address",
                                           callback: (address) => {
                                               this.setState({address})
                                           }
                                       })
                                   }}
                        >
                            {
                                contentViews
                            }
                        </List.Item>
                    </List>

                    <WhiteSpace size={'xs'}/>

                    <Homeheader title={'Order Review'}/>
                    {
                        goodsView
                    }

                    <WhiteSpace size={'xs'}/>
                    <Homeheader title={'Order Summary'}/>

                    <List.Item extra={"US $" + this.state.totalMoney} multipleLine align="center">
                        <Text style={{fontSize: 13, color: color.bigTitle}}>All Total:</Text>
                    </List.Item>

                    <List.Item extra={"US $ 0"} multipleLine align="center">
                        <Text style={{fontSize: 13, color: color.bigTitle}}>Freight:</Text>
                    </List.Item>

                </ScrollView>

                <View style={{position: "absolute", bottom: 0, height: 44, width: screenWidth, flexDirection: "row", backgroundColor: "white"}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: "50%"}}>
                        <Text style={{flexDirection: "row", color: color.bigTitle, marginLeft: 20}}>
                            All Total: $
                            <Text style={{color: color.pink, fontSize: 15}}>
                                {this.state.totalMoney}
                            </Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: color.primary,
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={this.downOrder.bind(this)}>
                        <Text style={{fontSize: 16, color: "white"}}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    downOrder() {
        if (this.state.address == null) {
            Toast.fail("please select address", 1)
            return
        }

        let orderGoodsReqList = []
        this.state.productList.forEach(item => {
            let val = {
                productId: item.productId,
                goodsCount: item.goodsCount
            }
            orderGoodsReqList.push(val)
        })

        let params = {
            addressId: this.state.address.id,
            orderGoodsReqList: orderGoodsReqList
        }

        console.log(params)
        Toast.loading(null, 10)
        SaveOrder(params).then(res => {
            console.log(res)
            Toast.hide()
            if(res.code !== 1000){
                Toast.fail(res.msg, 2)
            }else{
                this.props.navigation.navigate("SelectPaymentPage",{
                    title: "Payment",
                    orderId: res.data,
                })
            }
            console.log(res)
        })
    }

}
