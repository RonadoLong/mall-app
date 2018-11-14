import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter,Image} from 'react-native'
import color, {screenHeight, screenWidth} from "../../../widget/color";
import GlobalStyles from "../../../widget/styles/GlobalStyles"
import Ionicons from "react-native-vector-icons/Ionicons";
import LocalStorage from "../../../commonuUtils/StorageUtils";
import KeyUtils from "../../../commonuUtils/KeyUtils";
import { Button, WhiteSpace, Toast } from 'antd-mobile-rn';

export default class MineSettingPage extends PureComponent {

    constructor(Props){
        super(Props)
    }

    static navigationOptions = {
        title: "Setting"
    }

    loginOut = () => {
        Toast.info("success", 2)
        LocalStorage.remove(KeyUtils.USER_INFO_TOKEN)

        setTimeout(()=>{
            DeviceEventEmitter.emit("loginOut")
            this.props.navigation.pop();
        }, 2000)
    }

    clear = () => {
        Toast.info("success", 2)
    }

    render() {
        return (
            <View style={[GlobalStyles.root_container, {alignItems:"center"}]}>

                <Image source={require('../../../res/login/logo.png')}
                       resizeMode={"contain"}
                       style={{height:90, width: 90, marginTop: 60,
                           backgroundColor: "white", borderRadius: 8, padding: 10}}
                />

                <Text style={{marginTop: 10, color: color.normalTitle, fontSize: 12}}>version v1.0</Text>

                <TouchableOpacity onPress={this.clear}
                                  style={{marginTop:50, backgroundColor: "white",
                                      height: 40, width: screenWidth}}>
                    <Text style={{marginLeft: 15, color: color.normalTitle,
                        fontSize: 16, lineHeight:40}}>Clear Cache</Text>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        style={{
                            position: 'absolute',
                            right: 10,
                            height: 30,
                            width: 10,
                            top: 12
                        }}
                    />

                </TouchableOpacity>

                <WhiteSpace />
                <Button type="warning" style={{margin: 20, width:300}}
                        onPressIn={this.loginOut}>LoginOut</Button>

            </View>
        )
    }
}
