import React,{PureComponent}from 'react'
import {DeviceEventEmitter, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Toast, WhiteSpace, Carousel, InputItem, List, TextareaItem, Picker} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import Homeheader from "../../../component/Homeheader";
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";

export default class ServiceBaseInfoView extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            note: '',
            roomType: [],
            styles: ServiceDetailAddress.seasonsData,
            price: ''
        }
    }

    componentDidMount(){

    };

    getValue(){
        return {
            title: this.state.title,
            note: this.state.note
        }
    }

    render(){

        let {item} = this.props

        let ServiceBaseInfoView =
            <View style={styles.centerView}>

                {
                    item.note  ?
                        <List renderHeader={() => <Homeheader title={'Note'}/>}>
                            <TextareaItem
                                placeholder="can input 100 characters"
                                rows={5}
                                onChange={(val)=> this.setState({note: val})}
                                labelNumber={200}
                            />
                        </List>

                        : null
                }

                <WhiteSpace size={'sm'}/>

                {
                    item.roomType ?
                        <List renderHeader={() => <Homeheader title={'RoomType'}/>}>
                            <Picker data={ServiceDetailAddress.seasonsData} cascade={false} extra="click select"
                                    value={this.state.roomType}
                                    onChange={v => this.setState({ roomType: v })}
                                    onOk={v => this.setState({ roomType: v })}>
                                <List.Item arrow="horizontal">
                                </List.Item>
                            </Picker>
                        </List> : null
                }


                {
                    <List renderHeader={() => <Homeheader title={'Price'}/>}>
                        <InputItem
                            defaultValue={100}
                            placeholder="input price"
                            clear
                            moneyKeyboardAlign="left"
                            extra="$"
                            onChange={(v)=>{
                                this.setState({price: v})
                            }}
                        >
                        </InputItem>
                    </List>
                }
            </View>
        return (
            <View>
                <WhiteSpace size="sm" />
                {ServiceBaseInfoView}
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
