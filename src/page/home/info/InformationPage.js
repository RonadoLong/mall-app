
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,

} from 'react-native';

import {Toast} from 'antd-mobile-rn';
import NewsCell from './NewsCell';
import {getNewsCagetgory, getNewsListByCategory} from "../../../api/NewsApi";

import NavigatorUtil from "../../../commonuUtils/NavigatorUtil";
import GlobalStyles from '../../../widget/styles/GlobalStyles'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import color from "../../../widget/color";

export default class InformationPage extends PureComponent{

    constructor(props) {
        super(props)
        this.state = {
            newsNavList: [],
            themeColor: this.props.navigation.state.params.themeColor,
            title: this.props.navigation.state.params.title,
            tabShow: false,
        }
    }

    componentDidMount(){
        this.loadData()
        setTimeout(() => {
            this.setState({
                tabShow: true
            });
        }, 0)
    }

    loadData = async() => {
        Toast.loading("loading", 10)
        getNewsCagetgory()
            .then(res => {
                Toast.hide()
                if (res.code == 1000){
                    console.log(res)
                    this.setState({
                        newsNavList: res.data
                    })
                }
            })
    }

    render(){
        if (this.state.tabShow){
            return (
                <View style={GlobalStyles.root_container}>
                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar
                            style={{height: 40, borderWidth: 0, elevation: 2}}
                            tabStyle={{height: 39}}/>}
                        tabBarBackgroundColor={'white'}
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarActiveTextColor={color.smallLabel}
                        tabBarInactiveTextColor={color.smallLabel}>
                        {
                            this.state.newsNavList.map((nav, key) => {
                                return (
                                    <NewsTab
                                        tabLabel={nav.title}
                                        key={key}
                                        {...this.props}
                                    />
                                )
                            })
                        }
                    </ScrollableTabView>
                </View>
            )
        }else {
            return null
        }
    }
}

class NewsTab extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            pageNum: 1,
            title: this.props.tabLabel,
            newsList: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount(){
        this.renderRefresh()
    }

    getNewsLits = async() => {
        getNewsListByCategory(this.state.title, this.state.pageNum)
            .then(res => {
                if (res.code == 1000){
                    console.log(res)
                    if (this.state.pageNum > 1){
                        this.setState({
                            refreshState: RefreshState.Idle,
                            newsList: this.state.newsList.concat(res.data.content)
                        })
                    } else {
                        this.setState({
                            refreshState: RefreshState.Idle,
                            newsList: res.data.content
                        })
                    }
                }

                if (res.code === 1004){
                    this.setState({
                        refreshState: RefreshState.NoMoreData,
                        pageNum: this.state.pageNum -= 1,
                    })
                }

            }).catch (error => {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        })
    }

    // 下拉刷新
    renderRefresh = () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            pageNum: 1,
        })//开始刷新
        this.getNewsLits()
    };

    // 上拉加载更多
    requestNextPage = () => {
        this.setState({
            refreshState: RefreshState.FooterRefreshing,
            pageNum: this.state.pageNum += 1
        })
        this.getNewsLits()
    };

    onSelectCell(item){
        NavigatorUtil.goToInfoWebDetail({
            title: item.title,
            item: item,
            themeColor: this.props.navigation.state.params.themeColor,
            navigation: this.props.navigation
        })
    }

    renderItem = ({item}) =>{
        return(
            <NewsCell
                onSelect={this.onSelectCell.bind(this,item)}
                item={item}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index
    }

    render(){
        return (
            <RefreshListView
                data={ this.state.newsList }
                renderItem={ this.renderItem }
                keyExtractor={this.keyExtractor}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.renderRefresh}
                onFooterRefresh={this.requestNextPage}
            />
        )
    }

}

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: color.primary,
        height: 2,
    }
})
