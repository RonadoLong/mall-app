import React,{PureComponent} from 'react'

import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import color from "../../widget/color";
import {List, WhiteSpace, Toast} from 'antd-mobile-rn'
import {GetUserAddress} from "../../api/UserApi";

export default class AddressPage extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            dataArray: []
        }
    }

    componentDidMount(){
        this.loadData()
    };

    async loadData(){
        Toast.loading(null, 10)
        GetUserAddress().then(res=>{
            Toast.hide()
            console.log(res)
            if (res.code === 1000){
                this.setState({dataArray: res.data})
            }
        })
    }

    render(){
        return (
            <View style={color.root_container}>
                <ScrollView>
                    <List >
                        <List.Item arrow="horizontal"  multipleLine align="center" wrap
                                   onClick={() => {
                                       this.props.navigation.navigate("SaveAddressPage",{
                                           title: "SaveAddress",
                                           callback: () => {
                                               this.loadData()
                                           }
                                       })
                                   }}
                        >
                            <Text style={{fontSize:13, color: color.primary}}>Add an address</Text>
                        </List.Item>
                    </List>

                    {
                        this.state.dataArray.map((item, index)=>{
                           return(
                               <AddressCell
                                   item={item}
                                   key={index}
                                   tapItem={()=>{
                                       this.props.navigation.state.params.callback(item)
                                       this.props.navigation.goBack()
                                   }}
                               />
                           )
                        })
                    }

                </ScrollView>
            </View>
        )
    }
}

class AddressCell extends PureComponent {

    constructor(prop){
        super(prop)
    }

    render(){

        let contentViews = []
        for (let [key, value] of Object.entries(this.props.item)) {
            if (key === "id" || key === "userId" ){
            }else {
                let contentView = <Text key={key} style={{color: color.bigTitle, fontSize: 15, marginTop: 4}}>{value}</Text>
                contentViews.push(contentView)
            }
        }

        return(
            <TouchableOpacity onPress={()=>{
                this.props.tapItem && this.props.tapItem()
            }}>
                <View style={{flex: 1, backgroundColor: "white", flexDirection:"row", alignItems:"center", marginTop: 4, padding:15}}>
                    <View >
                        {
                            contentViews
                        }
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

}
