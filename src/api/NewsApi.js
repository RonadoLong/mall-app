
import HttpUtils from './HttpUtils'

export function getNewsCagetgory() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/news/nav/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getNewsListByCategory(cateroryName, pageNum) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/news/list/' + cateroryName + '/' + pageNum +'/10').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
export function getNewsListByHome( pageNum) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/news/homeList/' +  pageNum +'/2').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getNewsById(newId) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/news/detail/'+ newId).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}