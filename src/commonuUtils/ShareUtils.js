
import UShare from'../component/UShare'
import { Platform } from 'react-native'
import Androidshare from './Androidshare';
import SharePlatform from './AndroidSharePlatform';
import { Toast } from 'antd-mobile-rn';

const title = "享受视频乐趣，享受购物乐趣"
const descStr = "更多精选。。。"
const shareImageUrl = "https://img.alicdn.com/imgextra/i3/725677994/TB20I4EXg6DK1JjSZPhXXa8uVXa_!!725677994.jpg_2200x2200Q90s50.jpg"
const shareContentUrl = "https://www.tohnet.com/tohnetadt/index.html"

export default class ShareUtils {

    /**
     *      UMSocialPlatformType_WechatSession      = 1, //微信聊天
            UMSocialPlatformType_WechatTimeLine     = 2,//微信朋友圈
            UMSocialPlatformType_WechatFavorite     = 3,//微信收藏
     *      UMSocialPlatformType_Facebook           = 16,//Facebook
     */

    static shareFacebook(){

        if (Platform.OS == 'ios'){
            UShare.share(
                16, //分享的平台
                title,//分享的标题
                descStr,//分享的内容
                shareImageUrl,//分享图片的URL
                shareContentUrl,//分享的URL
                (code,data) => {
                    if (code === '200'){
                        console.log('分享成功')
                    } else {
                        console.log('分享失败  ' + code + '  ' + data)
                    }
                }
            )
        }else{

       /**
         * 参数说明：
         * 1. 标题
         * 2. 内容
         * 3. 跳转链接
         * 4. 图片链接
         * 5. 分享平台
         * 6. 分享结果回调
       */
      Androidshare.share(
            title,//分享的标题
            descStr,//分享的内容
            shareImageUrl,//分享图片的URL
            shareContentUrl,//分享的URL
            SharePlatform.FACEBOOK, (message) => {
                console.log(message)
                Toast.info(message)
                // if(message === "未安装该软件"){
                //     Toast.info(message)
                // }
            // message:分享成功、分享失败、取消分享
            // ToastAndroid.show(message,ToastAndroid.SHORT);
        });
    }

    }

    static shareWeChat(){

        let params = {
            "title": title,//分享的标题
            "content": descStr,//分享的内容
            "imgUrl": shareImageUrl,//分享图片的URL
            "url": shareContentUrl,//分享的URL
        }

        if (Platform.OS == 'ios'){
           this.shareWeChatByContent(1, params)
        }else{
            Androidshare.share(
                title,//分享的标题
                descStr,//分享的内容
                shareImageUrl,//分享图片的URL
                shareContentUrl,//分享的URL
                SharePlatform.WECHAT, (message) => {
                    console.log(message)
                // message:分享成功、分享失败、取消分享
                // ToastAndroid.show(message,ToastAndroid.SHORT);
            });
        }
    }

    static shareWeChatTimeLine(){
        let params = {
            "title": title,//分享的标题
            "content": descStr,//分享的内容
            "imgUrl": shareImageUrl,//分享图片的URL
            "url": shareContentUrl,//分享的URL
        }
        this.shareWeChatByContent(2, params)
    }

    static shareWeChatFavorite(){
        let params = {
            "title": title,//分享的标题
            "content": descStr,//分享的内容
            "imgUrl": shareImageUrl,//分享图片的URL
            "url": shareContentUrl,//分享的URL
        }

        if (Platform.OS == 'ios'){
            this.shareWeChatByContent(3, params)
        }else{
             Androidshare.share(
                title,//分享的标题
                descStr,//分享的内容
                shareImageUrl,//分享图片的URL
                shareContentUrl,//分享的URL
                SharePlatform.WECHATMOMENT, (message) => {
                     console.log(message)
                 // message:分享成功、分享失败、取消分享
                 // ToastAndroid.show(message,ToastAndroid.SHORT);
             });
         }
    }

    static shareWeChatByContent(index, params){
        UShare.share(
            index, //分享的平台
            params.title,//分享的标题
            params.content,//分享的内容
            params.imgUrl,//分享图片的URL
            params.url,//分享的URL
            (code,data) => {
                if (code === '200'){
                    console.log('分享成功')
                } else {
                    console.log('分享失败  ' + code + '  ' + data)
                }
            }
        )
    }
}
