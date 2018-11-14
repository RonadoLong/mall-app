
import HttpUtils from './HttpUtils'

/**
 *  {
        "skuId": 12,
        "skuValues": "大 辣",
        "goodsCount": 2
    }
 * @returns {Promise<any> | Promise}
 */
export function saveCart(params) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/cart/confirm', params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getCartList() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/cart/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function delCart(id) {
    return new Promise((resolve, reject) => {
        HttpUtils.del('/cart/del/' + id).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

