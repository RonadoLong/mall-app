import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform, Image} from 'react-native'
import  { Button } from 'antd-mobile-rn';
import color, {screenHeight, screenWidth, defaultVideoHeight} from "../../widget/color";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageButton from "../../component/ImageButton";
import Homeheader from "../../component/Homeheader";


export default class MineHeaderView extends PureComponent{

    constructor(Props){
        super(Props)
        this.state = {}
    }

    render(){

        let {showLoginPage, userInfo, onTapEvent} = this.props

        let headerImage =
            userInfo == null ?
                <Image style={{height: 80, width: 80, alignItems: "center"}} source={require('../../res/mine/user-none.png')} />
                :
                <Image style={{height: 80, width: 80, alignItems: "center", borderRadius: 40,backgroundColor:color.bodyColor}}
                    source={{uri: userInfo.avatar}} />


        let headerName =
            userInfo == null ?
                <Button inline size="small" onPressIn={showLoginPage}
                    style={{ marginTop: 8, height: 29 ,width: 70 }} type="warning">请登录</Button> :
                <Text style={{marginTop: 10, height: 30 , fontSize: 16, width: 80, fontWeight: '600',
                        color: 'white', textAlign: 'center' }}>
                        {userInfo.nickname}
                </Text>

        let integralView =
            userInfo == null ? null :
                <View style={{position: 'absolute', top:"40%", alignItems: "center", justifyContent:"center", height: 30,
                    width: 80, right:0, backgroundColor: color.pink, borderBottomLeftRadius: 6, borderTopLeftRadius: 6}}>
                    <Text numberOfLines={1} style={{color: "white", fontSize: 12}}>积分:{userInfo.integral}</Text>
                </View>

        return(

            <View style={{backgroundColor: 'white',marginBottom: 8}}>
                <Image
                    style={{height: defaultVideoHeight, width: screenWidth, backgroundColor: color.bodyColor}}
                    source={require('../../res/mine/person-bg.png')}>
                </Image>

                {
                    integralView
                }

                <View style={{
                    position: 'absolute',
                    top:30,
                    alignItems: "center",
                    height: defaultVideoHeight,
                    width: screenWidth}}>
                    {
                        headerImage
                    }
                    {
                        headerName
                    }
                    <View style={{
                        marginTop: 8,
                        backgroundColor: color.bigTitle,
                        opacity: 0.7,
                        height: 30,
                        borderRadius: 8,
                    }}>
                        <Text style={{
                            color: 'white',
                            height: 34,
                            textAlign: "center",
                            padding:8
                        }}>
                            {userInfo != null ? "尊贵的白金会员":"登录成为会员更多优惠"}
                        </Text>
                    </View>
                </View>

                <View style={{
                    height:40,
                    width:screenWidth,
                    borderBottomColor: color.bodyColor,
                    borderBottomWidth: 1}}>

                    <Homeheader
                        viewStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: color.bodyColor
                        }}
                        title={"我的订单"}
                    />

                    <Ionicons
                        name={'ios-arrow-forward'}
                        style={{ position: 'absolute', right: 10, height: 30, width: 10, top: 12 }}
                    />
                </View >

                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    justifyContent:'space-around',
                    marginTop: 10,
                    marginBottom: 10
                }}>

                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/orders.png')}
                        text={"全部订单"}
                        onPress={() => {
                            onTapEvent && onTapEvent(1)
                        }}
                        color={color.normalTitle}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/obligation.png')}
                        text={"代付款"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(2)
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/goods.png')}
                        text={"待发货"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(3)
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/shipped.png')}
                        text={"已发货"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(4)
                        }}
                    />
                    {/*<ImageButton*/}
                        {/*imageColor={color.primary}*/}
                        {/*imgSize={26}*/}
                        {/*fontSize={13}*/}
                        {/*image={require('../res/mine/services.png')}*/}
                        {/*text={"售后"}*/}
                        {/*color={color.normalTitle}*/}
                        {/*onPress={() => {*/}
                            {/*onTapEvent && onTapEvent(5)*/}
                        {/*}}*/}
                    {/*/>*/}
                </View>

            </View>
        )
    }
}
