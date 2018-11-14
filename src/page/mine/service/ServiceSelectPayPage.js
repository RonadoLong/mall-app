'use strict'
import React, {PureComponent} from 'react'
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

import {Toast, Radio, List, WhiteSpace, Modal} from 'antd-mobile-rn'
const alert = Modal.alert

const RadioItem = Radio.RadioItem;

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Homeheader from "../../../component/Homeheader"
import color, {screenWidth} from '../../../widget/color';
import {GetServicePaymentList} from "../../../api/ServiceApi";
import PayUtils from "../../../commonuUtils/PayUtils";


export default class ServiceSelectPayPage extends PureComponent {

    //初始化一个对象，path本地路径
    constructor(props) {
        super(props)
        this.state = {
            themeColor: this.props.navigation.state.params.themeColor,
            selectPrice: 0,
            id: this.props.navigation.state.params.id,
            dataArray: [],
            selectId: 0,
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData(){
        Toast.loading(null, 10)
        GetServicePaymentList().then(res => {
            Toast.hide()
            console.log(res)
            if (res.code === 1000){
                let data = res.data
                let arrays = []
                data.forEach(item => {
                    let temp = {
                        id: item.id,
                        value: item.price,
                        label: item.name,
                        time: item.time,
                    }
                    arrays.push(temp)
                })
                this.setState({dataArray: arrays})
            }
        })
    }

    tapBottomBtn = () => {
        Toast.info("开发中", 2)
        console.log(this.state)
        this.props.navigation.navigate("ServicePage");
    }

    pay(val){
        if (this.state.selectPrice === 0 ){
            Toast.fail("请选择类型",2)
            return
        }

        alert('tip', 'Sure Pay ？', [
            {text: 'cancel', onPress: () => console.log('cancel'), style: 'default'},
            {
                text: 'sure', onPress: () => {
                    let note = {
                        type: "1",
                        payType: val,
                        selectId: this.state.selectId,
                    }

                    PayUtils.pay(val,this.state.id,1 ,note).then(res=>{
                        Toast.success("success", 2)
                        this.props.navigation.popToTop()
                    })
                }
            },
        ]);
    }

    render() {

        let bottomView =
            <TouchableOpacity style={styles.bottomView} activeOpacity={0.75} onPress={this.tapBottomBtn}>
                <View style={{backgroundColor: color.primary, borderRadius: 10, width: screenWidth - 20, height: 44,}}>
                    <Text style={{color: 'white', textAlign: 'center', lineHeight: 44}}>Summit</Text>
                </View>
            </TouchableOpacity>

        return (
            <View style={color.root_container}>
                <ScrollView style={{marginBottom: 50}}>
                    <WhiteSpace/>

                    <Homeheader title="Choose Type"/>

                    <RadioGroup onSelect={(index, value) => {
                        console.log(value,this.state.dataArray[index].id)
                        this.setState({
                            selectPrice: value,
                            selectId: this.state.dataArray[index].id
                        })

                    }} style={{backgroundColor: "white", width: screenWidth,}}>
                        {this.state.dataArray.map((item, index) => (
                            <RadioButton checked={index === 0 || index === '0'} key={index} value={item.value} style={{width: screenWidth}}>
                                <Text style={{marginLeft: 12, color: color.bigTitle}}>{item.label}
                                    <Text style={{marginLeft: 10, color: color.pink}}> - </Text>
                                    <Text style={{marginLeft: 10, color: color.bigTitle, fontSize: 15}}>price $</Text>
                                    <Text style={{color: color.pink, fontSize: 15}}>{item.value}</Text>
                                </Text>
                            </RadioButton>
                        ))}
                    </RadioGroup>

                    <WhiteSpace/>
                    <Homeheader title="Select Payment"/>
                    <List >
                        <List.Item arrow="horizontal"  multipleLine align="center" wrap
                                   onClick={() => {
                                       this.pay('wechatpay')
                                   }}
                        >
                            <Text style={{fontSize:13, color: color.primary}}>WechatPay</Text>
                        </List.Item>

                        <List.Item arrow="horizontal"  multipleLine align="center" wrap
                                   onClick={() => {
                                       this.pay('alipay')
                                   }}
                        >
                            <Text style={{fontSize:13, color: color.primary}}>AliPay</Text>
                        </List.Item>

                        <List.Item arrow="horizontal"  multipleLine align="center" wrap
                                   onClick={() => {
                                       this.pay('unionpay')
                                   }}
                        >
                            <Text style={{fontSize:13, color: color.primary}}>UnionPay</Text>
                        </List.Item>
                    </List>

                </ScrollView>
                {bottomView}
            </View>
        )
    }


}

const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 20,
        width: screenWidth - 20,
        height: 44,
        left: 10,
    },
})
