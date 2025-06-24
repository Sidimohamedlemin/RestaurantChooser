import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantScreen from './screens/RestaurantScreen';
import AddRestaurantScreen from './screens/AddRestaurantScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Restaurants">
        <Stack.Screen name="Restaurants" component={RestaurantScreen} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} options={{ title: 'Add New Restaurant' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
