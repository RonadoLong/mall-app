import React,{PureComponent} from 'react'

import {ScrollView,View,Text} from 'react-native'
import color from "../../widget/color";
import Homeheader from "../../component/Homeheader";
import {List, Modal, WhiteSpace,Toast} from 'antd-mobile-rn'
import PayUtils from "../../commonuUtils/PayUtils";
const alert = Modal.alert

export default class SelectPaymentPage extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.navigation.state.params.orderId,
            total: 1,
        }
    }

    pay(val){
        alert('tip', 'Sure Pay ？', [
            {text: 'cancel', onPress: () => console.log('cancel'), style: 'default'},
            {
                text: 'sure', onPress: () => {
                    let note = {
                        type: "0",
                        payType: val,
                    }
                      PayUtils.pay(val,this.state.orderId, this.state.total, note).then(res=>{
                            Toast.success("success", 2)
                            this.props.navigation.popToTop()
                      })
                }
            },
        ]);
    }

    render(){
        return (
            <View style={color.root_container}>
                <ScrollView>

                    <WhiteSpace />
                    <Homeheader title={'Payment Methods'}/>
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
            </View>
        )
    }

}
