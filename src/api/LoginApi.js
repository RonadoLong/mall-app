
import HttpUtils from './HttpUtils'

/**
 *  {
        "phone": "18826073368",
        "verifyCode": "383282",
        "type": "phone"
	}
    {
         "unionId": "2221do0opp4q8t8g12312",
         "nickname": "asdasd",
         "type": "facebook",
         "recommendCode": "1doll4p5amebk",
         "avatar":"http://images.samecity.com.cn/user/default/default_image.png",
         "sex":"1",
         "birthday":"2018-10-10",
         "hometown":"hongkong",
         "phone": "18826073368",
         "verifyCode": "123456"
    }

 * @param params
 * @returns {Promise<any> | Promise}
 */

export function login(params) {
    return new Promise((resolve, reject) => {
        HttpUtils.post('/user/login', params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export function getCode(code) {
    return new Promise((resolve, reject) => {
         HttpUtils.get('/user/getCode/' + code).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}