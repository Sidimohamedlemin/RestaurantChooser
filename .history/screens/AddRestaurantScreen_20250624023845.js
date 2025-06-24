import React, { Component } from 'react';
import { View, Button, StyleSheet, Alert, ToastAndroid, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';

export default class AddRestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      website: '',
      errors: {},
    };
  }

  validateName = (name) => {
    if (!name.trim()) return 'Restaurant name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) return 'Name contains invalid characters';
    return null;
  };

  validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    if (!/^\+?[\d\s\-()]{7,}$/.test(phone)) return 'Invalid phone number format';
    return null;
  };

  validateAddress = (address) => {
    if (!address.trim()) return 'Address is required';
    if (!/\d+/.test(address)) return 'Address must include a number';
    return null;
  };

  validateWebsite = (website) => {
    if (!website.trim()) return null; // Optional
    if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}$/.test(website)) return 'Invalid website URL';
    return null;
  };

  handleChange = (field) => (value) => {
    this.setState((prevState) => ({
      [field]: value,
      errors: { ...prevState.errors, [field]: null },
    }));
  };

  saveRestaurant = async () => {
    const { name, phone, address, website } = this.state;

    const errors = {
      name: this.validateName(name),
      phone: this.validatePhone(phone),
      address: this.validateAddress(address),
      website: this.validateWebsite(website),
    };

    // Filter out nulls
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      this.setState({ errors });
      ToastAndroid.show('Please fix the errors before submitting', ToastAndroid.LONG);
      return;
    }

    const newRestaurant = {
      id: Date.now(),
      name,
      phone,
      address,
      website,
    };

    try {
      const existing = await AsyncStorage.getItem('restaurants');
      const restaurants = existing ? JSON.parse(existing) : [];
      restaurants.push(newRestaurant);
      await AsyncStorage.setItem('restaurants', JSON.stringify(restaurants));
      ToastAndroid.show('Restaurant added successfully!', ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save restaurant data');
    }
  };

  render() {
    const { name, phone, address, website, errors } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextInput
          label="Restaurant Name"
          stateHolder={this}
          stateFieldName="name"
          value={name}
          onChangeText={this.handleChange('name')}
          error={errors.name}
        />

        <CustomTextInput
          label="Phone Number"
          stateHolder={this}
          stateFieldName="phone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={this.handleChange('phone')}
          error={errors.phone}
        />

        <CustomTextInput
          label="Address"
          stateHolder={this}
          stateFieldName="address"
          value={address}
          onChangeText={this.handleChange('address')}
          error={errors.address}
        />

        <CustomTextInput
          label="Website"
          stateHolder={this}
          stateFieldName="website"
          value={website}
          keyboardType="url"
          autoCapitalize="none"
          onChangeText={this.handleChange('website')}
          error={errors.website}
        />

        <Button title="Save Restaurant" onPress={this.saveRestaurant} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
