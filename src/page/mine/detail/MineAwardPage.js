
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter,Image} from 'react-native'
import color from "../../../widget/color";
import GlobalStyles from "../../../widget/styles/GlobalStyles"

import {GetUserIntegralFlow} from "../../../api/UserApi";
import RefreshListView, {RefreshState} from "react-native-refresh-list-view";
import EmptyView from "../../../component/EmptyView";
import Homeheader from "../../../component/Homeheader";
import moment from 'moment'

export default class MineAwardPage extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            dataArray: [],
            refreshState: RefreshState.Idle,
            pageNum: 1,
            pageSize: 10
        }
    }

    componentDidMount(){
        //监第二个参数是函数，
       this.loadData()
    };

    loadData(){
        GetUserIntegralFlow().then(res => {
            console.log(res)
            if (res.code === 1000){
                this.setState({dataArray: res.data.content, refreshState: RefreshState.Idle})
            } else {
                this.setState({dataArray: [], refreshState: RefreshState.NoMoreData})
            }
        })
    }

    // 下拉刷新
    renderRefresh = async () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            pageNum: 1,
        })
        this.loadData()
    };


    // 上拉加载更多
    requestNextPage = async () => {
        this.setState({
            pageNum: this.state.pageNum += 1,
            refreshState: RefreshState.FooterRefreshing
        })
        this.loadData()
    };

    onSelectCell(item){
        console.log(item)
    }

    renderItem = ({item}) =>{
        return(
            <FlowCell
                item={item}
                onSelect={this.onSelectCell.bind(this,item)}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render() {


        return (
            <View style={[GlobalStyles.root_container]}>
                {
                    this.state.dataArray.length <= 0 ? <EmptyView/> :
                        <RefreshListView
                            data={ this.state.dataArray }
                            renderItem={ this.renderItem }
                            keyExtractor={ this.keyExtractor }
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.renderRefresh}
                            onFooterRefresh={this.requestNextPage}
                            footerNoMoreDataText={"NOT MORE CONTENT"}
                            footerRefreshingText={"loading"}
                        />
                }
            </View>
        )
    }
}

class FlowCell extends PureComponent {
    constructor(props){
        super(props)
        this.state= {

        }
    }

    render(){
        let {item} = this.props
        let time = moment(item.createAt).format("YYYY-MM-DD mm:ss")
        return (
            <View style={{backgroundColor: "white", marginTop:10,}}>
                <Homeheader title={'您的好友购买了商品，您获得了积分   +' + item.integral}/>
                <Text style={{marginLeft: 15, marginTop:10, marginBottom: 10, color: color.bigTitle}}>{time}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,
    }
})
