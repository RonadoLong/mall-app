/**
 * Created by penn on 2016/12/21.
 */
import React, {Component, PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions
} from 'react-native'

import moment from 'moment';
import color from "../../../widget/color";
let imageW = (Dimensions.get('window').width-22)/3
let imageH = (Dimensions.get('window').width-22)*10/43

export default class NewsCell extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let item = Object.assign(this.props.item);
        let time = moment(item.createTime).format("YYYY-MM-DD")
        let url = Platform.OS === 'ios' ? item.thumbUrl.replace(".webp", ".jpg") : item.thumbUrl

        console.log(url)

        return (
            <TouchableOpacity
                style={styles.cell_container}
                onPress={this.props.onSelect}
                >
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={styles.listTitle}>{item.title}</Text>
                        <View style={{position: 'absolute', bottom: 0, left:0}}>
                            <Text style={styles.listMute}>{item.author} {time}</Text>
                        </View>
                    </View>

                    {
                        url !== "" ?  <Image
                            style={styles.listImg}
                            source={{uri: url,cache: 'force-cache'}}
                            onError={(err) => {
                                console.log("load image fail ===== " + err)
                            }
                            }
                        />: null
                    }
                </View>
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
        lineHeight:20,
        fontWeight: '400',
        marginBottom:30,
        letterSpacing: 0.8,
        fontSize:15,
        color:'#333'
    },
    listImg: {
        marginLeft:2,
        marginRight:2,
        width: imageW,
        height: imageH,
        backgroundColor: color.bodyColor,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: color.bodyColor
    },
    listMute: {
        fontSize:10,
        color:'#999',
        marginTop:10,
    }
})
