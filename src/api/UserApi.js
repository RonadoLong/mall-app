
import HttpUtils from './HttpUtils'

export function SaveUserAgreement() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/user/auth/saveAgreement').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetUserInfo() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/user/auth/userInfo').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetUserAgreement() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/user/auth/getUserAgreement').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetUserAddress() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/user/auth/getUserAddress').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function SaveUserAddress(params) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/user/auth/saveUserAddress', params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function GetUserIntegralFlow() {
    return new Promise((resolve, reject) => {
        HttpUtils.get('/user/auth/getUserIntegralFlow/1/10').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
