import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../conts/colors';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('PrivacyScreen')}
      >
        <Text style={styles.optionText}>Privacy & Security</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('NotificationScreen')}
      >
        <Text style={styles.optionText}>Notification</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('TwoStepVerificationScreen')}
      >
        <Text style={styles.optionText}>Two-Factor Authentication</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('PasswordResetScreen')}
      >
        <Text style={styles.optionText}>Password Reset Options</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('ClearCacheScreen')}
      >
        <Text style={styles.optionText}>Clear Cache</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9',
    marginTop: 50,
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom : 20, 
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  logoutOptionContainer: {
    backgroundColor: 'green',
  },
  optionText: {
    fontSize: 18,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
