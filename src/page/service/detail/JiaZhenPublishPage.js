import React, {Component} from 'react'
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
import Homeheader from "../../../component/Homeheader";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import color, { screenWidth } from "../../../widget/color";
import { Toast, List } from 'antd-mobile-rn';
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";
import {getAreasById, saveServiceJob} from "../../../api/ServiceApi";
import NavigatorUtil from '../../../commonuUtils/NavigatorUtil';
const Brief = List.Item.Brief;

type Props = {}
export default class JiaZhenPublishPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            category: this.props.navigation.state.params.id,
            username: "",
            contactPhone: "",
            state: "",
            city: "",
            address: "",
            area: "",
            code: "",
            location: "",
            pics: "",
            price: "",
            descStr: "",
            require: "",
            type: this.props.navigation.state.params.type,
            themeColor: this.props.navigation.state.params.themeColor,
            status: 1,
            areaArray: ServiceDetailAddress.areaData,
            subreaArray: [],
            showTab: false
        }
    }

    getAreaData = async(val) =>{
        getAreasById(val).then(res => {
            if (res.code === 1000){
                this.setState({
                    subreaArray: res.data
                })
            }
        })
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

    selectAddress = () => {
        NavigatorUtil.goToMapComponet({
            "navigation": this.props.navigation,
            themeColor: color.primary
        })
    }

    componentDidMount() {
        this.setState({
            showTab: true
        })
        this.subscription = DeviceEventEmitter.addListener('addressCallBack', this.addressCallBack);
    }

    render() {

        let ScrollViewTop =
            <View style={styles.centerView}>
                <Homeheader title={"基本信息"}/>
                <Sae style={styles.containerStyle} label={'标题'} labelStyle={styles.labelStyle}
                     iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                     inputStyle={{ color: '#91627b', fontSize: 12}}
                     onChangeText={(text) => { this.setState({title: text}) }}
                />

                <Sae
                    style={styles.containerStyle} label={'描述'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b' }}
                    onChangeText={(text) => { this.setState({descStr: text}) }}
                />

                <Sae style={styles.containerStyle} label={'工作要求'}
                    labelStyle={styles.labelStyle} iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b' }}
                     onChangeText={(text) => { this.setState({require: text}) }}
                />

            </View>

        let ScrollViewCenterfangzi =
            <View style={styles.centerView}>
                <Homeheader title={"工作地址"}/>
                <List.Item arrow="horizontal"
                           multipleLine
                           onClick={this.selectAddress}>
                    <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500', marginTop: 4, marginBottom: 4}}>
                        地址(点击获取地址)
                    </Text>
                    <Brief>{this.state.address}</Brief>
                </List.Item>

            </View>

        let ScrollViewCenter =
            <View style={styles.centerView}>
                <Homeheader title={"金额详情"}/>
                <Sae style={styles.containerStyle} label={'薪资' + '($)'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b' }}
                    onChangeText={(text) => { this.setState({price: text}) }}
                />
            </View>

        let ScrollViewBottom =
            <View style={styles.centerView}>
                <Homeheader title={"联系人"}/>
                <Sae style={styles.containerStyle} label={'姓名'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b' }}
                    onChangeText={(text) => { this.setState({username: text}) }}
                />
                <Sae style={styles.containerStyle} label={'电话'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b', fontSize: 12}}
                    onChangeText={(text) => { this.setState({contactPhone: text}) }}
                />
            </View>

        let bottomView =
            <TouchableOpacity style={styles.bottomView } activeOpacity={0.75} onPress={this.tapBottomBtn.bind(this)}>
                <View style={[styles.bottomView , { backgroundColor: color.primary,}]} >
                    <Text style={{color: 'white', textAlign: 'center', lineHeight: 44}}>保存并进行下一步</Text>
                </View>
            </TouchableOpacity>

        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={GlobalStyles.root_container}>
                <ScrollView ref="scrollView" style={{marginBottom: 44, flex: 1}}>
                    {ScrollViewTop}
                    {ScrollViewCenterfangzi}
                    {ScrollViewCenter}
                    {ScrollViewBottom}
                </ScrollView>
                {bottomView}
            </KeyboardAvoidingView>
        )
    }

    tapBottomBtn = () => {

        if (this.state.address === ""){
            Toast.info("请填写地址", 2)
            return
        }
        if (this.state.title === ""){
            Toast.info("请填写标题", 2)
            return
        }
        if (this.state.descStr === ""){
            Toast.info("请填写描述", 2)
            return
        }

        if (this.state.require === ""){
            Toast.info("请填写工作要求", 2)
            return
        }
        if (this.state.price === ""){
            Toast.info("请填写价格", 2)
            return
        }
        if (this.state.username === ""){
            Toast.info("请填写姓名", 2)
            return
        }
        if (this.state.contactPhone === ""){
            Toast.info("请填写电话", 2)
            return
        }

        if (this.state.category === 0){
            Toast.info("请填写category", 2)
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
            "require": this.state.require,
            "title": this.state.title,
            "area": this.state.area,
            "code": this.state.code,
            "price": Number(this.state.price),
            "descStr": this.state.descStr,
            "type": this.state.type,
            "status": 1,
        }

        console.log(params)
        Toast.info("提交中....", 10)
        saveServiceJob(params).then(res => {
            Toast.hide()
            console.log(res)
            this.props.navigation.navigate("ServiceSelectPayPage", {
                themeColor: this.state.themeColor,
                navigation: this.props.navigation,
                id: res.data
            })
        })

    }
}

const styles = StyleSheet.create({
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
        width: screenWidth,
        height: 44,
    },
    labelStyle:{
        color: '#91627b',
        fontWeight: '400',
        fontSize: 13,
    }
})
