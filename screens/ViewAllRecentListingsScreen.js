import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../conts/colors';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

const ViewAllRecentListingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        'https://apps.netiscrm.co.za/lostandfoundapi/api/fetchViewAll.php'
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setListings(response.data);
      } else {
        setError('No listings found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
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
     <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>View All Recent Listings</Text>
        </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView
          style={styles.listingsContainer}
          contentContainerStyle={styles.listingsContent}
        >
          {listings.map((listing) => (
            <View key={listing.id} style={styles.card}>
              <Text style={styles.listingTitle}>{listing.itemName}</Text>
              <Text style={styles.description}>{listing.description}</Text>
              {/* Other fields */}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={gotoHomeScreen}
        >
          <Feather name="home" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={gotoAddScreen}
        >
          <Feather name="plus-circle" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={gotoClaimScreen}
        >
          <Feather name="clipboard" size={24} color={COLORS.white} />
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  listingsContainer: {
    flex: 1,
  },
  listingsContent: {
    paddingBottom: 80, // Adjust this value to ensure the last card is fully visible
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
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
    bottom: 0, 
    left: 0, 
    right: 0, 
  },
  bottomIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default ViewAllRecentListingsScreen;
