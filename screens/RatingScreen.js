import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../conts/colors';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';

const RatingScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const submitFeedback = () => {
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);

    // Send a POST request to your API
    axios.post('https://apps.netiscrm.co.za/lostandfoundapi/api/ratings.php', {
      rating: rating,
      feedback: feedback,
    })
    .then((response) => {
      
      console.log('API Response:', response.data);

      
      setRating(0);
      setFeedback('');
    })
    .catch((error) => {
      
      console.error('API Error:', error);
    });
  };

 
  const starIcons = Array(5)
    .fill(0)
    .map((_, index) => (
      <TouchableOpacity
        key={index}
        style={styles.ratingButton}
        onPress={() => handleRatingChange(index + 1)}
      >
        <FeatherIcon
          name="star"
          size={30}
          color={index < rating ? COLORS.secondary : 'black'}
        />
      </TouchableOpacity>
    ));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Ratings</Text>
        </View>

        <Text style={styles.heading}>Your Feedback Matters!</Text>
   
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rate (1-5):</Text>
        {starIcons}
      </View>
      <TextInput
        placeholder={'Your Feedback'}
        style={styles.feedbackInput}
        onChangeText={handleFeedbackChange}
        value={feedback}
        multiline
      />
      <TouchableOpacity onPress={submitFeedback} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 20,
    marginRight: 10,
  },
  ratingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  feedbackInput: {
    width: '100%',
    marginTop: 20,
    borderBottomColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    padding: 10,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RatingScreen;
