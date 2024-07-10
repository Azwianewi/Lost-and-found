import React from 'react';
import { View, Text, Button } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Perform logout logic here, e.g., clear user data, authentication tokens, etc.
    // After logout, navigate back to the login screen or any other appropriate screen.
    navigation.navigate('Login'); // Replace 'Login' with your actual login screen route name
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>LogoutScreen</Text>
      <Text>Are you sure you want to log out?</Text>
      <Button title="Yes, Log Out" onPress={handleLogout} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default LogoutScreen;
