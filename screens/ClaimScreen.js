import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../conts/colors';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

const ClaimScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  //const [color, setColor] = useState('');
  const [idNumber, setId] = useState('');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [idImage, setIdImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ title: 'Select ID Image' });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          const selectedAsset = result.assets[0];
          setIdImage(selectedAsset);
        }
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('idNumber', idNumber);
      formData.append('itemName', itemName);
      formData.append('itemDescription', itemDescription);
      formData.append('contactInfo', contactInfo);
      formData.append('idImage', {
        uri: idImage.uri,
        type: 'image/jpeg',
        name: idImage.uri.split('/').pop(), 
      });

      const response = await axios.post('https://apps.netiscrm.co.za/lostandfoundapi/api/claim.php', formData);

      console.log('API Response:', response.data);

      // Optionally, navigate to another screen after successful submission
      navigation.navigate('HomeScreen', {username});
    } catch (error) {
      console.error('API Request Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gotoHomeScreen = () => {
    navigation.navigate('HomeScreen', { username });
  };
  const gotoAddScreen = () => {
    navigation.navigate('AddScreen', { username });
  };
  const gotoClaimScreen = () => {
    navigation.navigate('ClaimScreen', { username });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Claim Items</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="Your fullnames"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="ID Number"
              value={idNumber}
              onChangeText={(text) => setId(text)}
            />
          </View>
          <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={itemName}
              onChangeText={(text) => setItemName(text)}
            />
          </View>
          <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="Item Description"
              value={itemDescription}
              onChangeText={(text) => setItemDescription(text)}
            />
          </View>
         {/*  <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={color}
              onChangeText={(text) => setColor(text)}
            />
          </View>
          */}
          <View style={styles.inputWithMargin}>
            <TextInput
              style={styles.input}
              placeholder="Contact Info"
              value={contactInfo}
              onChangeText={(text) => setContactInfo(text)}
            />
          </View>
          <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
  <Text style={styles.imageButtonText}>Upload ID Image</Text>
</TouchableOpacity>

{ idImage && idImage.uri && (
  <View>
    <Image source={{ uri: idImage.uri }} style={styles.imagePreview} />
    <Text style={styles.imageFileName}>{idImage.fileName}</Text>
  </View>
)}

<TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
  {isSubmitting ? (
    <ActivityIndicator size="small" color={COLORS.white} />
  ) : (
    <Text style={styles.submitButtonText}>Submit Claim</Text>
  )} 
</TouchableOpacity>    
        </View>
      </ScrollView>
      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoHomeScreen}>
          <Feather name="home" size={24} color="#FFFFFF" style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoAddScreen}>
          <Feather name="plus-circle" size={24} color={COLORS.primary} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoClaimScreen}>
          <Feather name="clipboard" size={24} color={COLORS.primary} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.secondary,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWithMargin: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  idImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageInfoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  imageFileName: {
    fontSize: 16,
    color: 'red',  // or any other color that stands out
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimFormText: {
    fontSize: 16,
    marginBottom: 20,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bottomIconContainer: {
    padding: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    marginTop: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default ClaimScreen;
