import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import COLORS from '../conts/colors';
import { useNavigation } from '@react-navigation/native';

const PasswordResetScreen = () => { // Pass navigation as a prop
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = () => {
    if (email) {
      axios.post('https://apps.netiscrm.co.za/lostandfoundapi/api/resetPassword.php', { email })
        .then(response => {
          setMessage('Password reset email sent. Check your inbox.');
        })
        .catch(error => {
          setMessage('An error occurred. Please try again.');
        });
    } else {
      setMessage('Please enter a valid email address.');
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Your Password</Text>
      </View>

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <Button title="Reset Password" onPress={handlePasswordReset} color={COLORS.secondary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.backgroundColor,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.secondary,
  },
  input: {
    height: 40,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  message: {
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PasswordResetScreen;
