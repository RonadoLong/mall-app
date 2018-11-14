import UMShareModule from './Androidshare';
import SharePlatform from './AndroidSharePlatform';
import ULogin from'../component/ULogin'
import {Platform} from 'react-native'
import {Alert} from "react-native";
// import * as wechat from "react-native-wechat";

/**
 * openid

    uid （6.2以前用unionid）用户id

    accessToken （6.2以前用access_token）

    RefreshToken（6.2以前用refresh_token）

    expiration （6.2以前用expires_in）过期时间

      // 0    QQ
       // 2    微信
       // 3    朋友圈
       // 4    QQ空间
 */
    export async function wechatLoginCallBack(){
       return new Promise((resolve, reject) => {
            if(Platform.OS === "android"){
                console.log("android ====")

                UMShareModule.auth(SharePlatform.WECHAT, (code,result,message) => {
                    console.log(code,result,message);
                    alert(JSON.stringify(result))
                    // code: 0成功、1失败、2取消
                    if(result.code === 0) {
                        let params = {
                            "unionId": result.unionId,
                            "nickname": result.nickname,
                            "type": "wechat",
                            "avatar": result.avatar,
                            "sex": result.gender === "男" ? "1" : "0",
                            "recommendCode": ""
                        }
                        resolve(params)
                    } else {
                        // TODO...
                        reject('登录失败')
                    }
                });

            }else{
                console.log("iOS ======== ")

                ULogin.login(0,  (code,data) => {
                    console.log(data)
                    if (code === '200'){
                        let params = {
                            "unionId": data.unionid,
                            "nickname": data.nickname,
                            "type": "wechat",
                            "hometown": data.country + data.province + data.city,
                            "avatar": data.headimgurl,
                            "sex": data.sex === 1 ? "1" : "0",
                            "recommendCode": ""
                        }
                        resolve(params)
                    } else {
                        reject('登录失败')
                        console.log('登录失败  ' + code + '  ' + data)
                    }
                })
            }

           // //微信登录示例
           // let scope = 'snsapi_userinfo';
           // let state = 'wechat_sdk_demo';
           // //判断微信是否安装
           // wechat.isWXAppInstalled()
           //     .then((isInstalled) => {
           //         if (isInstalled) {
           //             //发送授权请求
           //             wechat.sendAuthRequest(scope, state)
           //                 .then(responseCode => {
           //                     //返回code码，通过code获取access_token
           //                     console.log(responseCode)
           //                 })
           //                 .catch(err => {
           //                     reject('登录授权发生错误')
           //                 })
           //         } else {
           //
           //             reject('没有安装微信')
           //         }
           //     })
       })
    }


    export function faceBookCallBack(){
        return new Promise((resolve, reject) => {
            if(Platform.OS === "android"){
                UShare.authLogin(SharePlatform.FACEBOOK, (result) => {
                    // code: 0成功、1失败、2取消
                    alert(JSON.stringify(result))
                    if(result.code === 0) {
                        let params = {
                            "unionId": result.unionId,
                            "nickname": result.nickname,
                            "type": "facebook",
                            "avatar": result.avatar,
                            "sex": result.gender === "male" ? "1" : "0",
                            "recommendCode": ""
                        }
                        resolve(params)
                    } else {
                        // TODO...
                        console.log("result ============ ", JSON.stringify(result))
                        reject(result)
                    }
                });
            }else{

                ULogin.login(SharePlatform.FACEBOOK, (code,data) => {
                    console.log(data, code)
                    // { gender: 'male',
//   {name: 'Long Hong',
//   id: '311299686066469',
//   picture:
//    { data:
//       { is_silhouette: false,
//         height: 50,
//         url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=311299686066469&height=50&width=50&ext=1531480334&hash=AeQRPPLXj4fjV3tY',
//         width: 50 } },
//   link: 'https://www.facebook.com/app_scoped_user_id/YXNpZADpBWEdrRk9NWHRNLWg1TS1DSXhDTzF0OGdVUTFFOWZAQaGl5QTJFNGl6YVBIRm5TUTNpR0RqOFVBN3JqNHBUaE9nSUE4WmxUOXBiYmlSYzFIWlJSaEF3ZAi1OWmxpV2p2anJjLVdUazBVMElXZAUVqMDVU/',
//   locale: 'en_US' }
// 2018-07-10 19:12:15.535 [info][tid:com.facebook.react.JavaScript] { unionId: '311299686066469',
//   nickname: 'Long Hong',
//   type: 'facebook',
//   avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=311299686066469&height=50&width=50&ext=1531480334&hash=AeQRPPLXj4fjV3tY',
//   sex: '1',
//   recommendCode: '' }
                    if (code === '200'){
                        let params = {
                            "unionId": data.id,
                            "nickname": data.name,
                            "type": "facebook",
                            "avatar": data.picture.data.url,
                            "sex": data.gender === "male" ? "1" : "0",
                            "recommendCode": ""
                        }
                        resolve(params)
                    }else{
                        reject("login error")
                    }
                })

            }
       })
    }

