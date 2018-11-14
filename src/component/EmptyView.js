import React, {PureComponent} from 'react'
import {Image, Text, View} from 'react-native'
import color, {screenHeight, screenWidth} from "../widget/color";

export  default class EmptyView extends PureComponent{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={{
                position: "absolute",
                top: screenHeight * 0.5 - 200,
                left: (screenWidth - 300) * 0.5,
                width: 300,
                borderRadius: 8,
                height: 220,
                backgroundColor:"white",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Image style={{height: 100, width: 100, }}
                       source={require('../res/home/emptyView.png')}/>
                <Text style={{color: color.smallLabel, fontSize: 18, marginTop: 15}}>NOT MORE CONTENT</Text>
            </View>
        )
    }
}
