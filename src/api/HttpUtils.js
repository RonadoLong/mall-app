import LocalStorage from "../commonuUtils/StorageUtils";
import KeyUtils from "../commonuUtils/KeyUtils";

let token = "";
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'language': 'EN',
};

const timeout = 150000

// let host = "http://ttkgap.natappfree.cc/api/client"
// let host = "https://www.tohnet.com/api/client"
let host = "http://127.0.0.1:8090/api/client"

export default class HttpUtils {

    constructor() {
    }

    componentWillMount() {
        HttpUtils.refreshHeader()
    }

    static refreshHeader() {
        return new Promise((resolve, reject) => {
            LocalStorage.get(KeyUtils.USER_INFO_TOKEN).then(token => {
                console.log(token)
                let Authorization = "Bearer " + token;
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'language': 'EN',
                    'Authorization': Authorization,
                }
                resolve(headers)
            }).catch(err => {
                reject("err")
            })
        })
    }

    static get(url) {
        url = host + url

        let dispatchTimeout = null;
        let timeoutPromise =  new Promise((resolve, reject) => {
            dispatchTimeout = () => {
                reject('请求超时')
            }
        })

        setTimeout(() => {
            dispatchTimeout();
        }, timeout);

        let getPromise = new Promise((resolve, reject) => {
            HttpUtils.refreshHeader().then(headers => {
                fetch(url, {
                    headers: headers
                })
                    .then(response => response.json())
                    .then(result => {
                        resolve(result)
                    })
                    .then(err => {
                        reject(err)
                    })
            }).catch(err => {
                fetch(url, {
                    headers: headers
                })
                    .then(response => response.json())
                    .then(result => {
                        resolve(result)
                    })
                    .then(err => {
                        reject(err)
                    })
            })
        })

        return Promise.race([getPromise,timeoutPromise]);
    }

    static postAPI(url, data, token) {

         return new Promise(((resolve, reject) => {
             fetch(url, {
                 headers:{
                     'content-Type': 'application/x-www-form-urlencoded',
                     'Authorization': token,
                     'Accept': 'application/json',
                 },
                 method: "post",
                 body: data
             })
                 .then(response => response.json())
                 .then(result => {
                     resolve(result)
                 })
                 .then(err => {
                     reject(err)
                 })
         }))
    }

    static post(url, data) {
        url = host + url
        return new Promise((resolve, reject) => {
            HttpUtils.refreshHeader().then(headers => {
                fetch(url, {
                    method: "post",
                    headers: headers,
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(result => {
                        resolve(result)
                    })
                    .then(err => {
                        reject(err)
                    })
            }).catch(err => {
                fetch(url, {
                    method: "post",
                    headers: headers,
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(result => {
                        resolve(result)
                    })
                    .then(err => {
                        reject(err)
                    })
            })})

    }

    static del(url) {
        url = host + url
        HttpUtils.refreshHeader().then(headers => {
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: "delete",
                    headers: headers
                })
                    .then(response => response.json())
                    .then(result => {
                        resolve(result)
                    })
                    .then(err => {
                        reject(err)
                    })
            })
        })
            .catch(err => {
                return new Promise((resolve, reject) => {
                    fetch(url, {
                        method: "delete",
                        headers: headers
                    })
                        .then(response => response.json())
                        .then(result => {
                            resolve(result)
                        })
                        .then(err => {
                            reject(err)
                        })
                })
            })

    }
}
