import React, {PureComponent} from 'react'
import Swiper, {Slide} from 'react-native-swiper';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {screenWidth} from '../widget/color';
import EZSwiper from 'react-native-ezswiper';
import color from '../widget/color';

//获取屏幕的宽高
export default class BannerCoursel extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            dataArray: this.props.dataArray,
            index: 1,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 0)
    }

    renderRow = (obj, index) => {
        return (
            <Image style={styles.cell} source={{uri: obj}}/>
        )
    }


    render() {

        let {dataArray, onBannerSelect, swiperH, isLoop, onTapBackButton} = this.props;
        swiperH = swiperH ? swiperH : screenWidth / 16 * 9

        let datas = []
        dataArray.forEach(item => {
            if (item instanceof Object) {
                datas.push(item.imgUrl)
            } else {
                // console.log(item)
                datas.push(item)
            }
        });

        return (
            <View style={styles.container}>

                <EZSwiper style={[styles.wrapper, {width: screenWidth, height: swiperH}]}
                          dataSource={datas}
                          width={screenWidth}
                          height={swiperH}
                          renderRow={this.renderRow}
                          onPress={(obj, index) => {
                              onBannerSelect && onBannerSelect(index)
                          }}
                          horizontal={true}
                          loop={isLoop}
                          ref={'swiper'}
                          autoplayTimeout={4}
                          onDidChange={(val)=>{
                              this.setState({index: this.refs.swiper.scrollIndex - 1})
                              console.log(val, this.refs.swiper)
                          }}
                />

                {
                    onTapBackButton ?
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                width: 44,
                                height: 44,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                console.log("back")
                                onTapBackButton && onTapBackButton()
                            }}
                        >
                            <Image source={require('../res/images/video/icon_back.png')} style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                        : null
                }

                {
                    <View style={{flexDirection: "row", position: "absolute", bottom: 10, right: 30}}>
                        <Text style={{color: "white"}}>{this.state.index}</Text>
                        <Text style={{color: "white"}}>/{dataArray.length}</Text>
                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    customDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    bannerImg: {
        height: screenWidth * 16 / 9,
        width: screenWidth,
    },
    wrapper: {},
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#efefef',
        flexDirection: 'row'
    },
    cell: {
        backgroundColor: color.bodyColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
