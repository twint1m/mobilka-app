import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import { CartContext } from '../../context/CartContext';

const imageMapping = {
    1: require('../../assets/images/product-image1.webp'),
    2: require('../../assets/images/product-image2.webp'),
    3: require('../../assets/images/product-image3.webp'),
    4: require('../../assets/images/product-image4.webp'),
    5: require('../../assets/images/product-image5.webp'),
    6: require('../../assets/images/product-image6.webp'),
    7: require('../../assets/images/product-image7.webp'),
    8: require('../../assets/images/product-image8.webp'),
    9: require('../../assets/images/product-image9.webp'),
    10: require('../../assets/images/product-image10.webp'),
};

const CartScreen = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Корзина пуста</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image
                                source={imageMapping[item.id]} // Используем imageMapping для отображения изображения
                                style={styles.image}
                            />
                            <View style={styles.infoContainer}>
                                <Text style={styles.productName}>{item.productName}</Text>
                                <Text style={styles.productPrice}>Цена: {item.price}₽</Text>
                                <Button
                                    title="Удалить"
                                    onPress={() => removeFromCart(item.id)}
                                />
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999',
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 10,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
});

export default CartScreen;
