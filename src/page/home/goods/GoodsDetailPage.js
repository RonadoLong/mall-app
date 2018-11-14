import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    DeviceEventEmitter
} from 'react-native';

import {getGoodsById} from "../../../api/GoodsApi";
import {Toast} from 'antd-mobile-rn';
import GlobalStyles from '../../../widget/styles/GlobalStyles'
import Swiper, {Slide} from 'react-native-swiper';
import NavigatorUtil from "../../../commonuUtils/NavigatorUtil";
import GoodsSkuSelectPage from './GoodsSkuSelectPage'
import color, {screenWidth} from "../../../widget/color";
import {saveCart} from "../../../api/ShopCartAPI";
import BannerCoursel from '../../../component/BannerCoursel';
import {AnimatedImage, Constants, Colors} from 'react-native-ui-lib';
import _ from 'lodash';
import {GetUserInfo} from "../../../api/UserApi";

export default class GoodsDetailPage extends Component {

    constructor(props) {
        super(props)

        console.log(this.props.navigation.state.params)
        this.state = {
            productId: this.props.navigation.state.params.productId,
            themeColor: this.props.navigation.state.params.themeColor,
            title: this.props.navigation.state.params.title,
            goods: {},
            bannsers: [],
            detailImages: [],
            imagesHArrays: [],
            customThemeViewVisible: false,
            showLogin: false
        }
    }

    componentDidMount() {
        this.subscriptionLogin = DeviceEventEmitter.addListener('loginSuccess', ()=>{
            this.setState({showLogin: false})
        });

        GetUserInfo().then(res =>{
            if (res.code === 1000){

            } else {
                this.setState({showLogin: true})
            }
            this.loadData();
        })
    }

    //不用了记得移除
    componentWillUnmount() {
        this.subscriptionLogin.remove()
    };

    renderCustomThemeView() {
        return (<GoodsSkuSelectPage
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={() => this.setState({customThemeViewVisible: false})}
        />)
    }

    loadData = async () => {
        Toast.loading(null, 10)
        getGoodsById(this.state.productId)
            .then(res => {
                Toast.hide();
                console.log(res);
                if (res.code === 1000) {
                    let detailImages = res.data.goodsDetail.split(",")
                    let imagesHArrays = []
                    detailImages.forEach(imageUri => {
                        Image.getSize(imageUri, (width, height) => {
                            //width 图片的宽度
                            //height 图片的高度
                            let myHeight = Math.floor(screenWidth / width * height);
                            imagesHArrays.push(myHeight)
                            this.setState({
                                imagesHArrays: imagesHArrays
                            })
                            console.log(imagesHArrays)

                        })
                    })

                    this.setState({
                        goods: res.data,
                        bannsers: res.data.goodsBanners.split(","),
                        detailImages: detailImages,
                    })

                    console.log(imagesHArrays)

                }
            }).catch(error => {
            console.log(error)
            Toast.hide()
            Toast.offline('Network connection failed !!!', 1);
        })
    }

    onBackPress(e) {
        this.props.navigation.goBack();
    }

    render() {

        console.log(this.state.detailImages)

        return (
            <View style={GlobalStyles.root_container}>

                <ScrollView>
                    <BannerCoursel
                        swiperH={screenWidth}
                        dataArray={this.state.bannsers}
                    />

                    <View style={styles.titleclass}>
                        <Text style={styles.title}>{this.state.goods.title}</Text>
                        <Text style={styles.sellpoint}>{this.state.goods.sellPoint}</Text>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
                            <Text style={styles.memberPrice}>
                                <Text style={{fontSize: 12, color: 'red'}}>$</Text>
                                {this.state.goods.memberPrice}
                            </Text>
                            <Text style={styles.price}>${this.state.goods.price}</Text>
                        </View>

                    </View>


                        <View style={{backgroundColor: 'white', marginTop: 10}}>

                            <View style={styles.centerArrow}>
                                <Text style={{
                                    marginRight: 10,
                                    marginBottom:4,
                                    fontSize: 15,
                                    color: '#444444',
                                    textAlign: 'center',
                                    height: 36,
                                    lineHeight: 36,
                                    width:screenWidth
                                }}>正品保障 - 优选商品 - 无忧售后</Text>
                            </View>

                            {/*<View style={styles.centerArrow}>*/}

                                {/*/!*<Text style={{*!/*/}
                                    {/*/!*marginBottom: 10,*!/*/}
                                    {/*/!*fontSize: 14,*!/*/}
                                    {/*/!*color: '#444444'*!/*/}
                                {/*/!*}}>规格: <Text style={{*!/*/}
                                            {/*/!*marginBottom: 10,*!/*/}
                                            {/*/!*fontSize: 14,*!/*/}
                                            {/*/!*color: color.pink*!/*/}
                                        {/*/!*}}>已选 "大包"</Text>*!/*/}
                                {/*/!*</Text>*!/*/}

                                {/*<Ionicons*/}
                                    {/*name={'ios-arrow-forward'}*/}
                                    {/*style={{*/}
                                        {/*position: 'absolute',*/}
                                        {/*right: 10,*/}
                                        {/*height: 20,*/}
                                        {/*width: 20,*/}
                                    {/*}}*/}
                                {/*/>*/}
                            {/*</View>*/}

                            <View style={styles.centerArrow}>
                                <Text style={{
                                    marginBottom: 10,
                                    fontSize: 14,
                                    color: color.normalTitle
                                }}>Buy Get Commission: <Text style={{marginBottom: 10, fontSize: 14, color: color.pink}}>{this.state.goods.commission}</Text>
                                </Text>
                            </View>

                            <View style={styles.centerArrow}>
                                <Text style={{
                                    marginBottom: 10,
                                    fontSize: 14,
                                    color: color.normalTitle
                                }}>Buy Get Integral: <Text style={{marginBottom: 10, fontSize: 14, color: color.pink}}>{this.state.goods.integral}</Text>
                                </Text>
                            </View>

                        </View>


                    <View style={styles.detailContent}>

                        <Text style={styles.content_title}>商品详情</Text>
                        <Text style={styles.content_desc}>{this.state.goods.goodsDesc}</Text>
                        {/*{*/}
                            {/*this.state.detailImages.map((imageUri, key) => {*/}
                                {/*return (*/}
                                    {/*<Image*/}
                                        {/*key={key}*/}
                                        {/*style={{width: screenWidth, height: 375}}*/}
                                        {/*source={{uri: imageUri}}*/}
                                        {/*onPress={() => console.log("Works!")}*/}
                                        {/*activeOpacity={0.7}*/}
                                    {/*/>*/}
                                {/*)*/}

                            {/*})*/}
                        {/*}*/}

                        {
                            _.map(this.state.detailImages, (imageUri, index) =>
                            <AnimatedImage
                                containerStyle={{backgroundColor: color.bodyColor, marginBottom: 2}}
                                imageStyle={{resizeMode: 'cover', height: this.state.imagesHArrays[index]}}
                                imageSource={{uri: imageUri}}
                                loader={<ActivityIndicator/>}
                                key={index}
                                animationDuration={index === 0 ? 300 : 800}
                            />)
                        }
                    </View>

                </ScrollView>

                {/*#底部*/}
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: screenWidth,
                    height: 44,
                    backgroundColor: 'white',
                    shadowOffset:{ width:2, height:2 }, shadowColor:'black', shadowOpacity:0.2, shadowRadius:1,
                }}>

                    <Text style={{
                        color: color.pink,
                        lineHeight: 44,
                        marginLeft: 30,
                    }}>实付: ${this.state.goods.memberPrice}</Text>

                    <Text style={styles.price}>{this.state.goods.price}</Text>


                    <TouchableOpacity style={{position: 'absolute', right: 130,
                        height: 44, width: 80, backgroundColor: color.pink,
                    }} onPress={this.goToCart}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 44
                        }}>Buy Now</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{position: 'absolute', right: 0,
                        height: 44, width: 130, backgroundColor: color.primary,
                    }} onPress={this.joinToCart.bind(this)}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 44
                        }}>Add To Cart</Text>

                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    goToCart = () => {
        NavigatorUtil.goToCart(this.props.navigation)
    }

    joinToCart(){

        if (this.state.showLogin){
            this.props.navigation.navigate("LoginPage")
            return
        }

        const goods = this.state.goods;
        let params = {
            "goodsCount": 1,
            "productId": goods.productId,
        }

        Toast.loading("loading", 10);
        saveCart(params)
            .then(res => {
                Toast.hide()
                if (res.code === 1000){
                    DeviceEventEmitter.emit("AddCart")
                    Toast.success("summit success", 1)
                }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleclass: {
        backgroundColor: 'white',
        marginTop: 8,
    },
    content_title: {
        fontSize: 17,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 20,
        color: color.normalTitle,
        fontWeight: '800'
    },
    content_desc: {
        fontSize: 14,
        fontWeight: '200',
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 10,
        color: color.normalTitle,
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        color: color.normalTitle,
        fontWeight: '600'
    },
    sellpoint: {
        fontSize: 12,
        marginTop: 10,
        marginLeft: 10,
        color: color.normalTitle,
        fontWeight: '200',
    },
    memberPrice: {
        fontSize: 18,
        marginLeft: 10,
        color: color.pink,
        marginTop: -10,
        fontWeight: '600'
    },
    price: {
        fontSize: 10,
        marginLeft: 10,
        color: color.normalTitle,
        marginBottom: 8,
        textDecorationLine: 'line-through',
    },
    someButtonStyle: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 25,
        bottom: 10,
    },
    detailContent: {
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 50,
    },
    centerArrow: {
        width: screenWidth,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.5
    }
})
