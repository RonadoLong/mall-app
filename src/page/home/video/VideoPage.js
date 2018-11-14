
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';

import {Toast} from 'antd-mobile-rn';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {getVideoCagetgory, getVideoListByCategory} from "../../../api/VideoApi";
import NavigatorUtil from "../../../commonuUtils/NavigatorUtil";
import GlobalStyles from '../../../widget/styles/GlobalStyles'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import VidioCell from "./VidioCell";
import color from "../../../widget/color";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

type Props = { }
export default class VideoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            videoNavList: [],
            videoList: [],
            themeColor: this.props.navigation.state.params.themeColor,
            title: this.props.navigation.state.params.title,
            customThemeViewVisible: false,
            tabShow: false,
            videoPlayer: {},
        }
    }

    static navigationOptions = {
        tabBarVisible:true,
    }

    componentDidMount(){

        this.getVideoCategory()

        setTimeout(() => {
            this.setState({
                tabShow: true
            });
        }, 0)
    }

    componentWillUnmount(){
        Toast.hide()
    };

    getVideoCategory = async () =>{
        Toast.loading("loading", 3)
        getVideoCagetgory()
            .then(res => {
                Toast.hide()
                console.log(res)
                if (res.code == 1000){
                    console.log(res)
                    this.setState({
                        videoNavList: res.data
                    })
                }
            })
    }

    render(){

            let content =
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                          tabStyle={{height: 39}}/>}
                    tabBarBackgroundColor={'white'}
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarActiveTextColor={color.smallLabel}
                    tabBarInactiveTextColor={color.smallLabel}>
                    {
                        this.state.videoNavList.map((nav, key) => {
                            return (
                               <VideoTab
                                   tabLabel={nav.title}
                                   key={key}
                                   {...this.props}
                               />
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

class VideoTab extends Component{

    constructor(props){
        super(props)
        this.state = {
            pageNum: 1,
            title: this.props.tabLabel,
            videoList: [],
            numberOfSections: 0,
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.renderRefresh()
    }

   getVideoLits = async () =>{
        getVideoListByCategory(this.state.title, this.state.pageNum)
            .then(res => {
                if (res.code == 1000){
                    console.log(res)
                    if (this.state.pageNum > 1){
                        this.setState({
                            refreshState: RefreshState.Idle,
                            videoList: this.state.videoList.concat(res.data.content),
                            numberOfSections: this.state.videoList.length
                        })
                    } else {
                        this.setState({
                            refreshState: RefreshState.Idle,
                            videoList: res.data.content,
                            numberOfSections: res.data.content.length
                        })
                    }
                }

                if (res.code === 1004){
                    this.setState({
                        refreshState: RefreshState.NoMoreData,
                        pageNum: this.state.pageNum -= 1,
                    })
                }

            }).catch(error => {
                this.setState({
                    refreshState: RefreshState.Failure,
                })
        })
    }

    // 下拉刷新
    renderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing, pageNum: 1,})
        this.getVideoLits()
    };

    // 上拉加载更多
    requestNextPage = () => {
        this.setState({
            pageNum: this.state.pageNum += 1,
            refreshState: RefreshState.FooterRefreshing
        })
        this.getVideoLits()
    };

    onSelectCell = (item) => {
        console.log(item)
        NavigatorUtil.goToVideoDetail({
            url: item.content,
            navigation: this.props.navigation,
            themeColor: this.props.navigation.state.params.themeColor,
            video: item,
        })
    }


    renderItem = ({item}) =>{
        return(
            <VidioCell
                onSelect={this.onSelectCell.bind(this,item)}
                key={item.id}
                videoPlayer={this.videoPlayer}
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
                data={ this.state.videoList }
                renderItem={ this.renderItem }
                keyExtractor={ this.keyExtractor }
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
