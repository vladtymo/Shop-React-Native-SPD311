import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Product } from '../models/Product';
import ProductCard from './ProductCard';

const api = "https://fakestoreapi.com/products";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        fetch(api)
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => Alert.alert('Error', err.message));
    }

    return (
        <View>
            <Text style={styles.title}>Product List</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard item={item} />
                )}
                initialNumToRender={2}
                keyExtractor={(i) => i.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: "center",
        marginVertical: 12,
    }
})