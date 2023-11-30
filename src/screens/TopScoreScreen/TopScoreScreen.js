import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import background from '../../../assets/images/background.jpeg';
import axios from 'axios';

const TopScoreScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  // Fetch user data when the component mounts
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

  const goToMyScoreScreen = () => {
    navigation.navigate('TopScoreProfile');
  };

  const goToMyEditScreen = () => {
    navigation.navigate('Home');
  };
  const addRecordScreen = () => {
    navigation.navigate('TopScoreNew');
  };
  const goBack = () => {
    navigation.navigate('Home'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Icon0 style={styles.goBackIcon} name="left" onPress={goBack} />
            <Icon1 style={styles.userIcon} name="user" />
            <View>
              <Text style={styles.title}>{username}</Text>
            </View>
          </View>
        </View>

        <View style={styles.featureContainer}>
            <TouchableOpacity style={styles.featureButton} onPress={goToMyScoreScreen}>
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Icon0 name="Trophy" style={styles.icon} />
                  <Text style={styles.featureText}>{"Exercise Name"}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={goToMyEditScreen}>
                  <Icon name="edit" style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.addUserButton} onPress={addRecordScreen}>
            <Icon0 name="pluscircleo" style={styles.addUserIcon} />
            <Text style={styles.addUserText}>Add New Record</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
scrollViewContent:{
  flexGrow: 1,
},
container: {
  flex: 1,
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
  flex: 1,
  justifyContent: 'space-between'
},
featureContainer: {
  marginBottom: 40,
},
featureButton: {
  alignItems: 'center',
  marginHorizontal: 20,
  marginVertical: 10,
  padding: 20,
  backgroundColor: '#FDFAF6',
  borderRadius: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '90%',
},
buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},
textContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginRight: 10,
},
icon: {
  fontSize: 30,
  color: '#8B7E74',
  marginHorizontal:10,
},
featureText: {
  fontSize: 18,
  textAlign: 'center',
  color: '#5F7161',
  fontWeight: 'bold',
},  
editButton: {},
editIcon: {
  fontSize: 20,
  color: '#5F7161',
},
addUserButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 10,
  alignSelf: 'center',
  marginBottom: 20, 
},
addUserIcon: {
  fontSize: 20,
  marginRight: 10,
  color: '#5F7161',
},
addUserText: {
  fontSize: 18,
  textAlign: 'center',
  color: '#5F7161',
  fontWeight: 'bold',
},

});

export default TopScoreScreen;