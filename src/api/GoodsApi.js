
import HttpUtils from './HttpUtils'

export function getGoodsCagetgory() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/goods/nav/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getGoodsListByCategoryId(id, pageNum) {
    return new Promise((resolve, reject) => {
         HttpUtils.get('/goods/list/' + id + '/' + pageNum +'/10').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getGoodsListByHome(pageNum) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/goods/homeList/'+ pageNum +'/2').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getGoodsById(id) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/goods/detail/' + id).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}