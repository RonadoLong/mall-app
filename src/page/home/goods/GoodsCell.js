/**
 * Created by penn on 2016/12/21.
 */
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions
} from 'react-native'

import color from "../../../widget/color";
export default class GoodsCell extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let item = this.props.item;

        return (
            <TouchableOpacity
                style={styles.cell_container}
                onPress={this.props.onSelect}
                >
                <Image
                    resizeMode='contain'
                    style={styles.listImg}
                    source={{uri: item.goodsImages}}
                />

                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listTitledesc}>{item.sellPoint}</Text>

                <View style={{flexDirection: 'row',position: 'absolute', bottom: 10, left:10}}>
                    <Text style={styles.memberPrice}>
                        ${item.memberPrice}
                    </Text>

                    <Text style={styles.price}>
                        ${item.price}
                    </Text>
                </View>

                {/*<Button style={styles.someButtonStyle} type="warning" size="small" inline>马上购买</Button>*/}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        // marginVertical: 3,
        marginBottom:3,

        borderColor: '#eeeeee',
        borderWidth: 0.5,
        borderRadius: 2,
        // shadowColor: '#ccc',
        // shadowOffset: {width:0.5, height: 0.5},
        // shadowOpacity: 0.4,
        // shadowRadius: 1,
        elevation:2
    },
    listTitle: {
        marginTop: 10,
        lineHeight:20,
        letterSpacing: 0.8,
        fontSize:15,
        color: color.bigTitle,
    },
    listTitledesc: {
        marginTop: 8,
        lineHeight:20,
        fontWeight: '400',
        marginBottom:20,
        letterSpacing: 0.8,
        fontSize:12,
        color: color.normalTitle,
    },
    listImg: {
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    listMute: {
        fontSize:15,
        color:'#999',
    },
    memberPrice: {
        fontSize:17,
        color: color.pink,
        marginRight: 10,
        lineHeight:20,
    },
    price: {
        lineHeight:20,
        marginRight: 10,
        fontSize:13,
        color: color.smallLabel,
        textDecorationLine: 'line-through'
    },
    soldCount: {
        lineHeight:20,
        marginRight: 10,
        fontSize:13,
        color:'#999',
    },
    someButtonStyle: {
        width: 60,
        height: 25,
        position:'absolute',
        right: 15,
        bottom: 10,
    }
})
