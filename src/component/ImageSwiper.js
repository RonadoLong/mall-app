/**
 * Created by 叶子 on 2017/9/3.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
import color,{screenWidth} from '../widget/color';
var SwiperH = screenWidth / 16 * 9

const styles = {
    container: {
        flex: 1,
        height: SwiperH,
    },

    wrapper: {
    },

    slide: {
        width: screenWidth,
        height: SwiperH,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        flex: 1,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width: screenWidth,
        height: SwiperH,
    }
}

export default class extends Component {
    state = {
        swiperVisible: false
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({swiperVisible: true})
        }, 100)
    }
    render () {
        const { swiperVisible } = this.state;
        const { banner, tapSwiper} = this.props;
        return (
            <View style={styles.container}>
                {
                    swiperVisible && banner && banner.length > 0 && (
                        <Swiper style={styles.wrapper} height={SwiperH}
                                dot={<View style={{backgroundColor: color.bodyColor, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                                activeDot={<View style={{backgroundColor: color.primary, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                                paginationStyle={{
                                    bottom: 0, left: null, right: 10
                                }}
                                loop
                                autoplay
                                removeClippedSubviews={false}
                                autoplayTimeout={6}
                                // showsButtons={true}
                        >
                            {
                                banner.map((v, i) => (
                                    <TouchableOpacity
                                        style={styles.slide}
                                        key={i}
                                        onPress={()=>{
                                            tapSwiper && tapSwiper(i)
                                            console.log(i)
                                        }}>
                                        <View style={styles.slide} >
                                            <Image resizeMode='stretch' style={styles.image} source={{uri: v.imgUrl}} />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }

                        </Swiper>
                    )
                }

            </View>
        )
    }
}
