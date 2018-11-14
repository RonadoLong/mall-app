import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter, Image} from 'react-native'
import color from "../../../widget/color";
import GlobalStyles from "../../../widget/styles/GlobalStyles"
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {getOrderList} from '../../../api/OrderAPi'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import OrderInfoCell from '../view/OrderInfoCell';
import EmptyView from "../../../component/EmptyView";
import {Toast} from 'antd-mobile-rn'

export default class MineOrderInfoPage extends PureComponent {

    constructor(Props) {
        super(Props)
        this.state = {
            userInfo: this.props.navigation.state.params.userInfo,
            index: this.props.navigation.state.params.index,
            dataList: [
                "全部订单",
                "等待支付",
                "等待发货",
                "已发货",
            ]
        }
    }

    render() {
        return (
            <View style={[GlobalStyles.root_container, {alignItems: "center"}]}>

                <ScrollableTabView
                    initialPage={this.state.index}
                    renderTabBar={() =>
                        <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                          tabStyle={{height: 39}}/>}
                    tabBarBackgroundColor={"white"}
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarActiveTextColor={color.primary}
                    tabBarInactiveTextColor={color.smallLabel}>
                    {
                        this.state.dataList.map((nav, key) => {
                            return (
                                <OrderInfo
                                    index={key}
                                    tabLabel={nav}
                                    key={key} {...this.props}>{nav}
                                </OrderInfo>
                            )
                        })
                    }
                </ScrollableTabView>

            </View>
        )
    }
}

class OrderInfo extends PureComponent {
    constructor(props) {
        super(props)
        console.log(this.props.index)
        this.state = {
            query: {
                pageNum: 1,
                pageSize: 5,
                dataType: this.props.index
            },
            dataList: [],
            refreshState: RefreshState.Idle
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        Toast.loading(null, 10)
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        getOrderList(this.state.query).then(res => {
            Toast.hide()
            this.setState({refreshState: RefreshState.Idle})
            console.log(res)
            if (res.code === 1000) {
                this.setState({
                    dataList: res.data.content,
                    refreshState: RefreshState.Idle
                })
            } else {
                this.setState({
                    refreshState: RefreshState.EmptyData
                })
            }
        })
    }

    async loadMoreData() {
        getOrderList(this.state.query).then(res => {
            console.log("loadMoreData = ", res)
            if (res.code === 1000) {
                let list = res.data.content
                if (list.length > 0 ) {
                    this.setState({refreshState: RefreshState.Idle, dataList: this.state.dataList.concat(...list)})
                    console.log("loadMoreData = ", this.state.dataList)
                } else {
                    console.log("loadMoreData = ", 3)
                    this.setState({refreshState: RefreshState.NoMoreData})
                }
            } else {
                this.setState({refreshState: RefreshState.Failure,})
            }
        })
    }

    // 下拉刷新
    renderRefresh = async () => {
        let query = this.state.query;
        query.pageNum = 1;
        this.setState({
            query: query,
            refreshState: RefreshState.HeaderRefreshing,
        })
        this.loadData()
    };

    // 上拉加载更多
    requestNextPage = async () => {
        let query = this.state.query;
        query.pageNum += 1;
        this.setState({
            query: query,
            refreshState: RefreshState.FooterRefreshing
        })
        this.loadMoreData()
    };

    onSelectCell(item) {
        console.log(item)
    }

    renderItem = ({item}) => {
        return (
            <OrderInfoCell item={item} onSelect={this.onSelectCell.bind(this, item)}/>
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render() {
        return (
            <View style={color.root_container}>
                {
                    this.state.dataList.length > 0 ?
                        <RefreshListView
                            data={this.state.dataList}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.renderRefresh}
                            onFooterRefresh={this.requestNextPage}
                            footerEmptyDataText={"NOT MORE DATA"}
                        /> : <EmptyView/>
                }
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
