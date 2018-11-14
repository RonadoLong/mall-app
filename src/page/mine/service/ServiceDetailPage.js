import React, {PureComponent} from 'react'

import {ScrollView,Text, View} from 'react-native'
import BannerCoursel from "../../../component/BannerCoursel";
import color, {isSystemIOS, screenWidth, statusBarHeight} from "../../../widget/color";
import ContactBottomView from "../../service/view/ContactBottomView";
import {Avatar} from "react-native-elements";
import {List} from "antd-mobile-rn";

export default class ServiceDetailPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.navigation.state.params.item,
            showUI: false
        }
    }

    componentDidMount() {
        // console.log(this.state.item)
        if (this.state.item instanceof Object) {
            this.setState({showUI: true})
        } else {

        }
    };


    renderContentView(){

        let contentViews = []

        for (let [key, value] of Object.entries(this.state.item)) {
            if (!ServiceDetailPage._isHasContent(key) && value !== "none"){
                let keyStr = key.substring(0, 1).toUpperCase() + key.substring(1, key.length)
                keyStr = keyStr === "Price" ? keyStr +" ($)" : keyStr;

                let contentView =
                    <List.Item key={key}>
                        <Text style={{color: color.bigTitle, fontSize: 15}}>{keyStr + ": " + value}</Text>
                    </List.Item>
                contentViews.push(contentView)
            }
        }
        // console.log(contentViews)
        return contentViews
    }

    static _isHasContent(key){
        return key === "tel" || key === "wechat" || key === "note" || key === "banner" || key === "email"
            || key === "fax" || key === "cell" || key === "state" || key === "city" || key === "picture"
            || key === "create_at" || key === "update_at" || key === "_id" || key === "status" || key === "language"
            || key === "name" || key === "userId" || key === "classId";
    }


    render() {
        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView = (<View style={[{backgroundColor:color.primary, height: statusBarHeight}]}/>);
        }

        return (
            this.state.showUI ?
                <View style={color.root_container}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: color.bodyColor, marginBottom: 55}}>
                        {statusBarView}

                        <BannerCoursel swiperH={screenWidth}
                                       dataArray={this.state.item.banner}
                                       onTapBackButton={()=>{
                                            this.props.navigation.goBack()
                                       }}
                        />

                        <View style={{padding: 20, justifyContent: "center", backgroundColor: "white", paddingTop: 20}}>
                            <Text style={{fontSize: 18, color: color.bigTitle}}>{this.state.item.note}</Text>

                            <View style={{flexDirection:"row", alignItems:"center", marginTop: 20}}>
                                <Text style={{color:color.smallLabel, fontSize: 12}}>{'Posted'}</Text>
                                <Text style={{color:color.bigTitle, marginLeft: 5, fontSize: 12}}>{'2018-11-20'}</Text>
                            </View>

                            <View style={{position: "absolute", right:15, bottom: 20, flexDirection:"row", alignItems:"center", marginTop: 10}}>
                                <Text style={{color:color.smallLabel, fontSize: 12}}>{'Updated'}</Text>
                                <Text style={{color:color.bigTitle, marginLeft: 5, fontSize: 12}}>{'2018-11-20'}</Text>
                            </View>
                        </View>

                            {
                                this.renderContentView().length > 0 ?
                                    <View style={{marginTop:5, backgroundColor:"white"}}>
                                        {
                                            this.renderContentView()
                                        }
                                    </View> : null
                            }

                        <View style={{marginTop:5, backgroundColor:"white"}}>
                            <View style={{height: 50, width: screenWidth * 0.5, flexDirection: 'row', alignItems: 'center', marginLeft:15}}>
                                <Avatar
                                    small
                                    rounded
                                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                />
                                <Text style={{lineHeight:50, textAlign: "center", color: color.bigTitle, fontSize: 15, marginLeft:15}}>
                                    {this.state.item.name}
                                </Text>
                            </View>

                            <List>

                                {
                                    this.state.item.tel ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>Tel: {this.state.item.tel}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.wechat ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>Wechat: {this.state.item.wechat}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.cell ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>Cell: {this.state.item.cell}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.email ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>Email: {this.state.item.email}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.fax ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>fax: {this.state.item.fax}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.state ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>State: {this.state.item.state}</Text>
                                        </List.Item> : null
                                }

                                {
                                    this.state.item.city ?
                                        <List.Item>
                                            <Text style={{color: color.bigTitle, fontSize: 14}}>City: {this.state.item.city}</Text>
                                        </List.Item> : null
                                }

                            </List>
                        </View>

                    </ScrollView>

                    <ContactBottomView {...this.props}/>

                </View> : null
        )
    }

}
