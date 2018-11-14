import React,{PureComponent} from 'react'
import {View, Text, StyleSheet, DeviceEventEmitter, ScrollView, TouchableOpacity} from 'react-native'
import {Toast, Modal} from 'antd-mobile-rn'
import color , { screenWidth, screenHeight }from '../../../widget/color';


export default class UserAgreementView extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isAgreement: this.props.isAgreement
        }
    }

    onClose = key => () => {
        this.setState({
          [key]: false,
        });
    }

    showView(){
        this.setState({
            isAgreement: true
        })
    }


    hiddenView(){
        this.setState({
            isAgreement: false
        })
    }

    render(){
        let contentHeight = screenHeight - 120;
        let contentWidth = screenWidth - 20;

        let {onTapBtn} = this.props
       return (
            <Modal
                visible={this.state.isAgreement}
                transparent
                onClose={this.onClose('isAgreement')}
                maskClosable={false}
                style={{width: contentWidth, height: contentHeight}}
                >

               <View style={{height: contentHeight}}>

                   <View style={{height:30, borderBottomColor: color.bodyColor,
                    borderBottomWidth: 1,}}>
                        <Text style={{color: color.bigTitle, fontSize: 16, textAlign:"center", fontWeight:"600", marginTop: -6}}>Posting Agreement</Text>
                   </View>

               <ScrollView style={{ height: contentHeight - 60,  marginBottom: 30}}>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                    <Text>scoll content...</Text>
                </ScrollView>

                <View style={{ borderTopColor: color.bodyColor, borderTopWidth: 1, flexDirection:"row", marginBottom:30,justifyContent:"space-around", }}>
                    <TouchableOpacity onPress={()=>{
                        onTapBtn && onTapBtn(1)
                     }}>
                        <Text style={{color: color.bigTitle, fontSize: 15,lineHeight:30, fontWeight:"600",marginTop:10}}>DisAgree</Text>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={()=>{
                        onTapBtn && onTapBtn(2)
                     }}>
                        <Text style={{color: color.primary, fontSize: 15,lineHeight:30, fontWeight:"600",marginTop:10}}>Agree</Text>
                    </TouchableOpacity>
                   </View>
               </View>
             </Modal>
       )
    }
}
