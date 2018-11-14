import React, {PureComponent} from 'react'

import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import color from "../widget/color";

export default class Homeheader extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        let fontSize = this.props.fontSize ? this.props.fontSize : 16;
        let {viewStyle, title} = this.props
        return (
            <View style={[styles.Information, viewStyle]}>
                <Text style={styles.line}>| </Text>
                <Text style={[styles.headerTitle,{fontSize: fontSize}]}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Information: {
        alignItems: 'center',
        marginTop: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingBottom:0.5,
        height: 40,
        borderBottomColor: color.bodyColor,
        borderBottomWidth: 0.5
    },
    line: {
        marginLeft: 10,
        color: '#d43d3d',
        fontWeight: '700',
        lineHeight: 30,
    },
    headerTitle: {
        alignSelf: 'center',
        fontSize: 16,
        color: color.bigTitle,
        lineHeight: 40,
        fontWeight: '500',
    }
})
