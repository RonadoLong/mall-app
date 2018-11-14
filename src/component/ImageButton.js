import React, {PureComponent} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../commonuUtils/px2dp'
import color from "../widget/color";

export default class ImageButton extends PureComponent{


    static defaultProps = {
        imgSize: px2dp(40),
        fontSize: px2dp(13)
    };

    render() {
        const {image, icon, onPress} = this.props;

        if (Platform.OS === 'ios') {
            if (image) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={color.btnActiveOpacity}>
                        {this._renderContentWithImage()}
                    </TouchableOpacity>
                );
            } else if (icon) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={color.btnActiveOpacity}>
                        {this._renderContentWithIcon()}
                    </TouchableOpacity>
                );
            }
        } else if (Platform.OS === 'android') {
            if (image) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithImage()}
                    </TouchableNativeFeedback>
                );
            } else if (icon) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithIcon()}
                    </TouchableNativeFeedback>
                );
            }
        }
    }

    _renderContentWithImage(){
        const {text, image, color, imgSize, fontSize, btnStyle, imageColor} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Image source={image} style={{width: imgSize, height: imgSize, tintColor: imageColor}}/>
                {text ?
                    <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }

    _renderContentWithIcon(){
        const {text, icon, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Icon name={icon} size={imgSize} color={color}/>
                {text ?
                    <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: color.normalTitle,
        marginTop: px2dp(8)
    }
});
