import React, { Component } from 'react';
import { View, Button, StyleSheet, ToastAndroid, ScrollView, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PeopleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      errors: {},
    };
  }

  validateName = (fieldName, value) => {
    if (!value.trim()) return `${fieldName} is required`;
    if (value.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return `${fieldName} contains invalid characters`;
    return null;
  };

  handleChange = (field) => (value) => {
    this.setState((prevState) => ({
      [field]: value,
      errors: { ...prevState.errors, [field]: null },
    }));
  };

  savePerson = async () => {
    const { firstName, lastName } = this.state;

    const errors = {
      firstName: this.validateName('First name', firstName),
      lastName: this.validateName('Last name', lastName),
    };

    const hasErrors = Object.values(errors).some((err) => err !== null);
    if (hasErrors) {
      this.setState({ errors });
      ToastAndroid.show('Please fix the errors before submitting', ToastAndroid.LONG);
      return;
    }

    const newPerson = {
      id: Date.now(),
      firstName,
      lastName,
    };

    try {
      const existing = await AsyncStorage.getItem('people');
      const people = existing ? JSON.parse(existing) : [];
      people.push(newPerson);
      await AsyncStorage.setItem('people', JSON.stringify(people));
      ToastAndroid.show('Person added successfully!', ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save person data');
    }
  };

  render() {
    const { firstName, lastName, errors } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CustomTextInput
          label="First Name"
          stateHolder={this}
          stateFieldName="firstName"
          value={firstName}
          onChangeText={this.handleChange('firstName')}
          error={errors.firstName}
        />

        <CustomTextInput
          label="Last Name"
          stateHolder={this}
          stateFieldName="lastName"
          value={lastName}
          onChangeText={this.handleChange('lastName')}
          error={errors.lastName}
        />

        <Button title="Save Person" onPress={this.savePerson} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
