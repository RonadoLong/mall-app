import {createStackNavigator} from "react-navigation";
import color from "../widget/color";

import ShopCartsPage from "../page/cart/ShopCartsPage";
import GoodsDetailPage from "../page/home/goods/GoodsDetailPage";
import OrderConfirmationPage from "../page/cart/OrderConfirmationPage";
import AddressPage from "../page/cart/AddressPage";
import SelectPaymentPage from "../page/cart/SelectPaymentPage";
import SaveAddressPage from "../page/cart/SaveAddressPage";

/** servcei */
const ShopCartStack = createStackNavigator({
    ServicePage: {
        screen: ShopCartsPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: "ShopCart",
                headerStyle: {
                    backgroundColor: color.primary,
                },
            }
        }
    },
    GoodsDetailPage: {
        screen: GoodsDetailPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    OrderConfirmationPage: {
        screen: OrderConfirmationPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    AddressPage: {
        screen: AddressPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    SelectPaymentPage: {
        screen: SelectPaymentPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    },
    SaveAddressPage: {
        screen: SaveAddressPage,
        navigationOptions: (props) => {
            const {navigation}=props
            const {state}=navigation
            const {params}=state
            return {
                title: params.title,
            }
        }
    }
},{
    navigationOptions: ({navigation}) => ({
        headerStyle: { backgroundColor: color.primary,},
        headerTintColor: 'white',
        showIcon: true,
        borderBottomWidth: 0,
        elevation: 0,
    })
});

export default ShopCartStack
