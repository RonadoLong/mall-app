/**
 * WebViewPage
 * @flow
 **/
'use strict'
import React, {PureComponent} from 'react'
import { Image, ScrollView, StyleSheet, WebView, Platform, TouchableOpacity, Text, View } from 'react-native'
import GlobalStyles from '../widget/styles/GlobalStyles'
import { isSystemIOS, statusBarHeight } from '../widget/color';
import color from '../widget/color';

export default class WebViewPage extends PureComponent {
    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params
        console.log(this.params)
        this.state = {
            url: this.params.url,
            canGoBack: false,
            title: this.params.title,
        }
    }


    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    onTapBackButton = () => {
        console.log("back")
        this.props.navigation.goBack();
    }

    render() {
        let statusBarView = null;
        if (isSystemIOS) {
            statusBarView = (<View style={[{backgroundColor:color.primary}, {height: statusBarHeight}]}/>);
        }

        return (
            <View style={GlobalStyles.root_container}>

                {statusBarView}

                <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    top: 50,
                                    left: 10,
                                    width: 44,
                                    height: 44,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1,
                                }}
                                onPress={this.onTapBackButton}
                            >
                                <Image
                                    source={require('../res/images/video/icon_back.png')}
                                    style={{width: 30, height: 30}}
                                />
                </TouchableOpacity>

                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}
