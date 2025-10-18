import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import ProductList from "./components/ProductList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Link href="/details">Go to About screen</Link>
      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({});
