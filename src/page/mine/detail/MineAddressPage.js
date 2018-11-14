import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter,Image} from 'react-native'
import color from "../../../widget/color";
import GlobalStyles from "../../../widget/styles/GlobalStyles"

export default class MineAddressPage extends PureComponent{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={[GlobalStyles.root_container, {alignItems:"center"}]}>

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

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,
    }
})
