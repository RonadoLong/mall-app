import React, {Component} from 'react'
import {
    ScrollView, StyleSheet,Text, View,TouchableOpacity, Image
} from 'react-native'
import ContactBottomView from "../view/ContactBottomView";
import moment from 'moment';
import color, {screenWidth} from "../../../widget/color";
import Homeheader from "../../../component/Homeheader";
import {List} from 'antd-mobile-rn';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Item = List.Item;
const Brief = Item.Brief;

type Props = {}

export default class JobServiceDetailPage extends Component<Props> {

    constructor(props) {
        super(props)
        console.log(this.props.navigation.state.params.item)
        this.state = {
            item: this.props.navigation.state.params.item,
        }
    }

    render() {

        let item = this.state.item;
        let time = moment(item.createTime).format("YYYY-MM-DD")
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{backgroundColor:"white", paddingBottom: 10}}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.time}>发布时间: {time}</Text>
                        <Text style={styles.readMember}>已有1000人预览</Text>
                    </View>


                    <View style={{backgroundColor:"white", paddingBottom: 10, marginTop:8,}}>
                        <Homeheader
                            title={'工作要求'}
                        />
                        <Text style={styles.content}>{item.require}</Text>
                    </View>

                    <View style={{backgroundColor:"white", paddingBottom: 10, marginTop:8,}}>
                        <Homeheader
                            title={'工作内容及描述'}
                        />
                        <Text style={styles.content}>{item.descStr}</Text>
                    </View>

                    <View style={styles.addressView}>
                        <Homeheader
                            title={'地址信息'}
                        />
                        <List className="my-list">

                            <Item>
                                <View style={{flexDirection: "row"}}>
                                    <Ionicons
                                        size={15}
                                        color={color.primary}
                                        name={'ios-funnel'}
                                    />
                                    <Text style={{
                                        marginLeft: 5,
                                        color: color.normalTitle
                                    }}>
                                        {this.state.item.address}</Text>
                                </View>
                            </Item>

                            <Item arrow="horizontal" onClick={() => {
                            }}>
                                <Text style={{color: color.normalTitle}}>
                                    点击查看地图
                                </Text>
                            </Item>

                            <TouchableOpacity>
                                <Image
                                    style={{height: 150, width: screenWidth, margin: 0}}
                                    resizeMode={"center"}
                                    source={require("../../../res/public/map.png")}>
                                </Image>
                            </TouchableOpacity>

                        </List>
                    </View>

                </ScrollView>
                <ContactBottomView/>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    },

    title: {
        fontSize: 20,
        margin: 15,
        color: color.bigTitle,
        fontWeight: "600"
    },
    time: {
        fontSize: 14,
        marginLeft: 15,
        color: color.normalTitle
    },
    content: {
        fontSize: 14,
        marginLeft: 20,
        color: color.normalTitle,
        marginTop: 6,
    },
    readMember: {
        position: 'absolute',
        right: 15,
        bottom: 10,
        fontSize: 14,
        color: color.normalTitle
    },
    addressView: {
        backgroundColor: "white",
        marginTop: 8,
    }
})
