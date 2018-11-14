import React,{Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import TopSelectView from '../view/TopSelectView';
import { getServiceRoomByHome } from '../../../api/ServiceApi';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import ServiceRoomCell from '../view/ServiceRoomCell';
import ServiceDetailUtils from '../ServiceDetailUtils';
import {Toast} from 'antd-mobile-rn'
import ServiceJobCell from "../view/ServiceJobCell";

type Props = {}

export default class FangChanDetailPage extends Component<Props>{

    constructor(props){
        super(props)

        console.log(this.props.navigation.state.params)
        this.state = {
            category: this.props.navigation.state.params.category,
            query: this.props.navigation.state.params.location,
            themeColor: this.props.navigation.state.params.themeColor,
            dataArray: [],
            refreshState: false,
            address: this.props.navigation.state.params.address,
            temQuery: this.props.navigation.state.params.location,
            roomType: [],
            state: '',
            pageSize: 10,
            pageNum: 1,
            type: this.props.navigation.state.params.type,
        }
    }

    componentDidMount(){
        this.renderRefresh(this.state.query)
    }

    onRefresh = async(params) => {
        console.log("query ==== ", JSON.stringify(params))
        getServiceRoomByHome(params, this.state.pageNum, this.state.pageSize).then(res => {
            console.log(res)
            if(res.code === 1000){
                this.setState({
                    dataArray: res.data.content,
                    refreshState: res.data.content.length === 10 ?  RefreshState.Idle : RefreshState.NoMoreData
                })
            }else if(res.code === 1004){
                Toast.info(res.msg, 2)
                this.setState({
                    refreshState: RefreshState.NoMoreData
                })
            }else {
                this.setState({
                    refreshState: RefreshState.Idle
                })
            }
        })
    }

    onMenuSelected = (i) => {
        console.log(i)
        if(i === 3){
            if (this.state.temQuery.longitude === 0){
                Toast.info("定位获取不到", 2)
                return
            }
            let query = {
                latitude: this.state.temQuery.latitude,
                longitude: this.state.temQuery.longitude,
                category: this.state.category,
                roomType: this.state.roomType,
                type: this.state.type
            }
            this.setState({pageNum:1, query: query})
            this.renderRefresh(query)
        }

        if (i instanceof Array){
            console.log(i, "Array")
            if (i.length ===  3){
                let query = {
                    latitude: this.state.temQuery.latitude,
                    longitude: this.state.temQuery.longitude,
                    category: this.state.category,
                    roomType: this.state.roomType,
                    type: this.state.type
                }
                this.setState({pageNum:1, roomType: i, query: query})
                this.renderRefresh(query)
            }

            if(i.length === 1){
                let query = {
                    state: i[0],
                    category: this.state.category,
                    roomType: this.state.roomType,
                    type: this.state.type
                }
                this.setState({pageNum:1, query: query})
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
            //开始刷新
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

        onSelect = (item) => {
            console.log(item)
            ServiceDetailUtils.gotoRoomDetailPage(
                item,
                this.state.themeColor,
                this.props.navigation
            )
        }

        onSelectJobCell = (item) => {
            console.log(item)
            ServiceDetailUtils.gotoJobDetailPage(
                item,
                this.state.themeColor,
                this.props.navigation
            )
        }

        renderItem = ({item}) =>{
            console.log(item)
            return(
                item.type === "room" ?
                    <ServiceRoomCell
                        onSelect={this.onSelect}
                        item={item}
                    /> :
                    <ServiceJobCell
                        onSelect={this.onSelectJobCell}
                        item={item}
                    />
            );
        };

        keyExtractor = (item: Object, index: number) => {
            return index
        }

    render(){
        return (
            <View style={styles.containt}>

                <TopSelectView
                    address={this.state.address}
                    middleTitle={"筛选"}
                    onMenuSelected={this.onMenuSelected}
                />

                <RefreshListView
                    data={ this.state.dataArray }
                    renderItem={ this.renderItem }
                    keyExtractor={ this.keyExtractor }
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.renderRefresh}
                    onFooterRefresh={this.requestNextPage}
                />

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
