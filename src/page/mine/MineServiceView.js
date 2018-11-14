import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, Linking, TouchableOpacity, Platform,Image} from 'react-native'
import color from "../../widget/color";
import ImageButton from "../../component/ImageButton";
import Homeheader from "../../component/Homeheader";

export default class MineServiceView extends PureComponent{

    constructor(Props){
        super(Props)
    }

    render() {
        let {onTapEvent} = this.props

        return (
            <View style={{backgroundColor: 'white'}}>
                <Homeheader
                    title={"我的服务"}
                    viewStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: color.bodyColor
                    }}
                />

                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    justifyContent:'space-around',
                    marginTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: color.bodyColor,
                    height: 70
                }}>

                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/collect.png')}
                        text={"我的广告"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(1)
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/invite.png')}
                        text={"邀请好友"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(2)
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/bonus.png')}
                        text={"奖金记录"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(3)
                        }}
                    />
                </View>

                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    justifyContent:'space-around',
                    marginTop: 10,
                    marginBottom: 10,
                    height: 70

                }}>

                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/customer-service.png')}
                        text={"客服"}
                        color={color.normalTitle}
                        onPress={() => {
                            let url = 'tel: 18827076688';
                            Linking.canOpenURL(url).then(supported => {
                                if (!supported) {
                                    console.log('Can\'t handle url: ' + url);
                                } else {
                                    return Linking.openURL(url);
                                }
                            }).catch(err => console.error('An error occurred', err));
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/address.png')}
                        text={"地址"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(5)
                        }}
                    />
                    <ImageButton
                        imageColor={color.primary}
                        imgSize={26}
                        fontSize={13}
                        image={require('../../res/mine/setup.png')}
                        text={"设置"}
                        color={color.normalTitle}
                        onPress={() => {
                            onTapEvent && onTapEvent(6)
                        }}
                    />
                </View>

            </View>
        )
    }
}
