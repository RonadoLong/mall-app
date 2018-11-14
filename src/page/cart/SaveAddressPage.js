import React, {PureComponent} from 'react'

import {ScrollView, View, Text, KeyboardAvoidingView} from 'react-native'
import color from "../../widget/color";
import {List, WhiteSpace, Toast, Picker, InputItem, Button} from 'antd-mobile-rn'
import {GetUserAddress, SaveUserAddress} from "../../api/UserApi";
import ServiceDetailAddress from "../../component/ServiceDetailAddress";

export default class SaveAddressPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stateArray: ServiceDetailAddress.areaData,
            state: null,
            address: null,
            contactName: null,
            mobile: null,
            postalCode: null,
        }
    }

    componentDidMount() {
    };

    saveAddress(){

        console.log(this.state)

        if (this.state.contactName === ''){
            Toast.fail("input contactName", 1)
        }

        if (this.state.mobile === ''){
            Toast.fail("input mobile", 1)
        }

        if (this.state.state === '' || this.state.state.length === 0){
            Toast.fail("input state", 1)
        }

        if (this.state.address === ''){
            Toast.fail("input address", 1)
        }

        if (this.state.postalCode === ''){
            Toast.fail("input postalCode", 1)
        }

        let params = {
            contactName: this.state.contactName,
            mobile: this.state.mobile,
            state: this.state.state[0],
            address: this.state.address,
            postalCode: this.state.postalCode,
        }

        console.log(params)
        Toast.loading(null, 10)
        SaveUserAddress(params).then(res => {
            Toast.hide()
            console.log(res)
            if (res.code === 1000){
                this.props.navigation.state.params.callback();
                this.props.navigation.goBack()
            } else {
                Toast.fail("error input", 1)
            }
        })

    }

    render() {
        return (
            <View style={color.root_container}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <List>
                            <InputItem
                                defaultValue={100}
                                placeholder="input contact name"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={v => this.setState({contactName: v})}
                            >
                            </InputItem>

                            <InputItem
                                defaultValue={100}
                                placeholder="input mobile"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={v => this.setState({mobile: v})}
                            >
                            </InputItem>

                            <Picker data={this.state.stateArray} cols={1} extra="click select"
                                    value={this.state.state} onChange={v => this.setState({state: v})}
                                    onOk={v => this.setState({state: v})}>
                                <List.Item arrow="horizontal">
                                    <Text style={{fontSize: 15, color: '#91627b', fontWeight: '500'}}>State</Text>
                                </List.Item>
                            </Picker>

                            <InputItem
                                defaultValue={100}
                                placeholder="input your Street Address"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={v => this.setState({address: v})}
                            >
                            </InputItem>

                            <InputItem
                                defaultValue={100}
                                placeholder="input your ZIP/Postal Code"
                                clear
                                moneyKeyboardAlign="left"
                                onChange={v => this.setState({postalCode: v})}
                            >
                            </InputItem>

                        </List>


                        <WhiteSpace />
                        <Button type="warning" style={{marginTop: 20,marginLeft: "10%", width:"80%"}}
                                onPressIn={this.saveAddress.bind(this)}>Summit</Button>

                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
        )
    }
}
