import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class CustomTextInput extends Component {
  render() {
    const {
      label,
      labelStyle,
      maxLength,
      textInputStyle,
      stateHolder,
      stateFieldName,
      onChangeText,
      error,
      ...props
    } = this.props;

    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <TextInput
          maxLength={maxLength}
          onChangeText={(text) => {
            stateHolder.setState({ [stateFieldName]: text });
            if (onChangeText) onChangeText(text);
          }}
          style={[
            styles.input,
            textInputStyle,
            error ? { borderColor: 'red', borderWidth: 1 } : {}
          ]}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
}

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  stateHolder: PropTypes.object.isRequired,
  stateFieldName: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  label: { fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});
