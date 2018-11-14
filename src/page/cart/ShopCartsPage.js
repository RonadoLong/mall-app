import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, TouchableOpacity, Image, DeviceEventEmitter} from 'react-native'
import {getCartList} from "../../api/ShopCartAPI";
import GlobalStyles from '../../widget/styles/GlobalStyles'
import color from "../../widget/color";
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import ShoppingItemComponent from "./ShoppingItemComponent";
import {Toast} from "antd-mobile-rn";
import NavigatorUtil from "../../commonuUtils/NavigatorUtil";
import {GetUserInfo} from "../../api/UserApi";
import EmptyView from "../../component/EmptyView";

var total = 0;
type Props = {}

export default class ShopCartsPage extends PureComponent<Props> {

    constructor(Props) {
        super(Props)

        this.state = {
            allSelect: false,
            totalMoney: 0,
            dataArray: [],
            refreshState: RefreshState.Idle,
            showTemp: false,
        }

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({showUI: true})
        this.getUser()

        //监第二个参数是函数，
        this.subscription = DeviceEventEmitter.addListener('loginOut', this.loginOut.bind(this));
        this.subscriptionLogin = DeviceEventEmitter.addListener('loginSuccess', this.getUser.bind(this));
        this.suborder = DeviceEventEmitter.addListener('AddCart', ()=>{
            this.loadData()
        });

    };

    //不用了记得移除
    componentWillUnmount() {
        this.subscription.remove();
        this.subscriptionLogin.remove()
        this.suborder.remove()
    };

    loginOut() {
        //这里就可以做一些事情啦
        this.setState({dataArray: []})
    }

     getUser(){
       GetUserInfo().then(res =>{
           console.log(res)
           if (res.code === 1000){
               this.setState({userInfo: res.data})
               this.renderRefresh();
           }
       })
    }

    loadData = async () => {
        Toast.loading(null, 10)
        getCartList().then(res => {
            Toast.hide()
            if (res.code === 1000) {
                let total = 0;
                var index = 0;
                res.data.content.forEach((item, i) => {
                    if (item.checkStatus === true) {
                        index++;
                        total += item.price * item.goodsCount
                    }
                })
                let all = res.data.total === index
                this.setState({
                    dataArray: res.data.content,
                    totalMoney: total,
                    allSelect: all,
                    showTemp: true,
                })
            }else{
                this.setState({
                    dataArray: [],
                    totalMoney: 0,
                    allSelect: false,
                })
            }
            this.setState({
                refreshState: RefreshState.Idle,
                showTemp: true,
            })
        })
    }

    // 下拉刷新
    renderRefresh = async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing, pageNum: 1,})
        this.loadData()
    };

    onSelectCell(item) {
        console.log(item.productId)
        NavigatorUtil.goToGoodsDetail({
            title: "Detail",
            productId: item.productId,
            navigation: this.props.navigation,
            themeColor: this.state.themeColor
        })
    }

    renderItem = ({item}) => {
        return (
            <ShoppingItemComponent
                itemData={item}
                goGoodsDetail={this.onSelectCell.bind(this, item)}
                updateCheckStatus={(val) => {
                    let total = 0;
                    var index = 0;

                    let tempData = []
                    this.state.dataArray.forEach(data => {
                        if (val.id === data.id) {
                            data.checkStatus = !data.checkStatus
                        }
                        if (data.checkStatus) {
                            total += data.price * data.goodsCount
                            index++
                        }
                        tempData. push(data)
                    })

                    console.log("updateCheckStatus", val)
                    console.log("updateCheckStatus",tempData, total, index)

                    this.setState({
                        dataArray: tempData,
                        totalMoney: total,
                        allSelect: tempData.length === index
                    })

                }}

                itemIncrease={(val) => {
                    let total = 0;
                    var index = 0;

                    this.state.dataArray.forEach(data => {
                        if (val.id === data.id) {
                            data.goodsCount = data.goodsCount + 1
                            data.checkStatus = true
                        }

                        if (data.checkStatus) {
                            total += data.price * data.goodsCount
                            index++
                        }
                    })

                    this.setState({
                        dataArray: this.state.dataArray,
                        totalMoney: total,
                        allSelect: this.state.dataArray.length === index
                    })
                }}

                itemReduce={(val) => {
                    let total = 0;
                    var index = 0;
                    this.state.dataArray.forEach(data => {
                        if (val.id === data.id) {
                            if (data.goodsCount <= 1) {
                                Toast.fail("error operation", 1)
                            } else {
                                data.goodsCount = data.goodsCount - 1
                                data.checkStatus = true
                            }

                            if (data.checkStatus) {
                                total += data.price * data.goodsCount
                                index++
                            }
                        }
                    })
                    this.setState({
                        dataArray: this.state.dataArray,
                        totalMoney: total,
                        allSelect: this.state.dataArray.length === index
                    })
                }}
            />
        );
    };

    keyExtractor = (item: Object, index: number) => {
        return index + ''
    }


    allSelect = () => {

        DeviceEventEmitter.emit("allSelect", !this.state.allSelect)

        if(this.state.allSelect){
            this.setState({
                totalMoney: 0,
                allSelect: !this.state.allSelect,
            })

        } else {
            let total = 0;
            this.state.dataArray.forEach((item, i) => {
                total += item.price * item.goodsCount
            })

            this.setState({
                totalMoney: total,
                allSelect: !this.state.allSelect,
            })
        }

    };

    render() {


        let bottomView =
            this.state.dataArray.length > 0 && this.state.userInfo != null ?
                <View style={styles.tool}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.select} onPress={this.allSelect}>
                            <Image source={this.state.allSelect ?
                                require('../../res/cart/login_radio_selected.png') :
                                require('../../res/cart/login_radio_normall.png')}/>
                            <Text style={{marginLeft: 6, color: color.normalTitle,}}>Select All</Text>
                        </TouchableOpacity>
                        <Text style={styles.allMoneyText}>
                            Total: $
                            <Text style={{color: color.pink, fontSize: 15}}>
                                {this.state.totalMoney}
                            </Text>
                        </Text>
                        {/*<Text style={styles.allMoneyText}>*/}
                        {/*免运费*/}
                        {/*</Text>*/}
                    </View>
                    <TouchableOpacity style={styles.balance} onPress={this.downOrder.bind(this)}>
                        <Text style={styles.balanceText}>BUY</Text>
                    </TouchableOpacity>
                </View> : null

        return (
            <View style={GlobalStyles.root_container}>
                {
                    this.state.dataArray.length > 0 ?
                        <RefreshListView
                            data={this.state.dataArray}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.renderRefresh}
                            onFooterRefresh={this.requestNextPage}
                        />
                        :
                        <EmptyView/>
                }
                {bottomView}
            </View>
        )
    }

    downOrder() {

        console.log(this.state.dataArray)
        let selectList = []
        if (this.state.allSelect) {
            selectList = this.state.dataArray
        } else {
            this.state.dataArray.forEach(item => {
                if (item.checkStatus) {
                    selectList.push(item)
                }
            })
        }

        if (selectList.length === 0) {
            Toast.fail("please select", 2)
            return
        }

        this.props.navigation.navigate("OrderConfirmationPage", {
            title: "OrderConfirmation",
            productList: selectList,
            totalMoney: this.state.totalMoney
        })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tool: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: color.bodyColor,
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "white"
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    balance: {
        width: 120,
        height: 44,
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    allMoneyText: {
        color: color.normalTitle,
        fontSize: 13,
        marginLeft: 13
    },
    balanceText: {
        fontSize: 17,
        color: 'white'
    },

});
