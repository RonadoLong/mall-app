import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import {Heading3, Paragraph} from "../widget/Text";
var {width, height} = Dimensions.get('window');

type Props = {
    onPress: Function,
    icon: any,
    title: string,
}

class HomeMenuItem extends PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}>
                <Image source={{uri: this.props.icon}} resizeMode='contain' style={styles.icon} />
                <Paragraph>
                    {this.props.title}
                </Paragraph>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5,
        height: width / 5,
    },
    icon: {
        width: width/ 12,
        height: width / 12,
        margin: 10,
    }
});


export default HomeMenuItem;