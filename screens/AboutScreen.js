import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../conts/colors';

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>About Our App</Text>
        </View>
      
      <Text style={styles.description}>
        Welcome to the Lost and Found Item App, your dedicated platform for reporting and locating lost items. Our app was meticulously crafted by our talented development team with the sole purpose of simplifying and expediting the process of reuniting you with your lost belongings.
      </Text>
      {/* Rest of your content */}
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
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666', 
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444', 
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#007bff', 
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default AboutScreen;
