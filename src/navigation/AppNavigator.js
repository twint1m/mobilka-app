import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CatalogScreen from '../screens/CatalogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import {CartProvider} from "../../context/CartContext";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Catalog"
                        component={CatalogScreen}
                        options={{
                            title: 'Каталог',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="shopping" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Cart"
                        component={CartScreen}
                        options={{
                            title: 'Корзина',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="cart" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            title: 'Профиль',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account" color={color} size={size} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};

export default AppNavigator;
