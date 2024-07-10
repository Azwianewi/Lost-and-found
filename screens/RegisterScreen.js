import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import COLORS from '../conts/colors';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';

const Button = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, backgroundColor: color || COLORS.blue }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Please input email';
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Please input a valid email';
      isValid = false;
    }

    if (!username) {
      newErrors.username = 'Please input full names';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Please input phone number';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Please input password';
      isValid = false;
    } else if (password.length < 5) {
      newErrors.password = 'Minimum password length of 5';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleRegister();
    }
  };

  const handleLoginLink = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/register.php',
        JSON.stringify({
          email: email,
          password: password,
          phone: phone,
          username: username,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Registration response:', response.data);
  
      if (response.data.status === 201) {
        // Clear form fields after successful registration
        setEmail('');
        setUsername('');
        setPhone('');
        setPassword('');
  
        // Log success and navigate to HomeScreen
        console.log('Registration successful. Navigating to HomeScreen.');
        navigation.navigate('HomeScreen', { username });
      } else {
        // Log error message and display alert
        console.log('Registration failed:', response.data.message);
        Alert.alert('Registration Error', response.data.message);
      }
    } catch (error) {
      // Log error and display generic error alert
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };
  
  
  console.log('Rendering RegisterScreen...');

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Register your account</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setErrors({ ...errors, email: null })}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => setUsername(text)}
            onFocus={() => setErrors({ ...errors, username: null })}
            iconName="account-outline"
            label="username"
            placeholder="Enter your username"
            error={errors.username}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            onFocus={() => setErrors({ ...errors, phone: null })}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => setPassword(text)}
            onFocus={() => setErrors({ ...errors, password: null })}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Register" onPress={validate} color={COLORS.secondary} />
          <TouchableOpacity onPress={handleLoginLink} style={styles.linkContainer}>
            <Text style={styles.loginLinkText}>back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  buttonContainer: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.grey,
    fontSize: 16,
    marginBottom: 20,
  },
};

export default RegisterScreen;
