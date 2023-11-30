import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import background from '../../../assets/images/background.jpeg';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    address: '',
    password: '',
    disability: '',
    username:'',
  });

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/user')
      .then(response => {
        setUserData({
          address: response.data.user.address,
          password: response.data.user.password,
          disability: response.data.user.disability,
          username:response.data.user.username,
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle error cases
      });
  }, []);

  const goBack = () => {
    navigation.navigate('Home');
  };
  const Edit = () => {
    navigation.navigate('Home');
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image style={styles.background} source={background} />
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Icon0 style={styles.goBackIcon} name="left" onPress={goBack} />
            <Icon1 style={styles.userIcon} name="user" />
            <View>
              <Text style={styles.title}>{userData.username}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <View style={styles.textComponent}>
              <Text style={styles.text}>{`Address: ${userData.address}`}</Text>
            </View>
            <View style={styles.textComponent}>
              <Text style={styles.text}>{`Password: ${userData.password}`}</Text>
            </View>
            <View style={styles.textComponent}>
              <Text style={styles.text}>{`Disability: ${userData.disability}`}</Text>
            </View>
            <View style={styles.signOutContainer}>
                <TouchableOpacity style={styles.signOutButton} onPress={Edit}>
            <Icon name="edit" style={styles.signOutIcon} />
            <Text style={styles.signOutText}>Edit</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: '100%',
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
    marginBottom: 40,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#5F7161',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
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
  content: {
    marginBottom: 100,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  textComponent: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
    width: '90%',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  signOutContainer: {
    position: 'absolute',
    bottom: -50,
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
    color: 'black',
  },
  signOutText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
