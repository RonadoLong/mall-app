
import HttpUtils from './HttpUtils'

export function getHomeHeaders() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/home/headers').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getHomeList() {
    return new Promise((resolve, reject) => {
         HttpUtils.get('/home/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}