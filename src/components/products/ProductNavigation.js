import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeStack from './screens/HomeStack';
import SearchStack from './screens/SearchStack';
import Cart from './screens/Cart';
import ProfileStack from './screens/ProfileStack';

const ProductNavigation = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: () => {
                    if (route.name == "HomeStack"){
                        return <Image style={styles.image} source={require('../../assets/images/icon_home.png')}/>
                    } else if (route.name == "SearchStack"){
                        return <Image style={styles.image} source={require('../../assets/images/icon_them.png')}/>
                    } else if (route.name == "Cart"){
                        return <Image style={styles.image} source={require('../../assets/images/icon_cart.png')}/>
                    } else if (route.name == "ProfileStack"){
                        return <Image style={styles.image} source={require('../../assets/images/icon_person.png')}/>
                    }
                },
                tabBarLabel: ({focused}) => {
                    if (route.name == "HomeStack" && focused){
                        return <Text style={styles.text}>Trang chủ</Text>
                    } else if (route.name == "SearchStack" && focused){
                        return <Text style={styles.text}>Mở rộng</Text>
                    } else if (route.name == "Cart" && focused){
                        return <Text style={styles.text}>Giỏ hàng</Text>
                    } else if (route.name == "ProfileStack" && focused){
                        return <Text style={styles.text}>Trang cá nhân</Text>
                    }
                    return null;
                },
                headerShown: false,
            })}>
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="SearchStack" component={SearchStack} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />

        </Tab.Navigator>
    )
}

export default ProductNavigation

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 12,
        color: '#100'
    }
})