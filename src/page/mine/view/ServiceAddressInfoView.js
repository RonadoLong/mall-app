import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Toast, WhiteSpace, Carousel, InputItem, Picker, List} from 'antd-mobile-rn';
import color,{screenWidth} from "../../../widget/color";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Isao, Jiro, Sae} from 'react-native-textinput-effects';
import Homeheader from "../../../component/Homeheader";
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";

export default class ServiceAddressInfoView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            city: '',
            stateArray: ServiceDetailAddress.areaData,
            state: ''
        }
    }

    componentDidMount(){

    };

    render(){

        let {item} = this.props

        let cityView = this.state.stateArray.length > 0 ?
            <List>

                {
                    item.state ?
                        <Picker data={this.state.stateArray} cols={1} extra="click select"
                                value={this.state.state} onChange={v => this.setState({state: v})}
                                onOk={v => this.setState({state: v})}>
                            <List.Item arrow="horizontal">
                                <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>State</Text>
                            </List.Item>
                        </Picker> : null
                }

                {
                    item.city ?
                        <InputItem
                            defaultValue={100}
                            placeholder="input your city"
                            clear
                            moneyKeyboardAlign="left"
                            onChange={v => this.setState({city: v})}
                        >
                            <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>City</Text>
                        </InputItem> : null
                }
            </List>
            : null

        return (
            <View>
                <WhiteSpace size="sm" />
                <Homeheader title={'AddressInfo'}/>
                {cityView}
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
        paddingBottom: 15
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
