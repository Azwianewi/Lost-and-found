import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../conts/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import axios from 'axios'; // Import axios
import { Alert } from 'react-native';

const ResetButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, backgroundColor: color || COLORS.secondary }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false); 

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

    setErrors(newErrors);

    if (isValid) {
      setLoading(true); 
      axios.post('https://apps.netiscrm.co.za/lostandfoundapi/api/resetpassword.php', { email })
        .then(response => {
          setLoading(false); // Hide loader
          // Handle success response, e.g., show success message or navigate to another screen
          Alert.alert('Success', 'Password reset email sent successfully', [
            { text: 'OK', onPress: () => navigation.navigate('HomeScreen') } // Navigate to HomeScreen
          ]);
        })
        .catch(error => {
          setLoading(false); // Hide loader
          // Handle error response, e.g., show error message
          Alert.alert('Error', 'Failed to reset password. Please try again later.');
        });
    }
  };

  const handleLoginLink = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Forgot Password</Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setErrors({ ...errors, email: null })}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <ResetButton title="Reset Password" onPress={validate} color={COLORS.secondary} />
          <TouchableOpacity onPress={handleLoginLink} style={styles.linkContainer}>
            <Text style={styles.linkText}>Back to Login</Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center', 
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
  title: {
    color: COLORS.DarkCharcoal,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.grey,
    fontSize: 12,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%', 
    maxWidth: 400, 
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderBottomWidth: 0,
    borderColor: COLORS.black,
  },
  linkText: {
    color: '#7E6AD1',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  registerLinkText: {
    color: '#7E6AD1',
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
    color: '#7E6AD1',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
