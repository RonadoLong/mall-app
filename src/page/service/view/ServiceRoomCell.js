import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native'

import moment from 'moment';
import color from "../../../widget/color";

export default class ServiceRoomCell extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let {item, onSelect} = this.props;
        let image = item.banner[0]

        let time = item.create_at ? item.create_at : new Date()
        let timeView = moment(time).format("YYYY-MM-DD")

        let priceView = item.price ?
            <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: color.bodyColor, borderRadius: 6, padding:4,height:26}}>
                <Text style={{color:color.pink, fontSize:12}}>$ </Text>
                <Text style={{color:color.pink, fontSize:15}}>{ item.price}</Text>
            </View> : null

        let classView = item.classname ?
            <View style={{ flexDirection: 'row',}}>
                <Text style={{color:color.smallLabel, fontSize:13}}>{item.classname}</Text>
            </View> : null

        return (
            <TouchableOpacity
                style={styles.cell_container}
                onPress={() => {
                    onSelect && onSelect(item)
                }}
            >
                <Image
                    style={styles.listImg}
                    source={{uri: image}}
                />

                <View style={{flex: 1}}>
                    <Text numberOfLines={3} style={styles.listTitle} >{item.note}</Text>
                    <View style={{position: 'absolute', flexDirection: 'row', bottom: 0, left: 10, width: 150, alignItems: "center"}}>
                        {classView}
                        <Text style={styles.time}>{timeView}</Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        height: 20, bottom: 20, left: 10, flexDirection: 'row', alignItems: "center"
                    }}>
                        {priceView}
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
        marginBottom: 2,
        borderColor: '#eeeeee',
        borderWidth: 0.5,
        borderRadius: 2,
        flexDirection: 'row'
    },
    listTitle: {
        marginLeft: 10,
        marginBottom: 45,
        fontSize: 15,
        color: color.bigTitle,
    },
    listImg: {
        width: 100,
        height: 100,
        backgroundColor: color.bodyColor,
        borderRadius: 4,
    },
    listMute: {
        fontSize: 12,
        color: color.pink,
        marginTop:3
    },
    price: {
        lineHeight: 20,
        marginRight: 10,
        fontSize: 13,
        color: color.smallLabel,
        textDecorationLine: 'line-through'
    },
    time: {
        marginLeft: 10,
        fontSize: 13,
        color: color.smallLabel,
    },
    roomType: {
        fontSize: 11,
        color: color.smallLabel,
        fontWeight: "200",
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
    },
    leaseType: {
        height: 20,
        width: 60,
        lineHeight: 20,
        marginRight: 15,
        backgroundColor: "#f8f8ff",
        borderRadius: 6,
    }
})
