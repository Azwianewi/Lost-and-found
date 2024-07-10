import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import Input from '../components/Input';
import Loader from '../components/Loader';
import axios from 'axios';
import COLORS from '../conts/colors';
import logo from '../assets/user.png';

const Button = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, backgroundColor: color || COLORS.purple }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Please input username';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Please input password';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleLogin();
    }
  };

  const handleRegisterLink = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleForgotPasswordLink = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/login.php',
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.status === 200 && response.data.message === 'User logged in successfully') {
        // User is found and password is correct, store the token and user ID securely
        const token = response.data.token;
        const userId = response.data.user.id; // Assuming user ID is available in the response data
        // Store the token and user ID securely (e.g., using AsyncStorage)
        // For example:
        // await AsyncStorage.setItem('token', token);
        // await AsyncStorage.setItem('userId', userId);
        navigation.navigate('HomeScreen', { username: username });
      } else {
        // Display appropriate error message
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => setUsername(text)}
            onFocus={() => setErrors({ ...errors, username: null })}
            iconName="account-outline"
            label="username"
            placeholder="Enter your username address"
            error={errors.username}
            inputStyle={styles.inputText}
          />
          <Input
            onChangeText={(text) => setPassword(text)}
            onFocus={() => setErrors({ ...errors, password: null })}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            inputStyle={styles.inputText}
          />
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPasswordLink}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button title="Login" onPress={validate} color={COLORS.secondary} />
          <TouchableOpacity onPress={handleRegisterLink} style={styles.linkContainer}>
            <Text style={styles.registerLinkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
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
  linkContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderBottomWidth: 0,
    borderColor: COLORS.black,
  },
  registerLinkText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: COLORS.secondary,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
