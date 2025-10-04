import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductList from './components/ProductList';



export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
})