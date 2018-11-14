import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter,Image} from 'react-native'
import color, {screenHeight, screenWidth} from "../../../widget/color";
import GlobalStyles from "../../../widget/styles/GlobalStyles"


function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

export default class MineAdtPage extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            isAgreement: true,
        }
    }

    componentWillMount(){

    }


    render() {



        return (
            <View style={[GlobalStyles.root_container, {alignItems:"center"}]}>
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
