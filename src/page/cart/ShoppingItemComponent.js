import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import color from "../../widget/color";

export default class ShoppingItemComponent extends PureComponent {

    // static propTypes = {
    //     itemData : PropTypes.object.isRequired,
    //     money : PropTypes.func,
    // };

    static defaultProps = {
        price : () => null,
    };

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('allSelect', (isSelAll) => {
            this.props.itemData.isSelect = isSelAll;
            this.setState({ checkStatus : isSelAll });
            if (isSelAll) {
                this.setPrice(this.state.price * this.state.goodsCount);
            }
        })
    };

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    };

    constructor(props) {
        super(props);
        this.state = {
            checkStatus : this.props.itemData.checkStatus,
            goodsCount : this.props.itemData.goodsCount,
            price : this.props.itemData.price,
            goodsTitle : this.props.itemData.goodsTitle,
            sellPoint : this.props.itemData.sellPoint,
            goodsImages : this.props.itemData.goodsImages,
        }
    };

    itemSelect = () => {
        this.setState({checkStatus: !this.state.checkStatus})
        this.props.updateCheckStatus && this.props.updateCheckStatus(this.props.itemData)
    };

    itemIncrease = (i) => {

        this.state.goodsCount ++
        this.setState({goodsCount:this.state.goodsCount})
        this.setState({checkStatus : true})

        this.props.itemIncrease && this.props.itemIncrease(this.props.itemData)
    };

    itemReduce = (i) => {
        if (this.state.goodsCount > 1){
            this.state.goodsCount --
            this.setState({checkStatus : true})
            this.setState({goodsCount:this.state.goodsCount})
        }
        this.props.itemReduce && this.props.itemReduce(this.props.itemData)
    };

    setPrice = (price) => {

    };

    render() {
        let { itemData } = this.props;
        // console.log(itemData)

        return (
            <TouchableOpacity style={ styles.container } onPress={this.props.goGoodsDetail}>
                <TouchableOpacity
                    style={{ marginLeft : 10 }}
                    onPress={() => this.itemSelect()}>
                    <Image source={this.state.checkStatus === true ?
                        require('../../res/cart/login_radio_selected.png') : require('../../res/cart/login_radio_normall.png')}/>
                </TouchableOpacity>
                <Image style={ styles.icon } source={{ uri :this.state.goodsImages }}/>
                <View style={ styles.right }>
                    <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ this.state.goodsTitle }</Text>
                    <Text style={ styles.descriptionStyle } numberOfLines={1}>{ this.state.sellPoint }</Text>
                    <View style={ styles.right_bot}>
                        < Text style={ styles.moneyStyle }>${ this.state.price }</Text>
                        <View style={ styles.numControllStyle }>

                            <TouchableOpacity style={  styles.reduceStyle }
                                              onPress={() => this.itemReduce(this.state.goodsCount)}>
                                <Text style={{ color : this.state.goodsCount <= 1 ? 'red' : 'black' } }>-</Text>
                            </TouchableOpacity>
                            <View style={ styles.numberViewStyle }>
                                <Text style={ styles.numberStyle }>{ this.state.goodsCount }</Text>
                            </View>
                            <TouchableOpacity style={  styles.increaseStyle }
                                              onPress={() => this.itemIncrease(this.state.goodsCount)}>
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        marginBottom: 8,
    },
    icon : {
        height : 80,
        width : 80,
        marginTop : 10,
        marginBottom : 10,
        marginLeft : 15,
        borderWidth : 1,
        borderColor : color.bodyColor
    },
    right : {
        marginLeft : 15,
        flex : 1,
        marginTop : 10,
        marginBottom : 10,
    },
    nameStyle : {
        fontSize : 14,
        color : color.normalTitle
    },
    descriptionStyle : {
        marginTop : 3,
        fontSize : 13,
        color : '#A9A9A9'
    },
    right_bot : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 10,
        alignItems : 'center',
    },
    moneyStyle : {
        fontSize : 13,
        color : 'red'
    },
    numControllStyle : {
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : '#e9e9e9',
        marginRight : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    reduceStyle : {
        height : 30,
        width : 30,
        alignItems : 'center',
        justifyContent : 'center',
        borderRightWidth : 1,
        borderColor : '#e9e9e9',
    },
    numberViewStyle : {
        height : 30,
        width : 60,
        alignItems : 'center',
        justifyContent : 'center',
    },
    numberStyle : {
        fontSize : 15,
    },
    increaseStyle : {
        height : 30,
        width : 30,
        alignItems : 'center',
        justifyContent : 'center',
        borderLeftWidth : 1,
        borderColor : '#e9e9e9',
    },
});
