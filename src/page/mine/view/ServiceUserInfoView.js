import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Toast, WhiteSpace, Carousel, WingBlank, InputItem, List, Picker} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import Homeheader from "../../../component/Homeheader";

export default class ServiceUserInfoView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            name: '',
            tel: '',
            cell: '',
            fax: '',
            email: '',
            wechat: ''

        }
    }

    componentDidMount(){

    };


    render(){

        let {item} = this.props

        let ScrollViewtop =
            <View style={styles.centerView}>
                <Homeheader title={"ContactInfo"}/>
                <List>
                    {
                        item.name ?
                        <InputItem
                            defaultValue={100}
                            placeholder="input your name"
                            clear
                            moneyKeyboardAlign="left"
                            onChange={(v) => this.setState({name: v})}
                        >
                            <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Name</Text>
                        </InputItem> : null
                    }

                    {
                       item.tel ?
                           <InputItem
                               defaultValue={100}
                               placeholder="input your phone"
                               clear
                               moneyKeyboardAlign="left"
                               onChange={(v) => this.setState({tel: v})}
                           >
                               <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Tel</Text>
                           </InputItem> : null
                    }

                    {
                        item.fax ?
                            <InputItem
                                defaultValue={100}
                                placeholder="input your fax"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={(v) => this.setState({fax: v})}
                            >
                                <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Fax</Text>
                            </InputItem> : null
                    }

                    {
                        item.email ?
                            <InputItem
                                defaultValue={100}
                                placeholder="input your email"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={(v) => this.setState({email: v})}
                            >
                                <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Email</Text>
                            </InputItem> : null
                    }

                    {
                        item.wechat ?
                            <InputItem
                                defaultValue={100}
                                placeholder="input your wechat"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={(v) => this.setState({wechat: v})}
                            >
                                <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>Wechat</Text>
                            </InputItem> : null
                    }

                </List>

            </View>

        return (
            <View>
                <WhiteSpace size="sm" />
                {ScrollViewtop}
            </View>
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
