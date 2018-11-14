import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import TopSelectView from '../view/TopSelectView';
import {getServiceRoomByHome} from '../../../api/ServiceApi';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import ServiceRoomCell from '../view/ServiceRoomCell';
import {Toast} from 'antd-mobile-rn'
import color from "../../../widget/color";
import EmptyView from "../../../component/EmptyView";

export default class ServiceClassDetailPage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            categoryId: this.props.navigation.state.params.categoryId,
            themeColor: color.primary,
            dataArray: [],
            refreshState: RefreshState.Idle,
            roomType: [],
            state: [this.props.navigation.state.params.address],
            pageSize: 10,
            pageNum: 1,
        }
    }

    componentDidMount() {
        let query = {
            category: this.state.categoryId
        }
        this.renderRefresh(query)
    }

    onRefresh = (params) => {
        // console.log("query ==== ", JSON.stringify(params))
        getServiceRoomByHome(params, this.state.pageNum, this.state.pageSize).then(res => {
            console.log(res)
            if (res.code === 1000) {
                this.setState({
                    dataArray: res.data.content,
                    refreshState: res.data.content.length === 10 ? RefreshState.Idle : RefreshState.NoMoreData
                })
            } else if (res.code === 1004) {
                Toast.info(res.msg, 2)
                this.setState({
                    refreshState: RefreshState.NoMoreData
                })
            } else {
                this.setState({
                    refreshState: RefreshState.Idle
                })
            }
        })
    }

    onMenuSelected = (i) => {
        console.log(i)
        if (i instanceof Array) {
            // console.log(i, "Array")
            if (i.length === 3) {
                let query = {
                    category: this.state.categoryId,
                    roomType: i,
                    state: this.state.state,
                }
                this.setState({pageNum: 1, roomType: i, query: query})
                this.renderRefresh(query)
            }

            if (i.length === 1) {
                let query = {
                    state: i,
                    category: this.state.categoryId,
                    roomType: this.state.roomType,
                }
                this.setState({pageNum: 1, query: query, state: this.state.state})
                this.renderRefresh(query)
            }
        }
    }
    // 下拉刷新
    renderRefresh = async (params) => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            pageNum: 1,
        })

        this.onRefresh(params)
    };

    // 上拉加载更多
    requestNextPage = async () => {
        this.setState({
            pageNum: this.state.pageNum += 1,
            refreshState: RefreshState.FooterRefreshing
        })
        this.onRefresh(this.state.query)
    };

    renderItem = ({item}) => {
        return (
            <ServiceRoomCell
                onSelect={()=>{
                    this.props.navigation.navigate("ServiceDetailPage", {
                        item: item
                    })
                }}
                item={item}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render() {
        return (
            <View style={color.root_container}>

                <TopSelectView
                    address={this.state.state}
                    middleTitle={"Filter"}
                    onMenuSelected={this.onMenuSelected}
                />

                {
                    this.state.dataArray.length > 0 ?
                        <RefreshListView
                            data={this.state.dataArray}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.renderRefresh}
                            onFooterRefresh={this.requestNextPage}
                        /> :
                        <EmptyView/>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containt: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    }
})
