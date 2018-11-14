import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import {Button, Toast} from 'antd-mobile-rn';
import color, { screenWidth } from "../../../widget/color";
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class ContactBottomView extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            userInfo: this.props.userInfo
        }
    }

    render(){

        return (
            <View style={styles.container}>

                <TouchableOpacity style={{ height: 50, width: screenWidth * 0.5}}
                    onPress={() => {
                        this.props.navigation.popToTop()
                    }}>

                    <View style={{
                        height: 50,
                        width: screenWidth * 0.5,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                        <Text style={{lineHeight:50, textAlign: "center", color: color.normalTitle, fontSize: 13,marginLeft: 8}}>
                            Go Home
                        </Text>

                    </View>

            </TouchableOpacity>

                <TouchableOpacity style={{ height: 50, width: screenWidth * 0.5 }}
                    onPress={() => {
                        Toast.info("开发中....", 3)
                    }}
                    activeOpacity={0.75}>
                    <View style={{
                        backgroundColor: color.primary,
                        height: 50,
                        width: screenWidth * 0.5,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Ionicons size={20} color={'white'} name={'ios-chatboxes'} style={{marginRight: 8}}/>
                        <Text style={{lineHeight:50, textAlign: "center", color: 'white' , fontSize: 13,}}>
                            Contact
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:screenWidth,
        height:50,
        backgroundColor: "white",
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
    }
})
