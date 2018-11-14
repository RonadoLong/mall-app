
export default class ServiceDetailUtils {

    static gotoClassDetail(item, address, navigation){
        if(address.length <= 0 || address === ""){
            address = "Select State"
        }
        navigation.navigate("ServiceClassDetailPage",{
            categoryId: item.id,
            navigation: navigation,
            title: item.name,
            address: address,
        })
    }

    static gotoRoomDetailPage(item, themeColor, navigation){
        navigation.navigate("RoomDetailPage",{
            item: item,
            themeColor: themeColor,
            navigation: navigation,
        })
    }

    static gotoJobDetailPage(item, themeColor, navigation){
        navigation.navigate("JobServiceDetailPage",{
            item: item,
            title: item.title,
            themeColor: themeColor,
            navigation: navigation,
        })
    }
}