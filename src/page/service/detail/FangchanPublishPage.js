'use strict'
import React, {Component}from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    KeyboardAvoidingView,
    DeviceEventEmitter,
    TouchableOpacity,
    Platform
} from 'react-native'

import GlobalStyles from '../../../widget/styles/GlobalStyles'
import ViewUtils from "../../../commonuUtils/ViewUtils";
import SyanImagePicker from 'react-native-syan-image-picker';
import Homeheader from "../../../component/Homeheader";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Isao, Jiro,Sae} from 'react-native-textinput-effects';
import color from "../../../widget/color";
import {Toast,Picker, List} from 'antd-mobile-rn'

var {width, height} = Dimensions.get('window');
var imageH  = (width * 9 / 16)

import {getAreasById, saveServiceRoom} from "../../../api/ServiceApi";
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";
import QiniuUpload from "../../../api/QiniuUpload";
import NavigatorUtil from "../../../commonuUtils/NavigatorUtil";
import StorageUtil from "../../../commonuUtils/StorageUtils";
import KeyUtils from "../../../commonuUtils/KeyUtils";

const Brief = List.Item.Brief;

const options = {
    imageCount: 1,          // 最大选择图片数目，默认6
    isCamera: true,         // 是否允许用户在内部拍照，默认true
    isCrop: true,          // 是否允许裁剪，默认false
    CropW: 300, // 裁剪宽度，默认屏幕宽度60%
    CropH: (300 * 9 / 16), // 裁剪高度，默认屏幕宽度60%
    isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,  // 是否显示圆形裁剪区域，默认false
    showCropFrame: true,    // 是否显示裁剪区域，默认true
    showCropGrid: false,     // 是否隐藏裁剪区域网格，默认false
    enableBase64: true
};

type Props = {}

export default class FangchanPublishPage extends Component<Props>{

    //初始化一个对象，path本地路径
    constructor(props){
        super(props)
        this.state = {
            themeColor: this.props.navigation.state.params.themeColor,
            dataArray: [],
            imageUrl: require('../../../res/images/ic_share.png'),
            showTab: false,
            photos: [],
            label: "月租金额",
            title: '',
            descStr: '',
            area: '',
            //州
            state: '',
            city: '',
            address: '',
            price: 0,
            location: [],
            code: '',
            category: this.props.navigation.state.params.id,
            //租赁类型  买或者租
            leaseType: this.props.navigation.state.params.index,
            // 一房一厅 ....
            type: this.props.navigation.state.params.type,
            roomType: '',
            username: '',
            contactPhone: '',
            bottomHeight: 44,
            stateArray: ServiceDetailAddress.areaData,
            cityArray: [],
            addressObj:{}
        }
    }

    addressCallBack = (e) => {
        try{
            let addressObj =  JSON.parse(e)
            console.log(addressObj)
            this.setState({
                addressObj: e,
                code: addressObj.code,
                state: addressObj.state,
                city: addressObj.city,
                address: addressObj.address,
                location: [addressObj.coordinate.lng, addressObj.coordinate.lat]
            })
        }catch(e){
            Toast.info("定位失败，请重试", 2)
        }
    }

    componentDidMount(){
        this.setState({
            showTab: true
        })
        this.subscription = DeviceEventEmitter.addListener('addressCallBack',this.addressCallBack);
    }

    //不用了记得移除
    componentWillUnmount(){
        this.subscription.remove();
    };

    /**
     * 使用方式sync/await
     * 相册参数暂时只支持默认参数中罗列的属性；
     * @returns {Promise<void>}
     */
    handleAsyncSelectPhoto = async () => {
        SyanImagePicker.asyncShowImagePicker(options)
            .then(photos => {
                console.log(photos);
                const arr = photos.map(v=>{
                    return { ...v, enableBase64:true}
                });
                // 选择成功
                this.setState({
                    photos: arr
                })

                const timestamp=new Date().getTime()
                const file = timestamp + ".jpg"
                let photo =  this.state.photos[0]
                Toast.loading("上传图片中....", 10)

                var fileArray = []
                QiniuUpload.upload(photo.uri,file).then(res => {
                    Toast.hide()
                    console.log(res)
                    fileArray.push(res)
                    this.setState({
                        pics: fileArray
                    })
                })

            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })
    };

    render(){

         let ScrollViewbanner =
             this.state.photos.length > 0 ?
                 this.state.photos.map((photo, index) => {
                     let source = { uri: photo.uri };
                     if (photo.enableBase64) {
                         source = { uri: photo.base64 };
                     }
                     return (
                         <TouchableOpacity key={index} style={styles.image } activeOpacity={0.75}
                             onPress={this.handleAsyncSelectPhoto.bind(this)}>
                             <Image key={`image-${index}`} style={styles.image} source={source} resizeMode={"contain"}/>
                         </TouchableOpacity>
                     )
                 })
                 :
                 <TouchableOpacity style={styles.image} activeOpacity={0.75} onPress={this.handleAsyncSelectPhoto.bind(this)}>
                     <Image resizeMode={"center"} source={this.state.imageUrl} style={styles.image}/>
                 </TouchableOpacity>

        let ScrollViewtop =
            <View style={styles.centerView}>
                <Homeheader title={"基本信息"}/>
                <Sae style={styles.containerStyle} label={'标题(不少于8个字)'}
                     labelStyle={styles.labelStyle}
                     iconClass={FontAwesomeIcon}
                     iconName={'pencil'}
                     iconColor={color.primary}
                     inputStyle={{ color: '#91627b' }}
                     autoCapitalize={'none'}
                     autoCorrect={false}
                     onChangeText={(text) => { this.setState({title: text}) }}/>

                <Sae style={styles.containerStyle} label={'描述'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b' }}
                     autoCapitalize={'none'}
                     autoCorrect={false}
                     onChangeText={(text) => { this.setState({descStr: text}) }}/>
            </View>

        let cityView = this.state.cityArray.length > 0 ?
            <Picker data={this.state.cityArray} cols={1}
                    value={this.state.city} onChange={v => this.setState({ city: v })}
                    onOk={v => this.setState({ city: v })}>
                <List.Item arrow="horizontal">
                    <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500'}}>所在区域</Text>
                </List.Item>
            </Picker> : null

        let ScrollViewCenterfangzi =
            <View style={styles.centerView}>
                <Homeheader title={"房子信息"}/>

                <Picker data={ServiceDetailAddress.seasonsData} cascade={false} extra="请选择"
                        value={this.state.roomType}
                        onChange={v => this.setState({ roomType: v })}
                        onOk={v => this.setState({ roomType: v })}>
                    <List.Item arrow="horizontal">
                        <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500'}}>厅室</Text>
                    </List.Item>
                </Picker>

                <List.Item arrow="horizontal"
                           multipleLine
                           onClick={this.selectAddress}>
                    <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500', marginTop: 4, marginBottom: 4}}>
                        地址(点击获取地址)
                    </Text>
                    <Brief>{this.state.address}</Brief>
                </List.Item>

                <Sae
                    style={styles.containerStyle} onChangeText={(text) => { this.setState({area: text}) }}
                    label={'面积(m^2)'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b' }}/>
            </View>

        let ScrollViewcenter =
            <View style={styles.centerView}>
                <Homeheader title={"金额详情"}/>
                <Sae style={styles.containerStyle} onChangeText={(text) => { this.setState({price: text}) }}
                    label={this.state.label + '($)'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b' }}/>
            </View>

        let ScrollViewbottom =
            <View style={styles.centerView}>
                <Homeheader title={"联系人"}/>
                <Sae style={styles.containerStyle} onChangeText={(text) => { this.setState({username: text}) }}
                    label={'姓名'} labelStyle={styles.labelStyle} iconClass={FontAwesomeIcon}
                    iconName={'pencil'} iconColor={color.primary} inputStyle={{ color: '#91627b' }}/>
                <Sae
                    style={styles.containerStyle} onChangeText={(text) => { this.setState({contactPhone: text}) }}
                    label={'电话'} labelStyle={styles.labelStyle} iconClass={FontAwesomeIcon}
                    iconName={'pencil'} iconColor={color.primary} inputStyle={{ color: '#91627b', fontSize: 12}}/>
            </View>

        let bottomView =
            <TouchableOpacity style={styles.bottomView } activeOpacity={0.75} onPress={this.tapBottomBtn.bind(this)}>
                <View style={[styles.bottomView , { backgroundColor: (this.state.themeColor),}]} >
                    <Text style={{color: 'white', textAlign: 'center', lineHeight: 44}}>保存并进行下一步</Text>
                </View>
            </TouchableOpacity>

        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={GlobalStyles.root_container}>
               <ScrollView ref="scrollView" style={{marginBottom: this.state.bottomHeight, flex: 1}}>
                   { ScrollViewbanner}
                   {ScrollViewtop}
                   { ScrollViewCenterfangzi}
                   {ScrollViewcenter}
                   {ScrollViewbottom}
               </ScrollView>
                {bottomView}
            </KeyboardAvoidingView>
        )
    }

    selectAddress = () => {
        NavigatorUtil.goToMapComponet({
            "navigation": this.props.navigation,
            themeColor: color.primary
        })
    }

    tapBottomBtn = () => {

        if (this.state.photos.length === 0){
            Toast.info("请上传图片，推广效果更好")
            return
        }

        if (this.state.address === ""){
            Toast.info("请填写地址", 2)
        }
        if (this.state.title === ""){
            Toast.info("请填写标题", 2)
        }
        if (this.state.descStr === ""){
            Toast.info("请填写描述", 2)
        }
        if (this.state.area === ""){
            Toast.info("请填写面积", 2)
        }
        if (this.state.price === ""){
            Toast.info("请填写价格", 2)
        }
        if (this.state.username === ""){
            Toast.info("请填写姓名", 2)
        }
        if (this.state.contactPhone === ""){
            Toast.info("请填写电话", 2)
        }

        if (this.state.category === 0){
            return
        }

        let params = {
            "category": this.state.category,
            "username": this.state.username,
            "contactPhone": this.state.contactPhone,
            "state": this.state.state,
            "city": this.state.city,
            "address": this.state.address,
            "location": this.state.location,
            "leaseType": this.state.leaseType,
            "roomType": this.state.roomType,
            "pics": this.state.pics,
            "title": this.state.title,
            "area": this.state.area,
            "code": this.state.code,
            "price": Number(this.state.price),
            "descStr": this.state.descStr,
            "type": this.state.type
        }

        console.log(params)
        Toast.info("提交中....", 10)
        saveServiceRoom(params).then(res => {
            Toast.hide()
            console.log(res)
            if (res.code == 1000){
                this.props.navigation.navigate("ServiceSelectPayPage", {
                    themeColor: this.state.themeColor,
                    navigation: this.props.navigation,
                    id: res.data
                })
            }
        })

    }
}

const styles = StyleSheet.create({
    imageStyle:{
        width:36,
        height:36,
        marginBottom: 6,
    },
    titleName:{
        color: color.normalTitle,
        fontSize: 15,
    },
    image: {
        width: width,
        height: imageH,
        backgroundColor: color.bodyColor
    },
    containerStyle: {
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: color.bodyColor,
    },
    centerView: {
        backgroundColor: 'white',
        marginTop: 8,
        paddingBottom: 15
    },
    bottomView: {
        position:'absolute',
        bottom: 0,
        width: width,
        height: 44,
    },
    labelStyle:{
        color: '#91627b',
        fontWeight: '400',
        fontSize: 13,
    }
})
