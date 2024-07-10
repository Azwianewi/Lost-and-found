import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../conts/colors';

const TwoStepVerificationScreen = () => {
  const navigation = useNavigation();
  const [twoStepEnabled, setTwoStepEnabled] = useState(false);

  // Function to handle toggle switch
  const handleToggleSwitch = () => {
    setTwoStepEnabled(!twoStepEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Two-Step Verification</Text>
        </View>
      
      <View style={styles.optionContainer}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Enable Two-Step Verification</Text>
          <Switch
            value={twoStepEnabled}
            onValueChange={handleToggleSwitch}
            trackColor={{ false: '#ccc', true: COLORS.secondary }}
            thumbColor={twoStepEnabled ? COLORS.secondary : COLORS.secondary}
          />
        </View>
      </View>

      {/* Replace the button with a message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {twoStepEnabled
            ? 'Two-Step Verification is enabled.'
            : 'Two-Step Verification is disabled.'}
        </Text>
      </View>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  optionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
  backButton: {
    marginRight: 10,
  },
  messageContainer: {
    marginTop: 20,
  },
  messageText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TwoStepVerificationScreen;
