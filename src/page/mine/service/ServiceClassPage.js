'use strict'
import React,{Component}from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native'

import GlobalStyles from '../../../widget/styles/GlobalStyles'
import {getServiceCagetgory} from "../../../api/ServiceApi";
import {Toast, WhiteSpace, Carousel, WingBlank} from 'antd-mobile-rn';
import PublishUtils from "../../service/PublishUtils";
import color from "../../../widget/color";

var {width, height} = Dimensions.get('window');
var cols = 3;
var vWidth  = width / cols
var vHeight = 80

export default class ServiceClassPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            themeColor: color.primary,
            dataArray: []
        }
        this.getCategoryList()
    }

    getCategoryList(){
        Toast.loading(null, 12)
        getServiceCagetgory()
            .then(res => {
                Toast.hide()
                console.log("res ==== ", res)
                if (res.code === 1000){
                    this.setState({
                        dataArray: res.data
                    })
                }
            })
    }

    selectItem(item){
        PublishUtils.selectGoDetail(item, this.state.themeColor, this.props.navigation)
        this.props.navigation.navigate("ServicePublishPage",{
            item: item
        })
    }

    renderItem = (items) =>{
        let item = items.item;
        return (
            <TouchableOpacity  activeOpacity={0.75}
                               onPress={() => {
                                   this.selectItem(item)
                               }}>
                <View  style={{width:vWidth, height: vHeight, alignItems: 'center',}}>
                    <Image source={{uri:item.imgUrl}}
                           style={styles.imageStyle}/>
                    <Text style={styles.titleName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => index.toString();

    render(){
        return (
            <FlatList
                style={[GlobalStyles.root_container, {paddingTop:15}]}
                numColumns={3}
                data={ this.state.dataArray }
                renderItem={this.renderItem}
                keyExtractor={ this._keyExtractor }
            />
        )
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        width:36,
        height:36,
        marginBottom: 10,
    },
    titleName:{
        color:'#333',
        fontSize: 13,
    },
})
