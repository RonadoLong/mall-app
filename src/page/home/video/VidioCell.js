/**
 * Created by penn on 2016/12/21.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions, DeviceEventEmitter
} from 'react-native'

import VideoPlayer, {defaultVideoHeight, isSystemIOS, screenHeight,screenWidth} from "./VideoPlayer";

import { Avatar } from 'react-native-elements';
var {width, height} = Dimensions.get('window');
var videoH = width * 9/16;

export default class VidioCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoH: videoH,
            videoW: screenWidth
        };
    }


    render() {

        let {item, onSelect} = this.props;
        return (
            <TouchableOpacity
                style={styles.cell_container}
                onPress={()=>{onSelect && onSelect(item)}}>
                <View style={styles.cell_container} >

                    <VideoPlayer
                        enableSwitchScreen={false}
                        videoCover={item.thumbUrl}
                        ref={(ref) => this.videoPlayer = ref}
                        style={{width: screenWidth, height: videoH}}
                        videoUrl={item.content}
                    />

                    <Text style={styles.listTitle}>{item.title}</Text>

                    <View style={styles.bottomView}>
                        <Avatar
                            width={20}
                            rounded
                            source={{uri: item.avatar}}
                            activeOpacity={0.7}
                        />

                        <Text style={styles.author}>
                           {item.author}
                        </Text>

                        <Text style={styles.price}>
                            {item.readCount}
                        </Text>

                    </View>
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
        width: screenWidth,
        height: videoH + 70,
        backgroundColor: 'white',
        // marginVertical: 3,
        marginBottom:3,
        borderColor: '#eeeeee',
        borderWidth: 0.5,
        borderRadius: 2,
        elevation:2,
        paddingBottom:10,
    },
    listTitle: {
        marginTop: 10,
        marginLeft: 10,
        lineHeight:20,
        marginBottom: 10,
        fontWeight: '500',
        letterSpacing: 0.8,
        fontSize:('ios' == Platform.OS)? 15: 15,
        color:('ios' == Platform.OS)? '#333': '#555',
    },
    listTitledesc: {
        marginTop: 8,
        lineHeight:20,
        fontWeight: '400',
        marginBottom:20,
        letterSpacing: 0.8,
        fontSize:('ios' == Platform.OS)? 12: 12,
        color:('ios' == Platform.OS)? '#555': '#555',
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
    author: {
        fontSize:12,
        color:'#999',
        marginRight: 10,
        marginLeft: 8,
        lineHeight:20,
    },
    price: {
        lineHeight:20,
        marginRight: 10,
        fontSize:12,
        color:'#999',
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
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    bottomView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10,
    }
})
