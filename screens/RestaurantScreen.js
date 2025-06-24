import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RestaurantScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('restaurants');
      if (data) setRestaurants(JSON.parse(data));
    };
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const deleteRestaurant = async (id) => {
    const updated = restaurants.filter((r) => r.id !== id);
    setRestaurants(updated);
    await AsyncStorage.setItem('restaurants', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Button title="Add Restaurant" onPress={() => navigation.navigate('AddRestaurant')} />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteRestaurant(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { marginVertical: 10, padding: 10, backgroundColor: '#eee', borderRadius: 5 },
});
