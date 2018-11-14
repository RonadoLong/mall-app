import Qiniu, {Auth, ImgOps, Conf, Rs, Rpc} from 'react-native-qiniu';

Conf.ACCESS_KEY = "bOpE6GAaIN9eXl-2PY-Lf_Rf-oKazTQelvpt45KB";
Conf.SECRET_KEY = "xw0E8jW693XeqarPnFYN0f9TyvBIS86I5DPwKBJi";
let host = "http://p28bmumza.bkt.gdipper.com/";
let bukcet = "testshop:"
let scalekey = "?imageView2/4/w/300"

//强烈不建议在客户端保存 AK 和 SK ，反编译后 hacker 获取到可以对你的资源为所欲为，建议通过安全渠道从服务器端获取。

export default class QiniuUpload {

    static upload(avatarSource, key) {
        return new Promise(((resolve, reject) => {
            let scope = bukcet + key
            let putPolicy = new Auth.PutPolicy2(
                {scope: scope}
            );
            let uptoken = putPolicy.token();
            let formInput = {
                key: key,
            }
            Rpc.uploadFile(avatarSource, uptoken, formInput).then(res => {
                console.log(JSON.stringify(res));
                if (res.status === 200){
                    let resp = JSON.parse(res._response)
                    let filepath = host + resp.key + scalekey
                    resolve(filepath)
                }
            }).catch(err => {
                reject(err)
            })
        }))
    }

}
