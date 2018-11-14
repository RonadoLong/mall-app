import color from "../widget/color";

export default class NavigatorUtil{

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation){
        navigation.goBack();
    }

    /**
     * 调转详情
     */
    static goToRepositoryDetail(params){
        const {navigation,projectModel,flag,theme,onUpdateFavorite} = params;
        navigation.navigate("RepositoryDetail",{
            navigation: navigation,
            projectModel: projectModel,
            flag: flag,
            themeColor: themeColor,
            onUpdateFavorite: onUpdateFavorite
        })
    }

    /**
     * 调整首页
     */
    static resetToHomePage(params){
        const {navigation,theme,selectedTab} = params;
        this.resetRoute(navigation,params)
    }

    static resetRoute = (navigation, params) => {
        navigation.navigate("HomePage",{
            navigation: navigation,
        })
    }

    /**
     * 调转详情
     */
    static goToWebDetail(params){
        const {url,title,navigation} = params
        navigation.navigate("WebViewPage",{
            navigation: navigation,
            url:url,
            title:title
        })
    }

    static goToInfoWebDetail(params){
        const {themeColor,title,navigation,item} = params
        navigation.navigate(
            "InfoWebViewPage",
            {
                navigation: navigation,
                themeColor:themeColor,
                title:title,
                item:item
            })
    }

    /**
     * 调转详情
     */
    static goToHomeNavDetail(params){
        const {themeColor,title,navigation} = params
        navigation.push("VideoPage",{
            navigation: navigation,
            title: title,
            themeColor: themeColor
        })
    }

    /**
     * 调转新闻
     */
    static goToNewsListDetail(params){
        const {themeColor,title,navigation} = params
        navigation.navigate("InformationPage",{
            navigation: navigation,
            title: title,
            themeColor: themeColor
        })
    }

    /**
     * 调转新闻
     */
    static goToGoodsListDetail(params){
        const {themeColor,title,navigation} = params
        navigation.navigate("GoodsPage",{
            navigation: navigation,
            title: "Detail",
            themeColor: themeColor
        })
    }

    /**
     * 调转新闻
     */
    static goToGoodsDetail(params){
        const {themeColor,title,navigation,productId} = params
        navigation.navigate("GoodsDetailPage",{
            navigation: navigation,
            productId: productId,
            themeColor: themeColor,
            title:  "Detail",
        })
    }

    /**
     * 调转视频详情
     */
    static goToVideoDetail(params){
        const {themeColor,url,navigation,video} = params
        navigation.navigate("VideoPlayScreen",{
            navigation: navigation,
            video: video,
            themeColor: themeColor,
            url: url,
        })
    }

    /**
     * 调转发布页面
     */
    static goToServicePublishDetail(params){
        const {themeColor,navigation} = params
        navigation.navigate("ServiceClassPage",{
            navigation: navigation,
            themeColor: themeColor,
        })
    }

    /**
     * ShopCartStack
     */
    static goToCart(navigation){
        navigation.navigate("ShopCartStack")
    }


    static goToMineSettingDetail(params){
        const {navigation} = params
        navigation.navigate("MineSettingPage",{
            navigation: navigation,
        })
    }

    /**
     * 调转service
     */
    static goToService(params){
        const {themeColor,navigation} = params
        navigation.navigate("ServicePage",{
            navigation: navigation,
            themeColor: themeColor,
        })
    }

    /**
     * 调转service
     */
    static goToMapComponet(params){
        const {themeColor,navigation} = params
        navigation.navigate("MapComponet",{
            navigation: navigation,
            themeColor: themeColor,
        })
    }

    static goToMenuDetail(item, props){
        console.log(item)
        if (item.title === "视频" || item.title.indexOf("Video") > - 1) {
            NavigatorUtil.goToHomeNavDetail(
                {
                    themeColor: color.primary,
                    title: item.title,
                    navigation: props.navigation
                }
            )
        } else if (item.title.indexOf("News") > - 1 || item.title === "新闻") {
            NavigatorUtil.goToNewsListDetail(
                {
                    themeColor: color.primary,
                    title: item.title,
                    navigation: props.navigation
                }
            )
        } else if (item.title.indexOf("Foods") > -1 || item.title === "食品") {
            NavigatorUtil.goToGoodsListDetail(
                {
                    themeColor: color.primary,
                    title: item.title,
                    navigation: props.navigation
                }
            )
        } else {

        }
    }
}