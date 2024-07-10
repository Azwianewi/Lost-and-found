import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import COLORS from '../conts/colors'; // Assuming this is correct

const NotificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Add state for menu visibility
  const [searchText, setSearchText] = useState(''); // Assuming search text state is managed elsewhere

  useEffect(() => {
    const apiUrl = 'https://apps.netiscrm.co.za/lostandfoundapi/api/matchingItem.php';
    const user_id = 1;

    axios.get(apiUrl, {
      params: {
        user_id: user_id,
      },
    })
    .then((response) => {
      // Successfully fetched notifications
      setNotifications(response.data);
    })
    .catch((error) => {
      console.error('Error fetching notifications:', error);
    });
  }, []);

  const gotoHomeScreen = () => {
    navigation.navigate('HomeScreen', { username });
  };
  const gotoAddScreen = () => {
    navigation.navigate('AddScreen', { username });
  };
  const gotoClaimScreen = () => {
    navigation.navigate('ClaimScreen', { username });
  };

  const handleLogout = () => {
    console.log('Logged out!');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setIsMenuVisible(!isMenuVisible)}>
          <Feather name="menu" size={24} color="#ffffff" style={styles.icon} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { username })}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.username} numberOfLines={1}>
                {username}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { username })}>
            <Feather name="user" size={24} color="#ffffff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen', { username })}>
            <Feather name="bell" size={24} color="#ffffff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Menu */}
      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Text style={[styles.menuItem, { color: '#ffffff' }]}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')}>
            <Text style={[styles.menuItem, { color: '#ffffff' }]}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('HelpCenterScreen')}>
            <Text style={[styles.menuItem, { color: '#ffffff' }]}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RatingScreen')}>
            <Text style={[styles.menuItem, { color: '#ffffff' }]}>Ratings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.menuItem, { color: '#ffffff' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search and Quick Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#666" style={styles.searchInputIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
        </View>
      </View>
      {/* Notifications */}
      <View style={styles.notificationContainer}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.notificationItemContainer}>
              <Text style={styles.notificationText}>
                {item.itemType === "found"
                  ? `Your lost item (${item.itemName}) has been found: ${item.description}`
                  : item.message}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id ? item.user_id.toString() : index.toString()}
          // Assuming item has a unique identifier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginRight: 5,
    marginTop: 10,
  },
  username: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 5, 
    marginTop:9,
  },
  menu: {
    backgroundColor: COLORS.secondary,
    padding: 20,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  searchContainer: {
    padding: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  searchInputIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.secondary,
  },
  notificationContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default NotificationScreen;
