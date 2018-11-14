import React, {PureComponent} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native'

import GlobalStyles from '../../widget/styles/GlobalStyles'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Isao, Jiro, Sae} from 'react-native-textinput-effects';
import color, {screenHeight, screenWidth} from "../../widget/color";
import {Button, SocialIcon} from 'react-native-elements';
import px2dp from "../../commonuUtils/px2dp";
import {getCode, login} from "../../api/LoginApi";
import LocalStorage from "../../commonuUtils/StorageUtils";
import KeyUtils from "../../commonuUtils/KeyUtils";
import {faceBookCallBack, wechatLoginCallBack} from '../../commonuUtils/LoginUtils';
import {Toast, Checkbox, Flex, Modal, ActivityIndicator} from 'antd-mobile-rn';

const operation = Modal.operation;
export default class LoginPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            phone: "",
            code: "",
            recommendCode: "",
            isShow: this.props.isShow,
            disable: true,
            isLoading: false,
            timerTitle: 'Get Code',
            timerCount: this.props.timerCount || 90,
            counting: false,
            showUI: false,
            prefix: "+1",
        }
    }

    componentDidMount() {
        this.setState({
            showUI: true
        })
    }

    componentWillMount() {
        StatusBar.setBarStyle('dark-content')
    }

    componentWillUnmount() {
        StatusBar.setBarStyle('light-content')
        clearInterval(this.interval)
    }

    countDownAction = () => {

        if (this.state.phone === "") {
            Toast.info("请填写手机号", 2)
            return
        }

        if (this.state.counting) {
            Toast.info("已获取过验证码 稍等", 2)
            return
        }

        if (!this.state.counting) {
            this.getCode()
        } else {
            return
        }

        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || 'Get Code',
                    counting: false,
                })
            } else {
                console.log("---- timer ", timer);
                this.setState({
                    counting: true,
                    timerCount: timer,
                    timerTitle: `Get (${timer}s)`,
                })
            }
        }, 1000)

    }


    /**
     * login phone
     */
    loginByPhone = () => {

        let params;
        if (this.state.phone !== "" && this.state.code !== "") {

            let phone = this.state.prefix + this.state.phone

            if (this.state.recommendCode !== "") {
                params = {
                    "phone": phone,
                    "verifyCode": this.state.code,
                    "type": "phone",
                    "recommendCode": this.state.recommendCode
                }
            } else {
                params = {
                    "phone": phone,
                    "verifyCode": this.state.code,
                    "type": "phone"
                }
            }

            this.setState({
                isLoading: true
            })

            this.loginapp(params)
        } else {
            Toast.info("完善信息....", 3)
        }
    }

    loginapp(params) {

        this.setState({isLoading: true})

        login(params).then(res => {
            Toast.hide()
            console.log(res)
            if (res.code === 1000) {

                LocalStorage.set(KeyUtils.USER_INFO_TOKEN, res.token, null , null)

                setTimeout(()=>{
                    DeviceEventEmitter.emit("loginSuccess")
                    if (this.props.navigation) {
                        this.props.navigation.goBack()
                    } else {
                        this.setState({isShow: false, isLoading: false})
                    }
                }, 2000)

            } else {
                this.setState({
                    isLoading: false
                })
            }
        })
    }

    /**
     * login facebook
     */
    loginByFaceBook = () => {
        console.log('faceBookCallBack ========= begin')
        this.setState({
            isLoading: true
        })

        faceBookCallBack().then(res => {
            console.log("faceBookCallBack ====> ", res)
            this.setState({
                isLoading: false
            })
            if (this.state.recommendCode !== "") {
                res.recommendCode = this.state.recommendCode
            }
            this.loginapp(res)
        }).catch(e => {
            this.setState({
                isLoading: false
            })
            Toast.info(e, 2);
        })
    }

    loginByWechat = () => {
        console.log("loginByWechat ==== ")

        this.setState({
            isLoading: true
        })

        wechatLoginCallBack().then(res => {
            this.setState({
                isLoading: false
            })
            console.log("callback ==== ", res)
            if (this.state.recommendCode !== "") {
                res.recommendCode = this.state.recommendCode
            }
            this.loginapp(res)

        }).catch(e => {
            this.setState({
                isLoading: false
            })
            Toast.info(e, 2);
        })

    }

    getCode = () => {
        console.log("get code ", this.state.phone);
        this.setState({
            isLoading: true
        })
        let phone = this.state.prefix + this.state.phone
        if (this.state.phone !== "") {
            getCode(phone).then(res => {
                console.log(res)
                this.setState({
                    isLoading: false
                })
            })
        }
    }

    showBtn() {
        console.log(this.state.code.length)
        if (this.state.phone.length > 0 && this.state.code.length >= 5) {
            this.setState({
                disable: false
            })
        } else {
            this.setState({
                disable: true
            })
        }
    }

    render() {

        let shareW = (GlobalStyles.screenWidth - 60) / 2;
        let shareM = 60 / 3;
        let shareH = 40;

        return (
            this.state.showUI ?
                <View style={GlobalStyles.root_container}>

                    <ActivityIndicator
                        toast
                        text="Loading..."
                        animating={this.state.isLoading}
                    />

                    <ScrollView>
                        <Image
                            style={{
                                width: GlobalStyles.screenWidth,
                                height: GlobalStyles.screenHeight,
                                position: "absolute"
                            }}
                            source={require("../../res/login/login-bg.png")}/>

                        <Image
                            resizeMode={"contain"}
                            style={{width: px2dp(100), height: px2dp(100), alignSelf: "center", marginTop: px2dp(50)}}
                            source={require("../../res/login/logo.png")}/>

                        <View style={{
                            marginTop: px2dp(8),
                        }}>

                            <TouchableOpacity style={{    width: px2dp(60),
                                height: px2dp(25),  position: "absolute",
                                padding: 0,
                                left: px2dp(10),
                                bottom: 0,
                                borderRadius: px2dp(6),
                                backgroundColor: color.primary,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection:"row"}}
                                              onPress={()=>{
                                                  operation([
                                                      {
                                                          text: '+1', onPress: () => {
                                                              this.setState({prefix: "+1"})
                                                          }, style: {textAlign: "center", color: color.primary, fontSize: 15}
                                                      },
                                                      {
                                                          text: '+86', onPress: () => {
                                                              this.setState({prefix: "+86"})
                                                          }, style: {textAlign: "center", color: color.primary, fontSize: 15}
                                                      },
                                                  ])

                            }}>


                                    <Text style={{color: "white"}}>{this.state.prefix}</Text>
                                    <Image style={{height:px2dp(10), width: px2dp(10), marginBottom: 5, marginLeft:px2dp(10)}} source={require('../../res/images/ic_spinner_triangle.png')}/>

                            </TouchableOpacity>

                            <Sae
                                style={{
                                    marginTop: px2dp(5),
                                    borderBottomColor: color.subPrimary,
                                    borderBottomWidth: 1,
                                    marginLeft: px2dp(70),
                                    marginRight: px2dp(10),
                                    borderRadius: px2dp(10),
                                }}

                                onChangeText={(text) => {
                                    this.setState({phone: text})
                                    this.showBtn()
                                }}
                                label={'phone'}
                                labelStyle={styles.labelStyle}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={color.primary}
                                keyboardType={'numeric'}
                                inputStyle={{color: color.normalTitle, marginLeft: 10}}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                            />
                        </View>


                        <View style={{
                            marginTop: px2dp(8),
                        }}>

                            <Sae
                                style={{
                                    borderBottomColor: color.subPrimary,
                                    borderBottomWidth: 1, marginLeft: 10, marginRight: 120, borderRadius: 10,
                                }}
                                onChangeText={(text) => {
                                    console.log(text)
                                    this.setState({code: text})
                                    this.showBtn()
                                }}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                label={'code'}
                                keyboardType={'numeric'}
                                labelStyle={styles.labelStyle}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={color.primary}
                                inputStyle={{color: color.normalTitle, marginLeft: 10}}
                            />

                            <Button
                                fontSize={11}
                                backgroundColor={color.primary}
                                borderRadius={10}
                                buttonStyle={{
                                    padding: 8,
                                    height: 35
                                }}
                                containerViewStyle={{
                                    width: 90,
                                    height: 35,
                                    position: "absolute",
                                    padding: 0,
                                    right: 0,
                                    bottom: 0,
                                }}
                                loading={false}
                                raised
                                title={this.state.timerTitle}
                                onPress={this.countDownAction}
                            />
                        </View>

                        <Sae
                            style={{
                                marginTop: px2dp(8), borderBottomColor: color.subPrimary,
                                borderBottomWidth: 1, marginLeft: 10, marginRight: 10, borderRadius: 10,
                            }}
                            onChangeText={(text) => {
                                this.setState({recommendCode: text})
                            }}
                            label={'recommend code'}
                            labelStyle={styles.labelStyle}
                            iconClass={FontAwesomeIcon}
                            iconName={'pencil'}
                            iconColor={color.primary}
                            inputStyle={{color: color.normalTitle, marginLeft: 10}}
                        />

                        <Button
                            onPress={this.loginByPhone}
                            backgroundColor={color.primary}
                            borderRadius={10}
                            containerViewStyle={{
                                marginTop: px2dp(25),
                            }}
                            loading={this.state.isLoading}
                            disabled={this.state.disable}
                            raised
                            title='login'/>

                        <Flex style={{marginTop: 10, marginLeft:5}}>
                            <Flex.Item>
                                <Checkbox.AgreeItem checked={true} disabled data-seed="logId" onChange={e => console.log('checkbox', e)}>
                                    Agree agreement
                                </Checkbox.AgreeItem>
                            </Flex.Item>
                        </Flex>

                        <View style={{
                            flex: 1,
                            marginTop: px2dp(40),
                            height: shareH + 20
                        }}>


                            <SocialIcon
                                title='Facebook login'
                                button
                                type='facebook'
                                style={{
                                    width: shareW, height: shareH, padding: 0,
                                    margin: 0, position: 'absolute', left: shareM
                                }}
                                iconSize={15}
                                fontStyle={{
                                    fontSize: 12,
                                }}
                                onPress={this.loginByFaceBook}
                            />

                            <SocialIcon
                                title='Wechat login'
                                button
                                iconSize={12}
                                style={{
                                    width: shareW,
                                    height: shareH,
                                    padding: 0,
                                    margin: 0,
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: shareM * 2 + shareW,
                                    backgroundColor: 'green'
                                }}
                                fontStyle={{
                                    fontSize: 12,
                                }}
                                onPress={this.loginByWechat}
                            />

                        </View>

                    </ScrollView>

                </View>
                : null
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        height: screenHeight,
        width: screenWidth
    },
    labelStyle: {
        color: color.normalTitle,
        fontWeight: '400',
        marginLeft: 10
    },
})
