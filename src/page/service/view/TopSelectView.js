import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions
} from 'react-native'

import moment from 'moment';
import {Button, Picker, List} from 'antd-mobile-rn';
import color, {screenWidth} from "../../../widget/color";
import {root_container} from '../../../widget/styles/GlobalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ServiceDetailAddress from "../../../component/ServiceDetailAddress";

export default class TopSelectView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateArray: ServiceDetailAddress.areaData,
            typeArray: ServiceDetailAddress.seasonsData,
            address: this.props.address,
            visible: false,
            showType: false,
            middleTitle: this.props.middleTitle ? this.props.middleTitle : '分类'
        };
    }

    render(){

        let {viewStyle, onMenuSelected} = this.props

        return(
            <View style={[styles.container,viewStyle,]}>

                 <Picker
                    visible={this.state.visible}
                    data={this.state.stateArray}
                    cols={1}
                    onChange={(v ) => {
                        this.setState({ address: v })
                        onMenuSelected && onMenuSelected(v)
                    }}
                    onOk={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}>
                            <TouchableOpacity
                                        onPress={() => this.setState({ visible: true })}>
                                        <View style={styles.subView}  >
                                            <Text style={styles.title}>{this.state.address}</Text>
                                            <Ionicons
                                                size={15}
                                                name={'ios-play'}
                                                style={{ height: 20, width: 20, marginLeft: 5, marginTop: 5 }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                </Picker>

                {/*<Picker */}
                    {/*visible={this.state.showType}*/}
                    {/*data={this.state.typeArray} */}
                    {/*cols={1}*/}
                    {/*cascade={false}*/}
                    {/*onChange={(v ) => {this.setState({ middleTitle: v })*/}
                        {/*onMenuSelected && onMenuSelected(v)*/}
                    {/*}}*/}
                    {/*onOk={() => this.setState({ showType: false })}*/}
                    {/*onDismiss={() => this.setState({ showType: false })}>*/}
                            {/*<TouchableOpacity*/}
                                {/*onPress={() => this.setState({ showType: true })}>*/}
                                    {/*<View style={styles.subView}  >*/}
                                        {/*<Text style={styles.title}>{this.state.middleTitle}</Text>*/}
                                        {/*<Ionicons*/}
                                            {/*size={15}*/}
                                            {/*name={'ios-play'}*/}
                                            {/*style={{ height: 20,width: 20,marginLeft: 5,marginTop: 5 }}*/}
                                        {/*/>*/}
                                    {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                {/*</Picker>*/}

                {/*<TouchableOpacity*/}
                    {/*onPress={() => {*/}
                        {/*onMenuSelected && onMenuSelected(3)*/}
                    {/*}}>*/}
                    {/*<View style={styles.subView}>*/}
                        {/*<Text style={styles.title}>附近</Text>*/}
                        {/*<Ionicons*/}
                            {/*size={15}*/}
                            {/*name={'ios-play'}*/}
                            {/*style={{height: 20,width: 20,marginLeft: 5,marginTop: 5}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderColor: color.bodyColor,
        borderWidth: 0.5,
        width:screenWidth,
        height:50,
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    subView:{
         flexDirection: 'row',
        height: 50,
        maxWidth: 100,
        alignItems: 'center'
    },
    title: {
        lineHeight: 50,
        fontSize: 15,
        color: color.normalTitle,
        textAlign: 'center'
    }
})
