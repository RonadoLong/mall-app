import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, TouchableOpacity, View} from 'react-native'

import color, {screenWidth} from "../../../widget/color";
import SyanImagePicker from 'react-native-syan-image-picker';
import QiniuUpload from "../../../api/QiniuUpload";
import Homeheader from "../../../component/Homeheader";
import {Toast, WhiteSpace, Carousel, WingBlank} from 'antd-mobile-rn';
import BannerCoursel from "../../../component/BannerCoursel";

const options = {
    imageCount: 3,          // 最大选择图片数目，默认6
    isCamera: true,         // 是否允许用户在内部拍照，默认true
    isCrop: true,          // 是否允许裁剪，默认false
    CropW: 300, // 裁剪宽度，默认屏幕宽度60%
    CropH: (300), // 裁剪高度，默认屏幕宽度60%
    isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,  // 是否显示圆形裁剪区域，默认false
    showCropFrame: true,    // 是否显示裁剪区域，默认true
    showCropGrid: false,     // 是否隐藏裁剪区域网格，默认false
    enableBase64: true
};
export default class ServiceImageView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            imageUrl: require('../../../res/images/ic_share.png'),
            photos: [],
            pics: []
        }
    }

    componentDidMount(){

    };

     getImageUrl = () =>{
        if (this.state.pics.length !== 0){
            return this.state.pics;
        }
        return null;
    }

    /**
     * 使用方式sync/await
     * 相册参数暂时只支持默认参数中罗列的属性；
     * @returns {Promise<void>}
     */
    handleAsyncSelectPhoto = async () => {
        SyanImagePicker.asyncShowImagePicker(options)
            .then(photos => {
                console.log(photos);
                const arr = photos.map(v => {
                    return {...v, enableBase64: true}
                });
                // 选择成功
                this.setState({
                    photos: arr
                })

                Toast.loading("upload....", 20)
                let fileArray = []
                this.state.photos.forEach(photo => {
                    const timestamp = new Date().getTime()
                    const file = timestamp + ".jpg"
                    QiniuUpload.upload(photo.uri, file).then(res => {
                        fileArray.push(res)
                        console.log(res)
                       if (fileArray.length === photos.length){
                           Toast.hide()
                           this.setState({
                               pics: fileArray
                           })
                           console.log(fileArray)
                       }
                    })
                })


            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })
    };

    render(){
        let {item} = this.props
        let ScrollViewBanner =
            this.state.photos.length > 0 ?
                <BannerCoursel swiperH={screenWidth} dataArray={this.state.pics} />
                :
                <TouchableOpacity style={{height: screenWidth, width: screenWidth,backgroundColor:color.bodyColor}} activeOpacity={0.75}
                                  onPress={this.handleAsyncSelectPhoto.bind(this)}>
                    <Image resizeMode={"center"} source={this.state.imageUrl} style={{height: screenWidth, width: screenWidth,backgroundColor:color.bodyColor}}/>
                </TouchableOpacity>

        return (
            item.banner  ?
            <View>
                <WhiteSpace size="sm" />
                <Homeheader title={'Banners'}/>
                {ScrollViewBanner}
            </View> : null
        )
    }
}
