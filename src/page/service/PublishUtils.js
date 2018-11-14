import {Alert} from "react-native";

export default class PublishUtils{

    static selectGoDetail(item, themeColor, navigation){
        console.log(item)
        if (item.id === 1){
            PublishUtils.gotoFangDetail(item, themeColor, navigation, 2)
        }

        if (item.id === 2 ){
            PublishUtils.gotoZhuDetail(item, themeColor, navigation)
        }

        if (item.id === 6 || item.id === 3 ){
            PublishUtils.gotoBussZhuDetail(item, themeColor, navigation)
        }

        if (item.id === 4 || item.id === 5 || item.id === 7 || item.id === 8 ){
            PublishUtils.gotoJiaDetail(item, themeColor, navigation)
        }

        if (item.name === "招生"){
            PublishUtils.gotoZhaoDetail(item, themeColor, navigation)
        }

        if (item.name === "装修服务" || item.name === "园艺砍树" || item.name === "水电冷暖"
            || item.name === "清洁洗毯"  || item.name === "搬运" || item.name === "电脑电器"){
            PublishUtils.gotoZhuanxiuDetail(item, themeColor, navigation)
        }
    }

    static gotoFangDetail(item, themeColor, navigation, index){
        navigation.navigate('FangchanPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            index: index,
            type: item.type
        })
    }

    static gotoJiaDetail(item, themeColor, navigation){
        navigation.navigate('JiaZhenPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            title: item.name,
            type: item.type
        })
    }

    static gotoZhaoDetail(item, themeColor, navigation){
        navigation.navigate('ZhaoShengPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            title: item.name,
            type: item.type
        })
    }

    static gotoZhuDetail(item, themeColor, navigation){
        navigation.navigate('ChuZhuPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            title: item.name,
            type: item.type
        })
    }

    static gotoBussZhuDetail(item, themeColor, navigation){
        navigation.navigate('BussChuZhuPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            title: item.name,
            type: item.type
        })
    }

    static gotoZhuanxiuDetail(item, themeColor, navigation){
        navigation.navigate('ZhuangXiuPublishPage',{
            themeColor: themeColor,
            navigation: navigation,
            id: item.id,
            title: item.name,
            type: item.type
        })
    }
}
