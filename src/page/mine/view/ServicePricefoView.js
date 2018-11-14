import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Toast, WhiteSpace, Carousel, InputItem, List} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import Homeheader from "../../../component/Homeheader";

export default class ServicePricefoView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            price: '',
        }
    }

    componentDidMount(){

    };

    getValue(){
        return this.state.price
    }

    render(){

        let {item} = this.props

        let PirceInfoView =
            <View style={styles.centerView}>
                <Homeheader title={"BaseInfo"}/>
                <List>
                    <InputItem
                        defaultValue={100}
                        placeholder="input price"
                        clear
                        moneyKeyboardAlign="left"
                        onChange={(v)=>{
                            this.setState({price: v})
                        }}
                    >
                        <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Price</Text>
                    </InputItem>
                </List>
            </View>
        return (
            item.price ?
            <View>
                <WhiteSpace size="sm" />
                {PirceInfoView}
            </View> : null
        )
    }
}

const styles = StyleSheet.create({

    titleName: {
        color: color.normalTitle,
        fontSize: 15,
    },

    containerStyle: {
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: color.bodyColor,
    },
    centerView: {
        backgroundColor: 'white',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        height: 44,
    },
    labelStyle: {
        color: '#91627b',
        fontWeight: '400',
        fontSize: 13,
    }
})
