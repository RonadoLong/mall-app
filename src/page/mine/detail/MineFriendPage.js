import React, {PureComponent} from 'react'
import {View, Text, TouchableWithoutFeedback, TouchableOpacity, Clipboard,Image} from 'react-native'
import color, {screenHeight, screenWidth}  from "../../../widget/color";
import { Toast } from 'antd-mobile-rn';

export default class MineFriendPage extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            userInfo: this.props.navigation.state.params.userInfo
        }
    }

    async copy(){
        Clipboard.setString(this.state.userInfo.recommendCode);
        let str = await Clipboard.getString()
        console.log(str)
        Toast.success("copy success")
    }

    render() {
        return (
            <View style={{flex: 1}} >

                <View style={{
                    marginTop: screenHeight * 0.5 - 200,
                    marginLeft: (screenWidth - 300) * 0.5,
                    width: 300,
                    borderRadius: 8,
                    height: 220,
                    backgroundColor:"white",
                    justifyContent: "center",
                    alignItems: "center"
                   }}>

                    <Image style={{height: 100, width: 100, }}
                           source={require('../../../res/home/emptyView.png')}/>

                    <Text style={{color: color.primary, fontSize: 18, marginTop: 15,padding: 10, backgroundColor: color.bodyColor}}>
                        {this.state.userInfo.recommendCode}
                        </Text>

                    <TouchableOpacity style={{marginTop: 15}} onPress={this.copy.bind(this)}>
                        <View>
                            <Text style={{color: color.smallLabel, fontSize: 16,}}>点击推荐码复制分享朋友</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

class OrderInfoCell extends PureComponent {
    constructor(props){
        super(props)
        this.state= {

        }
    }

    render(){
        return (
            <View>
                <Text>哈哈哈</Text>
            </View>
        )
    }

}
