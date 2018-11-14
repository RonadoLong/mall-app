import React from 'react';
import {View, ScrollView, Text, Image, BackHandler, Dimensions} from 'react-native';
import VideoPlayer from "./VideoPlayer";
import {lockToLandscapeRight, lockToPortrait,unlockAllOrientations} from "react-native-orientation";
import {videoList, styles} from "./VideoListScreen";
import {Avatar,Button,SocialIcon} from 'react-native-elements'
import color,{defaultVideoHeight, isSystemIOS, statusBarHeight} from "../../../widget/color";
import ShareUtils from "../../../commonuUtils/ShareUtils";
var {width, height} = Dimensions.get('window');

export default class VideoPlayScreen extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.navigation.state.params.video.content)
        this.state = {
            isFullScreen: false,
            video: this.props.navigation.state.params.video,
            currentUrl: this.props.navigation.state.params.video.content,
            videoHeight: defaultVideoHeight
        };
        BackHandler.addEventListener('hardwareBackPress', this._backButtonPress);
        // Orientation.addOrientationListener(this._orientationDidChange);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backButtonPress);
        // Orientation.removeOrientationListener(this._orientationDidChange);
    }

    render() {
        let statusBarView = null;
        let videoTopHeight = 0;
        if (isSystemIOS) {
            statusBarView = (<View style={[{backgroundColor:color.primary}, this.state.isFullScreen ? {height: 0} : {height: statusBarHeight}]}/>);
            videoTopHeight = this.state.isFullScreen ? 30 : statusBarHeight;
        }

        let shareW = (width - 60) / 2;
        let shareM = 60 / 3;
        let shareH = 40;

        return (
            <View style={styles.container} onLayout={this._onLayoutChange}>
                {statusBarView}
                <ScrollView style={[styles.container, {marginTop: this.state.videoHeight}]}>
                    {
                        <View>
                            <View style={{backgroundColor:'white'}}>
                                <Text style={{
                                    marginTop:20,
                                    marginRight:20,
                                    marginLeft:20,
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color:'#444444'
                                }}>{this.state.video.title}</Text>

                                <Text style={{
                                    marginTop:10,
                                    marginLeft:20,
                                    fontSize: 12,
                                    color:'#888888'
                                }}>2018-05-12 12:12</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft:20,
                                    marginTop:10,
                                }}>
                                    <Avatar
                                        small
                                        rounded
                                        source={{uri: this.state.video.avatar}}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                                    <Text style={{
                                        marginTop:10,
                                        marginLeft:10,
                                        color:'#444444'
                                    }}>{this.state.video.author}</Text>
                                </View>

                                <View style={{
                                    height: shareH,
                                    flexDirection: 'row',
                                    marginTop:13,
                                    marginBottom:13,
                                    justifyContent: 'space-between',
                                }}>

                                    <SocialIcon
                                        title='分享Facebook'
                                        button
                                        type='facebook'
                                        style={{
                                            width: shareW,
                                            height: shareH,
                                            padding:0,
                                            margin:0,
                                            alignItems: 'center',
                                            position: 'absolute',
                                            left: shareM
                                        }}
                                        iconSize={15}
                                        fontStyle={{
                                            fontSize: 12,
                                        }}
                                        onPress={()=>{
                                            ShareUtils.shareFacebook()
                                        }}
                                    />

                                    <SocialIcon
                                        title='分享微信'
                                        button
                                        iconSize={12}
                                        type='wechat'
                                        style={{
                                            width: shareW,
                                            height: shareH ,
                                            padding:0,
                                            margin:0,
                                            alignItems: 'center',
                                            position: 'absolute',
                                            left: shareM * 2 + shareW,
                                            backgroundColor: 'green'
                                        }}
                                        fontStyle={{
                                            fontSize: 12,
                                        }}
                                        onPress={()=>{
                                            ShareUtils.shareWeChat()
                                        }}
                                    />

                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>

                <VideoPlayer
                    ref={(ref) => this.videoPlayer = ref}
                    style={{position:'absolute', left: 0, top: videoTopHeight}}
                    videoUrl={this.state.currentUrl}
                    videoTitle={this.state.video.title}
                    enableSwitchScreen={true}
                    isShareMenuShow={true}
                    onChangeOrientation={this._onOrientationChanged}
                    onTapBackButton={this._onClickBackButton}
                    isBackBtnShow={true}
                    isPaused={false}
                />
            </View>
        )
    }

    /// 处理安卓物理返回键，横屏时点击返回键回到竖屏，再次点击回到上个界面
    _backButtonPress = () => {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    itemSelected(url) {
        this.setState({
            currentUrl: url
        });
        this.videoPlayer.updateVideo(url, 0, null);
    }

    _onOrientationChanged = (isFullScreen) => {
        if (isFullScreen) {
            lockToPortrait();
        } else {
            lockToLandscapeRight();
        }
    };

    _onClickBackButton = () => {
        this.props.navigation.goBack();
    };

    _onLayoutChange = (event) => {
        let {x, y, width, height} = event.nativeEvent.layout;
        let isLandscape = (width > height);
        if (isLandscape) {
            this.setState({
                isFullScreen: true,
                videoHeight: height
            });
            this.videoPlayer.updateLayout(width, height, true);
        } else {
            this.setState({
                isFullScreen: false,
                videoHeight: width * 9/16
            });
            this.videoPlayer.updateLayout(width, width * 9/16, false);
        }
        unlockAllOrientations();
    };

    _orientationDidChange = (orientation) => {
        if (orientation === 'PORTRAIT') {

        } else {

        }
    };
}
