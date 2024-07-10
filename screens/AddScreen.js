import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import COLORS from '../conts/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';

const AddScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const username = route.params?.username || '';
  const user_id = route.params?.user_id || '';
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [itemType, setItemType] = useState('Lost');
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);


  const sendDataToApi = async () => {
    try {
      const response = await axios.post(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/lostfound.php',
        {
          userId: user_id,
          itemType: 'Lost',
          itemType,
          itemName,
          description,
          location,
          contactInfo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('API response:', response.data);
      setSuccessMessage('Item added successfully');
      setSuccessMessageVisible(true);
      navigation.navigate('HomeScreen', {user_id, username});
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleAddItem = () => {
    sendDataToApi();
    setSuccessMessageVisible(true);
    setTimeout(() => {
      setSuccessMessageVisible(false);
      navigation.navigate('HomeScreen', { user_id });
    }, 3000);
  };


  const gotoHomeScreen = () => {
    navigation.navigate('HomeScreen', { username });
  };

  const gotoAddScreen = () => {
    navigation.navigate('AddScreen', { user_id, username });
  };

  const gotoClaimScreen = () => {
    navigation.navigate('ClaimScreen', { username });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Add Lost or Found Item</Text>
        {successMessageVisible && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}

        <View style={styles.radioContainer}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Lost"
              color="#7E6AD1"
              status={itemType === 'Lost' ? 'checked' : 'unchecked'}
              onPress={() => setItemType('Lost')}
            />
            <Text style={styles.radioButtonText}>Lost</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Found"
              color="#7E6AD1"
              status={itemType === 'Found' ? 'checked' : 'unchecked'}
              onPress={() => setItemType('Found')}
            />
            <Text style={styles.radioButtonText}>Found</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Information"
          value={contactInfo}
          onChangeText={(text) => setContactInfo(text)}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback onPress={gotoHomeScreen}>
            <View style={styles.androidButton}>
              <Feather name="home" size={24} color="#FFFFFF" style={styles.bottomIcon} />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity style={styles.bottomIconContainer} onPress={gotoHomeScreen}>
            <Feather name="home" size={24} color="#FFFFFF" style={styles.bottomIcon} />
          </TouchableOpacity>
        )}

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
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText:{
   color: 'black',
  },
  timeText:{
    color:'black',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 5,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 20,
    alignItems: 'flex-end',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  calendarIconContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
  },  
  clockIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
});

export default AddScreen;

