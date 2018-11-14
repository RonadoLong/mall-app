'use strict'
import React,{Component}from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native'

import {getServiceCagetgory, saveServiceRoom} from "../../../api/ServiceApi";
import {Toast, WhiteSpace, Carousel, WingBlank} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import moment from "moment";
import ServiceRoomCell from "../../service/view/ServiceRoomCell";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class ServicePreviewPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: this.props.navigation.state.params.item,
        }
    }


    _onSelect(){
        this.props.navigation.navigate("ServiceDetailPage", {
            item: this.state.data
        })
    }

    render(){

        return (
            <View style={color.root_container}>
                <ServiceRoomCell
                    item={this.state.data}
                    onSelect={this._onSelect.bind(this)}
                />

                <View style={styles.containt}>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <View style={{
                            height: 50,
                            width: (screenWidth - 20) * 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{lineHeight:50, textAlign: "center", color: color.normalTitle, fontSize: 13,marginLeft: 8}}>
                                Go to Edit
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            console.log(this.state.data)
                            Toast.loading("summit...", 15)
                            saveServiceRoom(this.state.data).then(res => {
                                Toast.hide()
                                console.log(res)
                                if (res.code === 1000){
                                    this.props.navigation.navigate("ServiceSelectPayPage", {
                                        title: "Payment",
                                        id: res.data
                                    })
                                }
                            })
                        }}
                        activeOpacity={0.75}>
                        <View style={{
                            backgroundColor: color.primary,
                            height: 50,
                            width: (screenWidth - 20) * 0.5,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{lineHeight:50, textAlign: "center", color: 'white' , fontSize: 13,}}>
                                Summit and Pay
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containt: {
        width: screenWidth - 20,
        height:50,
        backgroundColor: "white",
        flexDirection: 'row',
        position: "absolute",
        bottom: 20,
        left: 10,
    }
})
