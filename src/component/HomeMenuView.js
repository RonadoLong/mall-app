import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions,} from 'react-native'
import PageControl from 'react-native-page-control'

import HomeMenuItem from './HomeMenuItem'
var {width, height} = Dimensions.get('window');

type Props = {
    menuInfos: Array<Object>,
    onMenuSelected: Function,
}

type State = {
    currentPage: number
}


class HomeMenuView extends PureComponent<Props, State>  {

    constructor(props: Object) {
        super(props)

        this.state = {
            currentPage: 0
        }
    }

    render() {
        let {menuInfos, onMenuSelected, themeColor} = this.props
        // console.log(menuInfos)
        let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    key={i}
                    title={info.name ? info.name : info.title}
                    icon={info.imgUrl ? info.imgUrl : info.img_url}
                    onPress={() => {
                        onMenuSelected && onMenuSelected(i)
                    }}
                />
            )
        )

        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / 10)

        for (let i = 0; i < pageCount; i++) {
            let items = menuItems.slice(i * 10, i * 10 + 10)

            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => this.onScroll(e)}
                >
                    <View style={styles.menuContainer}>
                        {menuViews}
                    </View>
                </ScrollView>

                <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor='#ccc'
                    currentPageIndicatorTintColor={themeColor}
                    indicatorSize={{width: 10, height: 10}}
                />
            </View>

        )
    }

    onScroll(e: any) {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / width)

        console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
        if (this.state.currentPage !== currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingBottom: 6
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    itemsView: {
        flexDirection: 'row',
        justifyContent:"space-around",
        flexWrap: 'wrap',
        width: width,
    },
    pageControl: {
        margin: 6,
    }
})


export default HomeMenuView