import React, {Component} from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    Platform
} from 'react-native'

import GlobalStyles from '../../../widget/styles/GlobalStyles'
import Homeheader from "../../../component/Homeheader";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Isao, Jiro, Sae} from 'react-native-textinput-effects';
import color from "../../../widget/color";
import { Picker, List, WhiteSpace } from 'antd-mobile-rn';
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";
import {getAreasById} from "../../../api/ServiceApi";

var {width, height} = Dimensions.get('window');

type Props = {}
export default class ZhaoShengPublishPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            areaArray: ServiceDetailAddress.areaData,
            subreaArray: [],
            bottomHeight: 44,
        }
    }

    getAreaData = async(val) =>{
        getAreasById(val).then(res => {
            if (res.code === 1000){
                this.setState({
                    subreaArray: res.data
                })
            }
        })
    }


    render() {

        let ScrollViewTop =
            <View style={styles.centerView}>
                <Homeheader title={"基本信息"}/>

                <Sae style={styles.containerStyle} label={'标题'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b', fontSize: 12}}
                     onChangeText={(text) => { this.setState({zhiwei: text}) }}
                />

                <Sae style={styles.containerStyle} label={'描述'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                    inputStyle={{ color: '#91627b' }}
                     onChangeText={(text) => { this.setState({zhiwei: text}) }}
                />
                <Sae
                    style={styles.containerStyle} label={'要求'}
                    labelStyle={styles.labelStyle} iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b' }}
                    onChangeText={(text) => { this.setState({title: text}) }}
                />
            </View>

        let areasubView = this.state.subreaArray.length > 0 ?
            <Picker data={this.state.subreaArray} cols={1}
                    value={this.state.subarea} onChange={v => this.setState({ subarea: v })}
                    onOk={v => this.setState({ subarea: v })}>
                <List.Item arrow="horizontal">
                    <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500'}}>所在区域</Text>
                </List.Item>
            </Picker> : null

        let ScrollViewCenterfangzi =
            <View style={styles.centerView}>
                <Homeheader title={"工作地址"}/>

                <Picker data={this.state.areaArray} extra="请选择"
                        cols={1} value={this.state.area} onChange={this.getAreaData}
                        onOk={v => this.setState({ area: v })}>
                    <List.Item arrow="horizontal">
                        <Text style={{fontSize: 17, color: '#91627b', fontWeight: '500'}}>所在州</Text>
                    </List.Item>
                </Picker>
                {areasubView}
                <Sae
                    style={styles.containerStyle} onChangeText={(text) => { this.setState({title: text}) }}
                    label={'详细地址'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b' }}/>
            </View>

        let ScrollViewBottom =
            <View style={styles.centerView}>
                <Homeheader title={"联系人"}/>
                <Sae style={styles.containerStyle} label={'姓名'} labelStyle={styles.labelStyle}
                    iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={color.primary}
                     inputStyle={{ color: '#91627b' }}
                     onChangeText={(text) => { this.setState({title: text}) }}
                />
                <Sae style={styles.containerStyle} label={'电话'}
                    labelStyle={styles.labelStyle} iconClass={FontAwesomeIcon} iconName={'pencil'}
                    iconColor={color.primary} inputStyle={{ color: '#91627b', fontSize: 12}}
                     onChangeText={(text) => { this.setState({title: text}) }}
                />
            </View>

        let bottomView =
            <TouchableOpacity style={styles.bottomView } activeOpacity={0.75} >
                <View style={[styles.bottomView , { backgroundColor: color.primary,}]} >
                    <Text style={{color: 'white', textAlign: 'center', lineHeight: 44}}>保存并进行下一步</Text>
                </View>
            </TouchableOpacity>

        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={GlobalStyles.root_container}>
                <ScrollView ref="scrollView" style={{marginBottom: this.state.bottomHeight, flex: 1}}>
                    {ScrollViewTop}
                    {ScrollViewCenterfangzi}
                    {ScrollViewBottom}
                </ScrollView>
                {bottomView}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: color.bodyColor,
    },
    centerView: {
        backgroundColor: 'white',
        marginTop: 8,
        paddingBottom: 15
    },
    bottomView: {
        position:'absolute',
        bottom: 0,
        width: width,
        height: 44,
    },
    labelStyle:{
        color: '#91627b',
        fontWeight: '400',
        fontSize: 11,
    }
})
