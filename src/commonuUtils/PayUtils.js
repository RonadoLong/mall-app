import React, {PureComponent} from 'react';
import UPPayControl from 'react-native-giti-unionpay';
import Alipay from 'react-native-yunpeng-alipay';
import {PostOrderAPI} from "../api/OrderAPi";
import {Toast} from "antd-mobile-rn";

export default class PayUtils extends PureComponent {

    static payForUnion(tn){
      return new Promise((resolve, reject) => {
          UPPayControl.pay(tn,false).then((resp)=>{
              console.log("支付成功："+resp);
              resolve(resp)
          },(err)=>{
              console.log("支付失败:"+err);
              reject(err)
          });
      })
    }

    static payForAliPay(orderInfo){
        return new Promise((resolve, reject) => {
            Alipay.pay(orderInfo).then(data=>{
                console.log(data);
                resolve(data)
            },  (err) => {
                console.log(err);
                reject(err)
            });
        })

    }

    static pay(val, orderId, total, note){

        let params = {
            "amount": total,
            "currency": 'USD',
            "vendor": val,
            "reference": orderId,
            "ipn_url": 'https://www.tohnet.com/api/client/other/callback',
            "note": JSON.stringify(note),
            "description": val,
        }

        console.log(params)
        return new Promise(((resolve, reject) => {
            PostOrderAPI(params).then(res => {
                console.log(res.orderInfo)
                const orderParams = res.orderInfo;
                if (val === "unionpay"){
                    PayUtils.payForUnion(orderParams).then(resp => {
                        console.log(resp)
                        resolve(resp)
                    }).catch(err => {
                        Toast.fail('请重试', 2)
                    })

                } else if (val === "wechatpay"){

                } else {
                    PayUtils.payForAliPay(orderParams).then(resp => {
                        console.log(resp)
                        resolve(resp)
                    }).catch(err => {
                        Toast.fail('请重试', 2)
                    })
                }
            })
        }))



    }
}
