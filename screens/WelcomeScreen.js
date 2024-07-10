import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/background_image.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome to the Lost and Found App
          {'\n\n'}
          Discover a world where lost items find their way home and the unexpected becomes a delightful surprise. Join us in reuniting cherished belongings and uncovering hidden treasures. Start your journey with us today!
        </Text>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#FFFFFF',
    lineHeight: 32, 
  },
  button: {
    backgroundColor: '#7E6AD1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
