import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, DeviceEventEmitter, ScrollView, StatusBar} from 'react-native'
import MineHeaderView from "./MineHeaderView";
import MineServiceView from "./MineServiceView";
import color, {isSystemIOS, screenWidth, statusBarHeight} from "../../widget/color";
import NavigatorUtil from "../../commonuUtils/NavigatorUtil";
import LoginPage from "../login/LoginPage";
import {Toast, Modal} from 'antd-mobile-rn'
import UserAgreementView from './view/UserAgreementView';
import {GetUserAgreement, GetUserInfo, SaveUserAgreement} from "../../api/UserApi";
const operation = Modal.operation;
const alert = Modal.alert;

export default class MinePage extends PureComponent {

    constructor(Props){
        super(Props)
        this.state = {
            userInfo: null,
            showUI: false,
            showLogin: false,
            isAgreement: false,
            selectView: false,
            isAgree: false
         }
    }

    componentWillMount(){
      this.getUser()
    }

    checkLogin() {
        if (this.state.userInfo == null) {
            alert('提示', '您还没登录哦...', [
                {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
                {
                    text: '去登录', onPress: () => {
                        this.props.navigation.navigate("LoginPage")
                    }
                },
            ]);
            return false
        }
        return true
    }

    async getUser() {
        Toast.loading(null, 10)
        GetUserInfo().then(res => {
            Toast.hide()
            console.log(res)
            if (res.code === 1000){
                GetUserAgreement().then(res => {
                    if (res.data != null) {
                        console.log(res)
                        this.setState({isAgree: true})
                    }
                })
                this.setState({userInfo: res.data, showUI: true})
            }
        })

        this.setState({showUI: true})
    }

    loginOut() {
        this.setState({userInfo: null})
    }

    componentDidMount(){
        this.subscription =DeviceEventEmitter.addListener('loginOut',()=>{
            this.loginOut()
        });
        this.subscriptionLogin = DeviceEventEmitter.addListener('loginSuccess', () => {
            console.log("mini loginSuccess")
            this.getUser();
        });
    };

    componentWillUnmount(){
        this.subscription.remove();
        this.subscriptionLogin.remove()
    };

    showLoginPage = () => {
        this.props.navigation.navigate("LoginPage")
    }

    selectSetting = (index) => {

        let ref = this.checkLogin()
        if(ref){

            switch (index) {
                case 1:
                    this.onTapBtn()
                    break;
                case 2:
                    this.props.navigation.navigate("MineFriendPage",{
                        userInfo: this.state.userInfo
                    })
                    break;
                case 3:
                    this.props.navigation.navigate("MineAwardPage",{
                        userInfo: this.state.userInfo
                    })
                    break;
                case 4:
                    this.props.navigation.navigate("MineFriendPage",{
                        userInfo: this.state.userInfo
                    })
                    break;
                case 5:
                    this.props.navigation.navigate("MineAddressPage",{
                        userInfo: this.state.userInfo
                    })
                    break;
                case 6:
                    NavigatorUtil.goToMineSettingDetail({
                        navigation: this.props.navigation
                    })
                    break;
            }
        }
    }

    onTapBtn() {
        this.refs.userAgreementView.hiddenView()
        Toast.loading(null, 10)
        if (!this.state.isAgree) {
            SaveUserAgreement().then(res => {
                Toast.hide()
                console.log(res)
                this.setState({isAgree: true})
                this.showSelectView()
            })
        } else {
            this.showSelectView()
        }
    }


    onTapOrderEvent = (index) =>{
        let ret = this.checkLogin()
        if(ret){
            if(index <= 4){
                this.props.navigation.navigate("MineOrderInfoPage",{
                    userInfo: this.state.userInfo,
                    index: index - 1
                })
           }
        }
    }

    ontapAddAdtBtn = (index) => {
        console.log(index)
        if(index === 1){
            this.props.navigation.navigate("ServiceClassPage")
        }

        if (index === 2){
            this.props.navigation.navigate("ServiceHistoryPage")
        }
    }


    showSelectView = () => {
        operation([
            {
                text: 'Add New Data', onPress: () => {
                    this.ontapAddAdtBtn(1)
                }, style: {textAlign: "center", color: color.primary, fontSize: 15}
            },
            {
                text: 'Look History', onPress: () => {
                    this.ontapAddAdtBtn(2)
                }, style: {textAlign: "center", color: color.primary, fontSize: 15}
            },
        ])
    }

    render(){

        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView = (<View style={[{backgroundColor:color.primary}, {height: statusBarHeight}]}/>);
        }

        return(
            this.state.showUI ?
                <View style={color.root_container}>

                    {statusBarView}

                    <ScrollView style={{width: screenWidth}}>
                        <MineHeaderView
                            showLoginPage={this.showLoginPage}
                            userInfo={this.state.userInfo}
                            onTapEvent={this.onTapOrderEvent}
                        />
                        <MineServiceView onTapEvent={this.selectSetting}/>
                    </ScrollView>

                    <UserAgreementView
                        ref='userAgreementView'
                        isAgreement={this.state.isAgreement}
                        onTapBtn={this.onTapBtn}
                    />

                </View> : null
        )
    }
}
