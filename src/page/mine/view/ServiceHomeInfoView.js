import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Toast, WhiteSpace, Carousel, WingBlank, InputItem, Picker, List} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import Homeheader from "../../../component/Homeheader";
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";

export default class ServiceHomeInfoView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            roomType: [],
            styles: ServiceDetailAddress.seasonsData
        }
    }

    componentDidMount(){

    };

    getValue(){
        return this.state.roomType
    }

    render(){

        let {item} = this.props

        let HomeInfoView =
            <View style={styles.centerView}>
                <Homeheader title={"HomeInfo"}/>
                {
                    item.roomType ?
                        <List>
                            <Picker data={ServiceDetailAddress.seasonsData} cascade={false} extra="click select"
                                    value={this.state.roomType}
                                    onChange={v => this.setState({ roomType: v })}
                                    onOk={v => this.setState({ roomType: v })}>
                                <List.Item arrow="horizontal">
                                    <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500'}}>RoomType</Text>
                                </List.Item>
                            </Picker>
                        </List> : null
                }
            </View>

        return (
            <View>
                <WhiteSpace size="sm" />
                {HomeInfoView}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    titleName: {
        color: color.normalTitle,
        fontSize: 15,
    },

    containerStyle: {
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: color.bodyColor,
    },
    centerView: {
        backgroundColor: 'white',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        height: 44,
    },
    labelStyle: {
        color: '#91627b',
        fontWeight: '400',
        fontSize: 13,
    }
})
