import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../conts/colors';
import { useNavigation } from '@react-navigation/native';

const PrivacyScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy</Text>
        </View>
        <ScrollView>
      <Text style={styles.subtitle}>Data Collection and Usage:</Text>
      <Text style={styles.content}>
        This is the privacy policy for our app. We value your privacy and are committed to protecting your personal information.

        Clearly state what types of data the app collects from users and how it will be used. 
        This should include personal information, device data, location data, and any other data that may be gathered during app usage.
      </Text>

      <Text style={styles.subtitle}>User Consent:</Text>
      <Text style={styles.content}>
      Obtain explicit consent from users before collecting any personal or sensitive data. 
      Make sure the consent process is easily understandable and accessible.
      </Text>
      <Text style={styles.subtitle}> Data Storage and Protection:</Text>
      <Text style={styles.content}>
      Describe how the app will store and protect user data. Ensure that the data is securely encrypted, both in transit and at rest, to prevent unauthorized access.

      </Text>
      <Text style={styles.subtitle}>Third-Party Services:</Text>
      <Text style={styles.content}>
       If your app integrates with third-party services (e.g., analytics, advertising, payment gateways), disclose the names of these services and how they handle user data.
      </Text>
      <Text style={styles.subtitle}>User Rights:</Text>
      <Text style={styles.content}>
       Inform users about their rights regarding their data, including the ability to access, modify, and delete their information. Provide a clear process for users to exercise these rights.
      </Text>
      <Text style={styles.subtitle}>Security Measures:</Text>
      <Text style={styles.content}>
       Detail the security measures implemented in the app to protect user data from unauthorized access, such as secure authentication, two-factor authentication, and encryption protocols.

      </Text>
      <Text style={styles.subtitle}>Data Sharing and Disclosure:</Text>
      <Text style={styles.content}>
       Be transparent about when and why user data may be shared with third parties and under what circumstances it will be disclosed (e.g., legal requirements).

      </Text>
      <Text style={styles.subtitle}>Children's Privacy::</Text>
      <Text style={styles.content}>
      If the app is targeted at children or knowingly collects data from them, comply with relevant laws, such as the Children's Online Privacy Protection Act (COPPA) in the United States.
      </Text>
      <Text style={styles.subtitle}>Data Breach Notification:</Text>
      <Text style={styles.content}>
         Explain the procedures your app follows in case of a data breach and how users will be notified if their data is compromised.
      </Text>
      <Text style={styles.subtitle}>App Permissions:</Text>
      <Text style={styles.content}>
      Be clear about the permissions the app requires to function correctly, and justify why each permission is necessary for the app's core features.
      </Text>
      <Text style={styles.subtitle}>Updates and Notifications: </Text>
      <Text style={styles.content}>
      Inform users about the process for app updates and how they will be notified of any changes to the privacy and security policy.
      </Text>
      <Text style={styles.subtitle}>Opt-Out Options:</Text>
      <Text style={styles.content}>
       Provide users with the option to opt-out of data collection and sharing, and explain how this may affect their app experience.
      </Text>
      <Text style={styles.subtitle}> Anonymous Data:</Text>
      <Text style={styles.content}>
      Clarify whether the app collects any anonymous data for analytics purposes and how it differs from personally identifiable information.
      </Text>
      <Text style={styles.subtitle}>User Education:</Text>
      <Text style={styles.content}>
        Include information and resources to educate users about online privacy best practices and how to safeguard their personal information.
      </Text>
      <Text style={styles.subtitle}>Contact Information:</Text>
      <Text style={styles.content}>
          Provide contact details for users to reach out with privacy-related inquiries or concerns.
      </Text>
      </ScrollView>
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
  subtitle : {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyScreen;
