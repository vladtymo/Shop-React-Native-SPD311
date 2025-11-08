import * as schema from "@/services/db_schema";
import { productsTable } from "@/services/db_schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const DatabaseORM = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [products, setProducts] = useState<
    (typeof productsTable.$inferSelect)[]
  >([]);

  //const [items, setItems] = useState<Product[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    loadItems();
    console.log("loading...");
  }, []);

  const loadItems = async () => {
    //init();

    //setItems((await getItems()) ?? []);
    drizzleDb.select().from(productsTable).then(setProducts);
    console.log("loading...");
  };

  const addItemHandle = async () => {
    if (!text.trim()) return;

    //const createdItem = await addItem(text);
    drizzleDb
      .insert(productsTable)
      .values({ title: text })
      .then((result) => {
        const createdItem = { id: Number(result.lastInsertRowId), title: text };

        setProducts([...products, createdItem]);

        setText("");
        console.log("added...");
      });
  };

  const removeItemHandle = async (id: number) => {
    //await deleteItem(id);

    drizzleDb
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .then(() => {
        setProducts(products.filter((item) => item.id !== id));
        console.log("removed...");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Database Screen</Text>

      <Text>Name: </Text>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Add New Item" onPress={addItemHandle} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.id} - {item.title}
            </Text>
            <Button
              title="Remove"
              onPress={() => removeItemHandle(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

export default DatabaseORM;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "black",
    minWidth: 300,
  },
  label: {
    fontSize: 12,
    color: "black",
    marginBottom: 4,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    minWidth: 300,
  },
  itemText: {
    flex: 1,
    color: "black",
  },
});
