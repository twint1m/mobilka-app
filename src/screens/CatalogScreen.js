import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';

// Импорт данных из локального JSON
import data from '../../api/data.json';

const CatalogScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Сопоставление ID с локальными изображениями
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

    useEffect(() => {
        const fetchData = () => {
            try {
                console.log('Начало загрузки данных...');
                setProducts(data); // Загружаем данные из локального JSON
                console.log('Данные загружены:', data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error.message);
            } finally {
                setLoading(false); // Завершаем "загрузку"
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image
                        source={imageMapping[item.id]} // Используем локальное сопоставление
                        style={styles.image}
                    />
                    <Text style={styles.name}>{item.productName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.price}>Цена: {item.price}₽</Text>
                </View>
            )}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 20,
    },
    item: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        color: '#333',
    },
});

export default CatalogScreen;
