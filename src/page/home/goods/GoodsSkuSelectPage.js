import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight,
    Modal,
    DeviceEventEmitter
} from "react-native";

import GlobalStyles from '../../../widget/styles/GlobalStyles'


type Props = {}
export default class GoodsSkuSelectPage extends Component<Props> {

    constructor(props){
        super(props);
    }

    renderContentView(){
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {this.props.onClose()}}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text>选择sku</Text>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        let view=this.props.visible?<View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View>:null;
        return view;
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        padding:3
    },
    themeText:{
        color:'white',
        fontWeight:'500',
        fontSize:16
    }
})