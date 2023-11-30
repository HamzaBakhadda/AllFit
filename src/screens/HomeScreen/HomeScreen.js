import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import background from '../../../assets/images/background.jpeg';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); // State to store the username

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/user')
      .then(response => {
        setUsername(response.data.user.username);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle error cases
      });
  }, []);
  
  


  const signOut = async () => {
    try {
      const response = await axios.post('http://192.168.56.1:3000/logout');
      if (response.data.message === 'Logout successful') {
        navigation.navigate('SignIn'); // Navigate to SignIn screen after successful logout
      } else {
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error('Logout Error:', error);s
      // Handle error cases
    }
  };

  const goToMyExerciseScreen = () => {
    // Navigate to the MyStockScreen
    navigation.navigate('Training');
  };

  const goToTopScoreScreen = () => {
    // Navigate to the SalesScreen
    navigation.navigate('TopScore');
  };

  const goToProfileScreen = () => {
    // Navigate to the SalesScreen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          <Icon0 style={styles.userIcon} name="user" />
          <View>
          <Text style={styles.title}>{username}</Text>
            <Text style={styles.subTitle}>WELCOME</Text>
          </View>
        </View>
      </View>
      <View style={styles.featureContainer}>
        <TouchableOpacity style={styles.featureButton} onPress={goToMyExerciseScreen}>
          <Icon1 name="weight-lifter" style={styles.icon} />
          <Text style={styles.featureText}>Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={goToTopScoreScreen}>
          <Icon0 name="Trophy" style={styles.icon} />
          <Text style={styles.featureText}>Performance</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.featureContainer}>
          <TouchableOpacity style={styles.featureButton} onPress={goToProfileScreen}>
          <Icon name="user" style={styles.icon} /> 
          <Text style={styles.featureText}>Profile</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Icon0 name="logout" style={styles.signOutIcon} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 70,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    fontSize: 50,
    color: '#5F7161',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5F7161',
  },
  subTitle: {
    fontSize: 18,
    color: '#5F7161',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  featureButton: {
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#FDFAF6',
    borderRadius: 20,
  },
  icon: {
    fontSize: 80,
    color: '#8B7E74',
  },
  featureText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#5F7161',
    fontWeight: 'bold',
  },
  signOutContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  signOutIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#F47C7C',
  },
  signOutText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#F47C7C',
    fontWeight: 'bold',
  },
});

export default HomeScreen;