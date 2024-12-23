import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {CartContext} from "../../context/CartContext";

const CartScreen = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.productName}</Text>
                        <Text>{item.price}₽</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Корзина пуста</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default CartScreen;
