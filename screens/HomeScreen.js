import React, { useState, useEffect } from 'react';
import { View,
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput, 
   FlatList, 
   Image, 
   ScrollView, 
   RefreshControl, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Swiper from 'react-native-swiper/src';
import COLORS from '../conts/colors';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const {id, username, phone, email } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [recentListings, setRecentListings] = useState([]);
  const [filteredRecentListings, setFilteredRecentListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
        const response = await axios.get('https://apps.netiscrm.co.za/lostandfoundapi/api/fetch.php');
        console.log('API Response:', response.data);
        setRecentListings(response.data);
        setFilteredRecentListings(response.data);
        setRefreshing(false); // Set refreshing to false when data is loaded
      } catch (error) {
        console.error('Error fetching data:', error);
        setRefreshing(false); // Set refreshing to false on error
      }
    };
  const filterListings = () => {
    if (!recentListings || !searchText) {
      setFilteredRecentListings(recentListings);
      return;
    }

    const filteredListings = recentListings.filter(item => {
      return item.itemName && item.itemName.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredRecentListings(filteredListings);
  };

  useEffect(() => {
    filterListings();
  }, [searchText, recentListings]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listingItem}
    >
      <Text style={styles.listingTitle}>{item.itemName}</Text>
      <Text style={styles.listingDescription}>{item.description}</Text>
      <Text style={styles.listingLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  const handleViewAllRecentListings = () => {
    navigation.navigate('ViewAllRecentListingsScreen', {username});
  };

  const handleLogout = () => {
    console.log('Logged out!');
    navigation.navigate('LoginScreen');
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
  

  const slides = [
    {
      image: require('../assets/banner/Radar.jpg'),
      text: 'Lost and Found Item',
      description: 'Welcome to our Lost and Found Item. Have you lost something important? Or maybe you found an item that doesnt belong to you? Learn how to report lost or found items and how to claim a lost item in our app.',
    },
    {
      image: require('../assets/banner/Jodhpur.jpg'),
      text: 'How to Report',
      description: 'Follow these steps to report:Click on the second icon on the app.Fill out the required information, including a description, location, and contact details. Submit your report.',
      onPressButton: handleHowToReportClick, 
    },
    {
      image: require('../assets/banner/Radar.jpg'),
      text: 'Look for the option',
      description: "On the bottom bar, there is a third icon for claims. Click on the icon, and there will be information that you will need to fill out. Click here to begin",
      onPressButton: handleButton3Click, 
    },
    {
      image: require('../assets/banner/bb.jpg'),
      text: 'Provide the information',
      description: 'Thank you for using our Lost and Found app. We hope you found this guide helpful in reporting lost or found items and claiming lost items. If you have any questions or need assistance, please donnot hesitate to contact our support team through the app. We wish you the best of luck in reuniting with your lost items!.',
    },
  ];
  const handleHowToReportClick = () => {
    navigation.navigate('AddScreen', { username });
  };
  const handleButton3Click = () => {
    console.log("Button clicked - Navigating to ClaimScreen");
    navigation.navigate('ClaimScreen', { username, id }); // Pass the user_id parameter
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
          {username.length > 10 ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ marginBottom: 5 }}>
                <Text style={styles.username}>{username}</Text>
              </View>
            </ScrollView>
          ) : (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.username}>{username}</Text>
            </View>
          )}
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

      {/* Swiper */}
      <View style={styles.swiperContainer}>
      <Swiper
          loop={false}
          showsPagination={true}
          style={styles.slider}
          paginationStyle={styles.paginationStyle}
          activeDotStyle={styles.activePaginationDotStyle}
          buttonWrapperStyle={styles.buttonWrapperStyle}
          height={200}>
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={slide.image}
                style={styles.backgroundImage}
                resizeMode="cover"
              />
              <View style={styles.slideContent}>
                <Text style={styles.slideText}>{slide.text}</Text>
                <ScrollView style={styles.slideDescriptionContainer}>
                  <Text style={styles.slideDescription}>
                    {slide.description}
                  </Text>
                </ScrollView>
                <TouchableOpacity style={styles.slideButton} onPress={slide.onPressButton}>
                  <Text style={styles.slideButtonText}>Click here</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Recent Listings */}
      <View style={styles.recentListings}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Listings</Text>
          <TouchableOpacity onPress={handleViewAllRecentListings}>
            <Text style={styles.viewAllLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredRecentListings}
          keyExtractor={(item, index) => (item.user_id ? item.user_id.toString() : index.toString())}
          renderItem={renderItem}
        />
      </View>

      {/* Report Lost Item */}

      {/* Featured Items */}

      {/* Bottom Bar */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={gotoHomeScreen}>
            <Feather name="home" size={24} color="#FFFFFF" style={styles.bottomIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoAddScreen}>
            <Feather name="plus-circle" size={24} color={COLORS.primary} style={styles.bottomIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoClaimScreen}>
            <Feather name="clipboard" size={24} color={COLORS.primary} style={styles.bottomIcon} />
          </TouchableOpacity>
        </View>
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
  logoutOptionContainer: {
    marginTop: 20,
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
  swiperContainer: {
    height: 200,
  },
  slider: {},
  paginationStyle: {}, 
  buttonWrapperStyle: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  slideContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  slideDescription: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginVertical: 20,
  },
  slideButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  slideButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  slideDescriptionContainer: {
    maxHeight: 100,
  },
  recentListings: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllLink: {
    color: COLORS.secondary,
  },
  listingItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,

  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listingDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 10
  },
  listingLocation: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  bottomIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default HomeScreen;