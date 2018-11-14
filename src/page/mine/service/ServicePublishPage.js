import React, {PureComponent} from 'react'
import {
    DeviceEventEmitter,
    TouchableOpacity,
    View,
    ScrollView,
    Text,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'
import {getServiceCagetgory, saveServiceRoom} from "../../../api/ServiceApi";
import {Toast, WhiteSpace, Carousel, WingBlank} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import ServiceImageView from "../view/ServiceImageView";
import ServiceBaseInfoView from "../view/ServiceBaseInfoView";
import ServiceAddressInfoView from "../view/ServiceAddressInfoView";
import ServiceUserInfoView from "../view/ServiceUserInfoView";


export default class ServicePublishPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            themeColor: color.primary,
            item: this.props.navigation.state.params.item,
            data: {},
            showUI: false,
        }
    }

    componentDidMount() {
        console.log(this.state.item)
        let data = {}
        this.state.item.settings.forEach(val => {
            data[val] = 'none'
        })
        data['classId'] = this.state.item.id
        data['classname'] = this.state.item.name
        console.log(data)
        this.setState({
            data: data,
            showUI: true
        })
    };

    tapBottomBtn = () => {
        let bannerInfo = this.refs.serviceImageView.state
        console.log(bannerInfo)

        let baseInfo = this.refs.serviceBaseInfoView.state
        console.log(baseInfo)

        let userInfo = this.refs.serviceUserInfoView.state
        console.log(userInfo)

        let addressInfo = this.refs.serviceAddressInfoView.state
        console.log(addressInfo)

        if (this.state.data.banner === "none") {
            if (bannerInfo.pics.length === 0) {
                Toast.info("Please Upload Image")
                return
            }
            this.state.data.banner = bannerInfo.pics
        }

        //baseInfo
        if (this.state.data.title === "none") {
            if (baseInfo.title === ''){
                Toast.info("Please input title", 2)
                return
            }
            this.state.data.title = baseInfo.title
        }

        if (this.state.data.note === "none") {
            if (baseInfo.note === ''){
                Toast.info("Please input note", 2)
                return
            }
            this.state.data.note = baseInfo.note
        }


        if (this.state.data.roomType === "none") {
            if (baseInfo.roomType === undefined || baseInfo.roomType.length === 0){
                Toast.info("Please input roomType", 2)
                return
            }
            this.state.data.roomType = baseInfo.roomType
        }

        if (this.state.data.price === "none") {
            if (baseInfo.price === ''){
                Toast.info("Please input price", 2)
                return
            }
            this.state.data.price = baseInfo.price
        }

        //userInfo
        if (this.state.data.name === "none") {
            if (userInfo.name === "") {
                Toast.info("Please input your name", 2)
                return
            }
            this.state.data.name = userInfo.name
        }

        if (this.state.data.tel === "none") {
            if (userInfo.tel === "") {
                Toast.info("Please input your tel", 2)
                return
            }
            this.state.data.tel = userInfo.tel
        }

        if (this.state.data.fax === "none") {
            if (userInfo.fax === "") {
                Toast.info("Please input your fax", 2)
                return
            }
            this.state.data.fax = userInfo.fax
        }

        if (this.state.data.email === "none") {
            if (userInfo.email === "") {
                Toast.info("Please input your email", 2)
                return
            }
            this.state.data.email = userInfo.email
        }

        if (this.state.data.wechat === "none") {
            if (userInfo.wechat === "") {
                Toast.info("Please input your wechat", 2)
                return
            }
            this.state.data.wechat = userInfo.wechat
        }

        //addressInfo
        if (this.state.data.state === "none") {
            if (addressInfo.state === "") {
                Toast.info("Please input your state", 2)
                return
            }
            this.state.data.state = addressInfo.state
        }

        if (this.state.data.city === "none") {
            if (addressInfo.city === "") {
                Toast.info("Please input your city", 2)
                return
            }
            this.state.data.city = addressInfo.city
        }

        this.props.navigation.navigate("ServicePriviewPage", {
            item: this.state.data
        })

        // console.log(this.state.data)
        // Toast.loading(null, 10)
        // saveServiceRoom(this.state.data).then(res => {
        //     Toast.hide()
        //     console.log(res)
        //     if (res.code === 1000){
        //
        //     }
        // })
    }

    render() {
        let BannersView = <ServiceImageView item={this.state.data} ref='serviceImageView'/>

        let baseInfoView = <ServiceBaseInfoView item={this.state.data} ref='serviceBaseInfoView'/>

        let serviceAddressInfoView = <ServiceAddressInfoView item={this.state.data} ref='serviceAddressInfoView'/>

        let userInfoView = <ServiceUserInfoView item={this.state.data} ref='serviceUserInfoView'/>

        let bottomView =
            <TouchableOpacity style={styles.bottomView} activeOpacity={0.75} onPress={this.tapBottomBtn.bind(this)}>
                <View style={[styles.bottomView, {backgroundColor: color.primary,}]}>
                    <Text style={{color: 'white', textAlign: 'center', lineHeight: 44}}>Save</Text>
                </View>
            </TouchableOpacity>
        return (
            this.state.showUI ?
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={{flex:1}}>

                    <ScrollView style={{marginBottom: 20}} keyboardShouldPersistTaps="always" >
                        {BannersView}
                        {baseInfoView}
                        {serviceAddressInfoView}
                        {userInfoView}
                        {bottomView}
                    </ScrollView>

                </KeyboardAvoidingView>
                : null
        )
    }
}


const styles = StyleSheet.create({
    bottomView: {
        width: screenWidth - 60,
        height: 44,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 15,
        borderRadius: 22,
    },
    labelStyle: {
        color: '#91627b',
        fontWeight: '400',
        fontSize: 13,
    }
})
