
import HttpUtils from './HttpUtils'

export function getServiceCagetgory() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/service/category/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getAreasById(name) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/service/area/list/' + name).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function saveServiceRoom(paras) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/service/auth/save', paras).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function saveServiceJob(paras) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/service/job/auth/save', paras).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getServiceRoomByHome(params, pageNum, pageSize) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/service/room/list/'+pageNum+ '/' + pageSize, params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export function GetSelfService(status, pageNum) {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/service/auth/self/' + status + '/' + pageNum + '/10').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetServicePaymentList() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/service/findServicePaymentList').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}