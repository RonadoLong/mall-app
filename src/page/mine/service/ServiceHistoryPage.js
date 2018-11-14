'use strict'
import React, {PureComponent} from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'

import ServiceRoomCell from "../../service/view/ServiceRoomCell";
import RefreshListView, {RefreshState} from "react-native-refresh-list-view";
import {GetSelfService} from "../../../api/ServiceApi";
import {Toast} from 'antd-mobile-rn'
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import color from "../../../widget/color";

export default class ServiceHistoryPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            titles: ["Normal", "Pending"],
        }
    }

    render() {

        let content =
            <ScrollableTabView
                renderTabBar={() =>
                    <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                      tabStyle={{height: 39}}/>}
                initialPage={1}
                tabBarBackgroundColor={"white"}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                tabBarActiveTextColor={color.primary}
                tabBarInactiveTextColor={color.smallLabel}>
                {
                    this.state.titles.map((nav, key) => {
                        console.log(key)
                        return (
                            <ServiceHistory
                                tabLabel={nav}
                                key={key + ''}
                                {...this.props}
                            />
                        )
                    })
                }
            </ScrollableTabView>

        return (
            <View style={{flex: 1}}>
                {content}
            </View>
        )
    }
}

class ServiceHistory extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            dataArray: [],
            pageNum: 1,
            status: this.props.tabLabel == "Normal" ? 6 : 1,
            refreshState: RefreshState.Idle,
            showUI: false,
        }

    }

    componentDidMount() {
        this.loadData()
    }

    // 下拉刷新
    renderRefresh = async () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            pageNum: 1,
        })//开始刷新
    };

    loadData() {
        Toast.loading(null, 10)
        GetSelfService(this.state.status, this.state.pageNum).then(res => {
            Toast.hide()
            console.log(res.data)
            if (res.code === 1000) {
                let data = res.data.content;
                this.setState({
                    dataArray: data,
                    refreshState: data.length === 10 ? RefreshState.Idle : RefreshState.NoMoreData
                })
            } else {
                this.setState({
                    refreshState: RefreshState.NoMoreData
                })
            }
            this.setState({showUI: true})

        })
    }

    // 上拉加载更多
    requestNextPage = async () => {
        this.setState({
            pageNum: this.state.pageNum += 1,
            refreshState: RefreshState.FooterRefreshing
        })
    };

    onSelectCell(item) {
        this.props.navigation.navigate("ServiceDetailPage", {
            item: item
        })
    }

    renderItem = ({item}) => {
        return (
            <ServiceRoomCell
                item={item}
                onSelect={this.onSelectCell.bind(this)}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render() {
        return (
            this.state.showUI ?
                <RefreshListView
                    data={this.state.dataArray}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.renderRefresh}
                    onFooterRefresh={this.requestNextPage}
                    footerNoMoreDataText={"Not More Content"}
                /> : null
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,
    }
})
