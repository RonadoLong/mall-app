/**
 * WebViewPage
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import GlobalStyles from '../widget/styles/GlobalStyles'
import ViewUtils from '../commonuUtils/ViewUtils'

import moment from 'moment';

type Props = {}
export default class InfoWebViewPage extends Component<Props> {
    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params.item.createTime)
        this.state = {
            themeColor: this.props.navigation.state.params.themeColor,
            item: this.props.navigation.state.params.item,
            canGoBack: false,
            title: this.props.navigation.state.params.title,
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            content: navState.content,
        });
    }

    render() {

        var content = "<!doctype html>\n" +
            "<html>\n" +
            "<head>\n" +
            "  <meta name=\"viewport\" content=\"user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0\">\n" +
            "  <style type='text/css'>\n" +
            "    * {\n" +
            "        margin: 0;\n" +
            "        padding: 0;\n" +
            "        border: 0;\n" +
            "        particulars-style: none;\n" +
            "    }\n" +
            "  html {" +
            "      font-family: Helvetica;\n" +
            "      color: #222;\n" +
            "      font-size: 16px;\n" +
            "  }\n" +
            "\n" +
            "  iframe {\n" +
            "      width: 100% !important;\n" +
            "  }\n" +
            "  .header\n" +
            "  {\n" +
            "      width: 100%;\n" +
            "      height: auto;\n" +
            "      margin-bottom: 15px; \n" +
            "  }\n" +
            "  \n" +
            "  .header_in\n" +
            "  {\n" +
            "      height: auto;\n" +
            "      margin-left: 15px;\n" +
            "      margin-right: 15px;" +
            "      margin-top: 15px; \n" +
            "  }\n" +
            "  \n" +
            "  .header_title\n" +
            "  {\n" +
            "      font-size: 18px;\n" +
            "  }\n" +
            "  \n" +
            "  .header_in .menu\n" +
            "  {\n" +
            "      padding-top: 20px;\n" +
            "      padding-bottom: 10px;\n" +
            "      font:12px verdana, arial, sans-serif; \n" +
            "  }\n" +
            "  \n" +
            "  .header .menu li\n" +
            "  {\n" +
            "      list-style:none; \n" +
            "      padding:4; \n" +
            "      margin:0; \n" +
            "      float:left; \n" +
            "      width: auto; \n" +
            "      margin-left: 0px;\n" +
            "      margin-right: 6px;\n" +
            "  }\n" +
            "  .header_in .name\n" +
            "  {\n" +
            "      font-size: 14px;\n" +
            "      color: #883e5c;\n" +
            "      margin-top: 10%;\n" +
            "  }\n" +
            "  \n" +
            "  .header_in .time\n" +
            "  {\n" +
            "      font-size: 13px;\n" +
            "      color: #999;\n" +
            "  }\n" +
            "  \n" +
            "  .con span\n" +
            "  {\n" +
            "      display:block;\n" +
            "      margin: 4%;\n" +
            "  }\n" +
            "  \n" +
            "  .con\n" +
            "  {\n" +
            "      width: 100%;\n" +
            "      height: 100%;\n" +
            "  }\n" +
            "  \n" +
            "  .con p\n" +
            "  {\n" +
            "      font-size: 16px;\n" +
            "      margin-left: 15;\n" +
            "  }\n" +
            "  \n" +
            "  .con span img\n" +
            "  {\n" +
            "      width: 100%;\n" +
            "      height: 100%;\n" +
            "      margin: 0 auto;" +
            "      margin-top: 8px; \n" +
            "      margin-bottom: 8px; \n" +
            "  }\n" +
            "  \n" +
            "  img{\n" +
            "      width:auto;\n" +
            "      height:auto;\n" +
            "      max-width:100%;\n" +
            "      max-height:100%;\n" +
            "  }\n" +
            "  </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "<div class=\"con\">\n" +
            " {{content}} \n" +
            "</div>\n" +
            "</body>\n" +
            "</html>\n";

       var htmlTitleStr =
           "<header class='header'>" +
                "<div class='header_in'>" +
                "<h3 class='header_title'>{{title}}</h3>" +
                "<div class='menu'>" +
                    "<ul>" +
                        "<li class='name' >{{author}}</li>" +
                        "<li class='time' >{{time}}</li>" +
                    "</ul>" +
                "</div>" +
                "</div>" +
            "</header>";

        let time = moment(this.state.item.createTime).format("YYYY-MM-DD HH:mm")

        htmlTitleStr = htmlTitleStr.replace("{{title}}",this.state.title)
            .replace("{{author}}",this.state.item.author).replace("{{time}}", time)
        content = content.replace("{{content}}", htmlTitleStr + "<span>" +this.state.item.content + "</span>")

        console.log(content)
        return (
            <View style={GlobalStyles.root_container}>
                <WebView
                    scalesPageToFit={true}
                    ref={webView=>this.webView=webView}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{html: content}}/>
            </View>

        );
    }
}
