import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import COLORS from '../conts/colors';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, id } = route.params;

  const [userData, setUserData] = useState({
    id: '',
    username: '',
    phone: '',
    email: '',
  });

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

        if (data.phone && data.email) {
          setUserData({
            id: data.id,
            username: data.username, 
            phone: data.phone,
            email: data.email,
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleSaveChanges = async () => {
    try {
      // Check if userData contains necessary fields
      if (!userData.id || !userData.username || !userData.phone || !userData.email) {
        console.error('Error: Incomplete user data');
        return;
      } 
      
      const response = await axios.put(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/editProfile.php',
        {
          id: userData.id,
          username: userData.username,
          phone: userData.phone,
          email: userData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Profile updated:', response.data);

      navigation.navigate('HomeScreen', { username: userData.username });

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const gotoAddScreen = () => {
    navigation.navigate('AddScreen', { username });
  };

  const gotoClaimScreen = () => {
    navigation.navigate('ClaimScreen', { username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
  

      <View style={styles.editField}>
        <Feather name="user" size={24} color="black" style={styles.editIcon} />
        <TextInput
          style={styles.editInput}
          placeholder="Edit Username"
          value={userData.username}
          onChangeText={(text) =>
            setUserData({ ...userData, username: text })
          }
        />
      </View>
      <View style={styles.editField}>
        <Feather name="phone" size={24} color="black" style={styles.editIcon} />
        <TextInput
          style={styles.editInput}
          placeholder="Edit Phone"
          value={userData.phone}
          onChangeText={(text) =>
            setUserData({ ...userData, phone: text })
          }
        />
      </View>
      <View style={styles.editField}>
        <Feather name="link" size={24} color="black" style={styles.editIcon} />
        <TextInput
          style={styles.editInput}
          placeholder="Edit Email"
          value={userData.email}
          onChangeText={(text) =>
            setUserData({ ...userData, email: text })
          }
        />
      </View>

      <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.goBack()}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  editIcon: {
    marginRight: 10,
  },
  editInput: {
    flex: 1,
    height: 60,
    paddingHorizontal: 30,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    fontSize: 16,
    color: 'black',
  },
  saveChangesButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

export default EditProfileScreen;