import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter,Image} from 'react-native'
import { screenWidth } from '../../../widget/color';
import Homeheader from '../../../component/Homeheader'
import color from '../../../widget/color';

export default class OrderInfoCell extends PureComponent {

    constructor(Props){
        super(Props)
    }

    render() {
        let {item} = this.props
        let goodsView = null
        if(item){
            goodsView =
            <View style={{  backgroundColor:"white",
                     borderBottomColor:color.bodyColor, borderBottomWidth:1, borderTopWidth:1, borderTopColor: color.bodyColor,paddingBottom:10}}>
                    {
                        item.orderGoodsRespList.length > 0 ?
                        item.orderGoodsRespList.map((goods,index) =>{
                                let source = {uri: goods.goodsImage}
                                return (
                                    <View style={{flexDirection:"row", alignContent:"center", alignItems:"center",marginTop:10,marginLeft:15,}}>
                                            <Image source={source} style={{height:60,width:60,borderRadius:4,borderWidth:0.5,borderColor:color.bodyColor}}/>
                                            <View style={{marginLeft:10}}>
                                                    <Text style={{color:color.bigTitle, fontSize:11, width: 250,}}>{goods.goodsTitle}</Text>
                                                    <Text style={{color:color.bigTitle, fontSize:11, margin:4}}>x{goods.goodsCount}</Text>
                                            </View>
                                    </View>

                                )
                            }) : null
                    }
            </View>
        }


        return (
            <View style={{marginTop:6}}>
                 <Homeheader
                    fontSize={14}
                    title={'Order: ' + item.orderId}
                 />
                {goodsView}

                <View style={{backgroundColor:"white",height:50, width:screenWidth, alignItems:"center",flexDirection:"row"}}>
                    <Text style={{marginLeft:15}}>Total($): {item.reallyAmount}</Text>
                </View>
            </View>
        )
    }


}

function getStatus(item){


}
