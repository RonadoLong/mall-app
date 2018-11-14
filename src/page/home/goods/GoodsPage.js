import React, {PureComponent}from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator, Image
} from 'react-native';

import {Toast} from 'antd-mobile-rn';
import GoodsCell from './GoodsCell';
import {getGoodsCagetgory, getGoodsListByCategoryId} from "../../../api/GoodsApi";
import NavigatorUtil from "../../../commonuUtils/NavigatorUtil";
import GlobalStyles from '../../../widget/styles/GlobalStyles'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import color from "../../../widget/color";
import EmptyView from "../../../component/EmptyView";



export default class GoodsPage extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            goodsNavList: [],
            themeColor: this.props.navigation.state.params.themeColor,
            title: this.props.navigation.state.params.title,
            tabShow: false,
        }

        this.loadData()
    }

        componentDidMount(){
            setTimeout(() => {
                this.setState({
                    tabShow: true
                });
            }, 0)
        }

    loadData = async() => {
            getGoodsCagetgory()
                .then(res => {
                    console.log(res)
                    if (res.code === 1000){
                        console.log(res)
                        this.setState({
                            goodsNavList: res.data
                        })
                    }
                }).catch(error => {
                Toast.offline("网络出错重试", 1)
            })
        }


    render(){

        let content =
            <ScrollableTabView
                renderTabBar={() =>
                    <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                        tabStyle={{height: 39}}/>}
                tabBarBackgroundColor={'white'}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                tabBarActiveTextColor={color.smallLabel}
                tabBarInactiveTextColor={color.smallLabel}>
                {
                    this.state.goodsNavList.map((nav, key) => {
                        return (
                            <GoodsTab tabLabel={nav.Title}
                                      classId={nav.ClassId}
                                      key={key} {...this.props}>{nav.Title}
                                      </GoodsTab>
                        )
                    })
                }
            </ScrollableTabView>

        if (this.state.tabShow){
            return (
                <View style={GlobalStyles.root_container}>
                    {content}
                </View>
            )
        }else {
            return null
        }
    }
}

class GoodsTab extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            pageNum: 1,
            classId: this.props.classId,
            goodsList: [],
            refreshState: RefreshState.Idle
        }
    }

    componentDidMount(){
        this.renderRefresh()
    }

    getGoodsList = async() => {
        getGoodsListByCategoryId(this.state.classId, this.state.pageNum)
            .then(res => {
                if (res.code === 1000){
                    if (this.state.pageNum > 1){
                        this.setState({
                            refreshState: RefreshState.Idle,
                            goodsList: this.state.goodsList.concat(res.data.content)
                        })
                    } else {
                        this.setState({
                            refreshState: RefreshState.Idle,
                            goodsList: res.data.content,
                        })
                    }
                }

                if (res.code === 1004){
                    this.setState({
                        refreshState: RefreshState.NoMoreData,
                        pageNum: this.state.pageNum -= 1,
                    })
                }
            })
    }

    // 下拉刷新
    renderRefresh = async () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            pageNum: 1,
        })//开始刷新
        this.getGoodsList()
    };


    // 上拉加载更多
    requestNextPage = async () => {
        this.setState({
            pageNum: this.state.pageNum += 1,
            refreshState: RefreshState.FooterRefreshing
        })
        this.getGoodsList()
    };

    onSelectCell(item){
        console.log(item.productId)
        NavigatorUtil.goToGoodsDetail({
            title: "商品详情",
            productId: item.productId,
            navigation: this.props.navigation,
            themeColor: this.state.themeColor
        })
    }

    renderItem = ({item}) =>{
        return(
            <GoodsCell
                item={item}
                onSelect={this.onSelectCell.bind(this,item)}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render(){
        return (
            <View style={GlobalStyles.root_container}>

                <RefreshListView
                    data={ this.state.goodsList }
                    renderItem={ this.renderItem }
                    keyExtractor={ this.keyExtractor }
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.renderRefresh}
                    onFooterRefresh={this.requestNextPage}
                    footerNoMoreDataText={"NOT MORE CONTENT"}
                    footerRefreshingText={"loading"}
                />

                {
                    this.state.goodsList.length > 0 ? null : <EmptyView/>
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
