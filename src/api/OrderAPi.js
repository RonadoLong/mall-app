
import HttpUtils from './HttpUtils'

export function getOrderList(params) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/order/list', params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export function SaveOrder(params) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/order/create', params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export function PostOrderAPI(data) {
    let token = "Bearer 0c54c847ce560c8cd64575db9f8a13d7ed752f2de5c0a080ce228e1610fd6d8d"

    let dataStr = ""
    if (data.amount){
        dataStr = dataStr + "amount=" + data.amount + "&"
    }
    if (data.currency){
        dataStr = dataStr +  "currency=" + data.currency + "&"
    }
    if (data.vendor){
        dataStr = dataStr +  "vendor=" + data.vendor + "&"
    }
    if (data.reference){
        dataStr = dataStr +  "reference=" + data.reference + "&"
    }
    if (data.ipn_url){
        dataStr = dataStr +  "ipn_url=" + data.ipn_url + "&"
    }
    if (data.note){
        dataStr = dataStr +  "note=" + data.note + "&"
    }
    if (data.desc){
        dataStr = dataStr +  "desc=" + data.desc
    }

    console.log(dataStr)

    return new Promise((resolve, reject) => {
        HttpUtils.postAPI('https://apitest.nihaopay.com/v1.2/transactions/apppay', dataStr ,token).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}