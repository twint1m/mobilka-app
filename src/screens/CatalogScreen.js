import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import data from '../../api/data.json';
import {CartContext} from "../../context/CartContext";

const CatalogScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewType, setViewType] = useState('list');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [selectedMinPrice, setSelectedMinPrice] = useState(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(10000);
    const [collections, setCollections] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);

    const { addToCart } = useContext(CartContext);

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
            setProducts(data);
            setFilteredProducts(data);

            const allCollections = new Set();
            data.forEach((product) => {
                product.collection.forEach((col) => allCollections.add(col));
            });
            setCollections([...allCollections]);

            setMinPrice(Math.min(...data.map((item) => item.price)));
            setMaxPrice(Math.max(...data.map((item) => item.price)));
            setSelectedMinPrice(Math.min(...data.map((item) => item.price)));
            setSelectedMaxPrice(Math.max(...data.map((item) => item.price)));

            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesSearch =
                product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesPrice =
                product.price >= selectedMinPrice && product.price <= selectedMaxPrice;

            const matchesCollection =
                selectedCollections.length === 0 ||
                product.collection.some((col) => selectedCollections.includes(col));

            return matchesSearch && matchesPrice && matchesCollection;
        });
        setFilteredProducts(filtered);
    }, [searchQuery, selectedMinPrice, selectedMaxPrice, selectedCollections, products]);

    const toggleCollection = (collection) => {
        if (selectedCollections.includes(collection)) {
            setSelectedCollections((prev) => prev.filter((col) => col !== collection));
        } else {
            setSelectedCollections((prev) => [...prev, collection]);
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={styles.filterContainer}>
                {collections.map((collection) => (
                    <TouchableOpacity
                        key={collection}
                        style={[
                            styles.collectionButton,
                            selectedCollections.includes(collection) && styles.activeCollectionButton,
                        ]}
                        onPress={() => toggleCollection(collection)}
                    >
                        <Text
                            style={[
                                styles.collectionButtonText,
                                selectedCollections.includes(collection) && styles.activeCollectionButtonText,
                            ]}
                        >
                            {collection}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.priceFilter}>
                <Text>Цена: {selectedMinPrice}₽ - {selectedMaxPrice}₽</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={minPrice}
                    maximumValue={maxPrice}
                    step={100}
                    value={selectedMinPrice}
                    onValueChange={(value) => setSelectedMinPrice(value)}
                />
                <Slider
                    style={styles.slider}
                    minimumValue={minPrice}
                    maximumValue={maxPrice}
                    step={100}
                    value={selectedMaxPrice}
                    onValueChange={(value) => setSelectedMaxPrice(value)}
                />
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, viewType === 'list' && styles.activeButton]}
                    onPress={() => setViewType('list')}
                >
                    <MaterialCommunityIcons
                        name="view-list"
                        size={24}
                        color={viewType === 'list' ? '#000' : '#888'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, viewType === 'grid' && styles.activeButton]}
                    onPress={() => setViewType('grid')}
                >
                    <MaterialCommunityIcons
                        name="view-grid"
                        size={24}
                        color={viewType === 'grid' ? '#000' : '#888'}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                key={viewType}
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={viewType === 'grid' ? 2 : 1}
                renderItem={({ item }) => (
                    <View style={[styles.item, viewType === 'grid' && styles.gridItem]}>
                        <Image source={imageMapping[item.id]} style={styles.image} />
                        <Text style={styles.name}>{item.productName}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>Цена: {item.price}₽</Text>
                        <Button title="Добавить в корзину" onPress={() => addToCart(item)} />
                    </View>
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.noResults}>Ничего не найдено</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 10,
        flexWrap: 'wrap',
    },
    collectionButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    activeCollectionButton: {
        backgroundColor: '#ccc',
    },
    collectionButtonText: {
        color: '#555',
    },
    activeCollectionButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    priceFilter: {
        padding: 10,
    },
    slider: {
        marginVertical: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#ddd',
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
        flex: 1,
        margin: 5,
    },
    gridItem: {
        flex: 0.5,
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
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default CatalogScreen;
