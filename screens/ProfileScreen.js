import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'; // Import Platform from react-native
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import COLORS from '../conts/colors';

const ProfileScreen = ({ route }) => {
  const { username, id } = route.params;
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    id :'',
    phone: '',
    email: '', 
  });

  const [profileImage, setProfileImage] = useState(null); // Changed ProfileImage to profileImage (lowercase letter)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'https://apps.netiscrm.co.za/lostandfoundapi/api/fetchUser.php',
          {
            params: {
              username: username,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;

        if (data && data.phone && data.email) {
          setUserData({
            id:data.id,
            phone: data.phone,
            email: data.email,
          });
        } else {
          console.error('Phone or email not found in response data');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => { // Moved fetchProfileImage to a separate useEffect
    const fetchProfileImage = async () => {
      try {
        const profileImageUri = await AsyncStorage.getItem('ProfileImage');
        if (profileImageUri !== null) {
          setProfileImage(profileImageUri);
        }
      } catch (error) {
        console.error('Error retrieving profile image from AsyncStorage:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', { username });
  };
  
  const handleSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        console.log('Selected image URI:', result.uri);
        setProfileImage(result.uri);
        await uploadProfileImage(result.uri); // Wait for the uploadProfileImage function to complete before setting AsyncStorage
        await AsyncStorage.setItem('ProfileImage', result.uri); // Store the image URI in AsyncStorage
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  const uploadProfileImage = async (imageUri) => {
    try {
      console.log('Uploading profile image:', imageUri);
  
      if (!imageUri) {
        console.error('Profile image not provided');
        return;
      }
  
      const formData = new FormData();
  
      if (Platform.OS === 'web') {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        formData.append('ProfileImage', blob, 'profile_image.jpg');
      } else {
        const base64ImageData = imageUri.split(',')[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64ImageData}`).then((res) =>
          res.blob()
        );
        formData.append('ProfileImage', blob, 'profile_image.jpg');
      }
  
      // Append user ID to the formData
      formData.append('id', userData.id);
  
      const response = await axios.post(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/ProfileUpload.php', // Updated API endpoint URL
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Profile image uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      console.error('Error response:', error.response ? error.response.data : 'No response');
      console.error('Error status code:', error.response ? error.response.status : 'No status');
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
      <TouchableOpacity onPress={handleSelectImage}>
        {profileImage ? ( // Changed ProfileImage to profileImage (lowercase letter)
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require('../assets/user.png')} style={styles.profileImage} />
        )}
      </TouchableOpacity>

      <View style={styles.profileDetails}>
        <View style={styles.detailItem}>
          <Feather name="user" size={24} color="black" style={styles.detailIcon} />
          <Text style={styles.detailText}>{username}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="phone" size={24} color="black" style={styles.detailIcon} />
          <Text style={styles.detailText}>{userData.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="link" size={24} color="black" style={styles.detailIcon} />
          <Text style={styles.detailText}>{userData.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoHomeScreen}>
          <Feather name="home" size={24} color="#FFFFFF" style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoAddScreen}>
          <Feather name="plus-circle" size={24} color="#FFFFFF" style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoClaimScreen}>
          <Feather name="clipboard" size={24} color="#FFFFFF" style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#FFF',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetails: {
    width: '80%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomIconContainer: {
    padding: 10,
  },
  bottomIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default ProfileScreen;
