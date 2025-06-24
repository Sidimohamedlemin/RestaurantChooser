import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRestaurantScreen({ navigation }) {
  const [name, setName] = useState('');

  const addRestaurant = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a restaurant name');
      return;
    }
    const stored = await AsyncStorage.getItem('restaurants');
    const restaurants = stored ? JSON.parse(stored) : [];
    const newRestaurant = { id: Date.now(), name };
    const updated = [...restaurants, newRestaurant];
    await AsyncStorage.setItem('restaurants', JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="restaurantchooser"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Add" onPress={addRestaurant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
