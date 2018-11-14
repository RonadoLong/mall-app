
import HttpUtils from './HttpUtils'

export function getVideoCagetgory() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/video/categoryList').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getVideoListByCategory(cateroryName, pageNum) {
    return new Promise((resolve, reject) => {
         HttpUtils.get('/video/list/' + cateroryName + '/' + pageNum +'/5').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getVideoListByHome(pageNum) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/video/homeList/' +  pageNum +'/2').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}