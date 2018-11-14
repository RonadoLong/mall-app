import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions
} from 'react-native'

import moment from 'moment';
import { Tag } from 'antd-mobile-rn';

import color from "../../../widget/color";

export default class ServiceJobCell extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let {item, onSelect} = this.props;

        var distance = "";
        var killMeters = Number(item.distance)

        if (killMeters < 0.1){
            distance = "在您附近"
        }

        if (0.1 <= killMeters ) {
            distance = "距离您约1公里"
        }

        if (1.5 < killMeters) {
            distance = "距离您约2公里"
        }

        if (2.5 < killMeters) {
            distance = "距离您约3公里"
        }

        if (3.5 < killMeters) {
            distance = "距离您约4公里"
        }

        console.log(distance)

        let disView = distance == "" ? null :
            <Text opacity={0.5} style={styles.distance}>{distance}</Text>

        return (
            <TouchableOpacity
                style={styles.cell_container}
                onPress={() => {
                    onSelect & onSelect(item)
                }}
            >
                <View style={{flex: 1}}>
                    <Text numberOfLines={2} style={styles.listTitle} letterSpacine={2} >{item.title}</Text>
                    <View style={{position: 'absolute', flexDirection: 'row', bottom: -5, left: 10, width: 150}}>
                        <Text style={styles.listMute}>${item.price}</Text>
                        {disView}
                    </View>

                    <View style={{
                        position: 'absolute',
                        height: 25, bottom: 20, left: 10, flexDirection: 'row', alignItems: "center"
                    }}>

                        <View style={styles.leaseType}>
                            <Text style={styles.leaseTitleType}>家庭</Text>
                        </View>
                        <View style={styles.leaseType}>
                            <Text style={styles.leaseTitleType}>安全</Text>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 3,
        borderColor: '#eeeeee',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: '#ccc',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
        flexDirection: 'row'
    },
    listTitle: {
        marginLeft: 10,
        marginBottom: 55,
        lineHeight: 20,
        fontWeight: '500',
        letterSpacing: 0.8,
        fontSize: 17,
        color: color.bigTitle,
    },
    listImg: {
        width: 120,
        height: 80,
        backgroundColor: color.bodyColor,
        borderRadius: 4,
    },
    listMute: {
        fontSize: 15,
        color: color.pink,
        height: 20
    },
    price: {
        lineHeight: 20,
        marginRight: 10,
        fontSize: 13,
        color: color.smallLabel,
        textDecorationLine: 'line-through'
    },
    distance: {
        left: 10,
        bottom: 0,
        fontSize: 13,
        color: color.primary,
        backgroundColor: "#f8f8ff",
        padding: 1,
        borderRadius: 4,
        fontWeight: "200",
        elevation: 1
    },
    leaseType: {
        height: 20,
        width: 40,
        lineHeight: 20,
        marginRight: 15,
        backgroundColor: "#f8f8ff",
        borderRadius: 6,
    },
    leaseTitleType: {
        textAlign: "center",
        lineHeight: 20,
        height: 20,
        width: 40,
        fontSize: 13,
        color: color.primary,
        fontWeight: "200",
    },
    area: {
        height: 20,
        lineHeight: 20,
        fontSize: 13,
        color: color.smallLabel,
        fontWeight: "200"
    },
    leaseTypeline: {
        height: 20,
        marginTop: -4,
        marginLeft: -8,
        marginRight: 8,
        lineHeight: 20,
        fontSize: 15,
        color: color.smallLabel,
    },
    someButtonStyle: {
        width: 60,
        height: 25,
        position: 'absolute',
        right: 15,
        bottom: 10,
    }
})
