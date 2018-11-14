import React, {Component, PureComponent} from 'react';
import {StyleSheet, View, ScrollView, Platform,RefreshControl} from 'react-native';
import {Toast, WhiteSpace, Carousel, WingBlank} from 'antd-mobile-rn';
import NewsCell from './info/NewsCell';
import GoodsCell from './goods/GoodsCell';
import Homeheader from '../../component/Homeheader';
import GlobalStyles from '../../widget/styles/GlobalStyles'
import {getHomeHeaders, getHomeList} from "../../api/HomeApi";
import NavigatorUtil from "../../commonuUtils/NavigatorUtil";
import color, {screenWidth,isSystemIOS, statusBarHeight} from '../../widget/color'
import HomeMenuView from "../../component/HomeMenuView";
import device from "../../commonuUtils/DeviceInfo";
import StorageUtil from "../../commonuUtils/StorageUtils";
import KeyUtils from "../../commonuUtils/KeyUtils";
import ImageSwiper from '../../component/ImageSwiper';
import {getNewsListByHome} from "../../api/NewsApi";
import {getGoodsListByHome} from "../../api/GoodsApi";
import {getVideoListByHome} from "../../api/VideoApi";
import VidioCell from "./video/VidioCell";

//全局变量
var SwiperH = screenWidth / 16 * 9

export default class HomePage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            homeNavList: [],
            homeCarouselList: [],
            customThemeViewVisible: false,
            imgHeight: 200,
            show: false,
            count: 0,
            themeColor: color.primary,
            isRefreshing: false,
            HomeNewsList: [],
            HomeVideoList: [],
            HomeGoodsList: [],
            pageNum: 1,
        }
    }

    componentWillMount() {
        this.setState({show: true});
    }

    componentDidMount() {
        console.log(JSON.stringify(device))
        this.getHomeHeadersList();
        this.loadData()
    }

    loadData() {

        getNewsListByHome(this.state.pageNum).then(res => {
            if (res.code === 1000) {
                this.setState({HomeNewsList: res.data.content})
                StorageUtil.set(KeyUtils.NEWS_TOKEN, res.data.content, null, null)
            }
        }).catch(error => {
            Toast.hide();
            console.log("getNewsListByHome")
            StorageUtil.get(KeyUtils.NEWS_TOKEN, null).then(res => {
                console.log(res)
                this.setState({HomeNewsList: res})
            })
        })

        getGoodsListByHome(this.state.pageNum).then(res => {
            console.log("goods ==", res)
            if (res.code === 1000) {
                this.setState({HomeGoodsList: res.data.content})
                StorageUtil.set(KeyUtils.GOODS_KEY, res.data.content, null, null)
            }
        }).catch(error => {
            Toast.hide();
            console.log("getGoodsListByHome")
            StorageUtil.get(KeyUtils.GOODS_KEY, null).then(res => {
                console.log(res)
                this.setState({HomeGoodsList: res})
            })
        })

        getVideoListByHome(this.state.pageNum).then(res => {
            if (res.code === 1000) {
                this.setState({HomeVideoList: res.data.content})
                StorageUtil.set(KeyUtils.VIDEO_KEY, res.data.content, null, null)
            }
        }).catch(error => {
            Toast.hide();
            console.log("getVideoListByHome")
            StorageUtil.get(KeyUtils.VIDEO_KEY, null).then(res => {
                console.log(res)
                this.setState({HomeVideoList: res})
            })
        })

    }

    getHomeHeadersList = async () => {
        this.setState({isRefreshing: true})
        getHomeHeaders().then(res => {
            this.setState({
                homeNavList: res.data.homeNavList,
                homeCarouselList: res.data.homeCarouselList,
                isRefreshing: false
            });

            let HomeList = {
                homeNavList: res.data.homeNavList,
                homeCarouselList: res.data.homeCarouselList,
            }
            StorageUtil.set(KeyUtils.HOME_KEY, HomeList, null, null)

        }).catch(error => {
            StorageUtil.get(KeyUtils.HOME_KEY, null).then(res => {
                console.log(res)
                this.setState({
                    homeNavList: res.homeNavList,
                    homeCarouselList: res.homeCarouselList,
                    isRefreshing: false
                });
            })
        })
    };

    tapSwiper = (index) => {
        let item = this.state.homeCarouselList[index];
        console.log(item)
        NavigatorUtil.goToWebDetail({
            navigation: this.props.navigation,
            url: item.url,
        })
    };

    onMenuSelected = (i) => {
        let item = this.state.homeNavList[i];
        NavigatorUtil.goToMenuDetail(item, this.props)
    };

    render() {
        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView = <View style={[{backgroundColor: color.primary}, {height: statusBarHeight}]}/>;
        }

        let videoList =
            this.state.HomeVideoList.map((Video, key) => {
                return (
                    <VidioCell
                        onSelect={(item)=>{
                            NavigatorUtil.goToVideoDetail({
                                url: item.content,
                                navigation: this.props.navigation,
                                themeColor: color.primary,
                                video: item,
                            })
                        }}
                        key={key}
                        videoPlayer='videoPlayer'
                        item={Video}
                    />
                )
            })

        let newsList =
            this.state.HomeNewsList.map((news, key) => {
                return (
                    <NewsCell
                        key={key}
                        item={news}
                        onSelect={() => {
                            NavigatorUtil.goToInfoWebDetail({
                                title: news.title,
                                item: news,
                                navigation: this.props.navigation
                            })
                        }}>
                    </NewsCell>
                )
            });

        let goodsList =
            this.state.HomeGoodsList.map((goods, key) => {
                return (
                    <GoodsCell
                        key={key}
                        item={goods}
                        onSelect={() => {
                            console.log(goods.goodsId)
                            NavigatorUtil.goToGoodsDetail({
                                productId: goods.productId,
                                navigation: this.props.navigation,
                                themeColor: this.state.themeColor
                            })
                        }}>

                    </GoodsCell>
                )
            });

        return (
            this.state.show ?
                <View style={GlobalStyles.root_container}>
                    {statusBarView}
                    <ScrollView style={GlobalStyles.root_container}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.getHomeHeadersList}
                                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                                        progressBackgroundColor="#ffffff"
                                     />
                                }>
                        <ImageSwiper
                            banner={this.state.homeCarouselList}
                            tapSwiper={(i)=>{
                                this.tapSwiper(i)
                            }}/>
                        <HomeMenuView
                            menuInfos={this.state.homeNavList}
                            onMenuSelected={this.onMenuSelected}
                            themeColor={this.state.themeColor}
                        />
                        <View style={{marginTop: 1}}>
                            <Homeheader title="Recommend Videos"/>
                            {
                                videoList
                            }
                            <Homeheader title="Recommend News"/>
                            {
                                newsList
                            }
                            <Homeheader title="Recommend Products"/>
                            {
                                goodsList
                            }
                        </View>

                    </ScrollView>
                </View> : null
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
