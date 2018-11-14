/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */
import ReactNative, {DeviceInfo, Dimensions, Text, Platform} from 'react-native'

export default {
    primary: '#06C1AE',
    border: '#e0e0e0',
    paper: '#f3f3f3',
    pink: '#f85476',
    gray: '#979797',
    normalTitle: '#444444',
    bigTitle: '#333333',
    smallLabel: '#888888',
    bodyColor: '#F0F0F0',
    subPrimary: '#7ec1be',
    btnActiveOpacity: 0.7,
    tagBGColor: '#519ec1',
    tagColor: '#1f86c1',
    root_container:{
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
}

export const isIPhoneX = IphoneX();
export const statusBarHeight = IphoneX() ? 44 : 20;
export const isSystemIOS = (Platform.OS === 'ios');
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const defaultVideoHeight = screenWidth * 9/16;

/**
 * @return {boolean}
 */
function IphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812 || dimen.height === 896)
    );
}
