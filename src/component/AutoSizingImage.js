
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'


// export default class AutoSizingImage extends Component {
//     state = {
//         height: 0,
//         width: 0,
//     }
//
//     onLoad = e => {
//         const {
//             nativeEvent: { width, height },
//         } = e
//         this.setState({ width, height })
//         if (this.props.onLoad) this.props.onLoad(e)
//     }
//
//     getHeight = () => {
//         if (!this.state.height) return this.props.defaultHeight
//         const ratio = this.state.height / this.state.width
//         const height = this.props.width * ratio
//         return height
//     }
//
//     render() {
//         const height = this.getHeight()
//         return (
//             <FastImage
//                 {...this.props}
//                 onLoad={this.onLoad}
//                 style={[{ width: this.props.width, height }, this.props.style]}
//             />
//         )
//     }
// }