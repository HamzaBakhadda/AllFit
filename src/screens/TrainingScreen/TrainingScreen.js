import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import background from '../../../assets/images/background.jpeg';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TrainingScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [exerciseNames, setExerciseNames] = useState([]);

  // Fetch user data when the component mounts
  useEffect(() => {
    axios.get('http://192.168.56.1:3000/user')
      .then(response => {
        setUsername(response.data.user.username);
        // Fetch exercise names based on user's disability
        fetchExerciseNames(response.data.user.disability);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const fetchExerciseNames = async (userDisability) => {
    try {
      const endpoint = getExerciseEndpoint(userDisability);
      const exercisesResponse = await axios.get(`http://192.168.56.1:3000/${endpoint}`);
      const names = exercisesResponse.data.exercises.map(exercise => exercise.exercise_name);
      setExerciseNames(names);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const getExerciseEndpoint = (disability) => {
    switch (disability) {
      case 'Healthy':
        return 'NormalExercises';
      case 'onelegwith':
        return 'oneLegWheelchairExercises';
      case 'onelegwithout':
        return 'oneLegNoWheelchairExercises';
      case 'twolegswithout':
        return 'twoLegsNoWheelchairExercises';
      case 'twolegswith':
        return 'twoLegsWheelchairExercises';
      default:
        return '';
    }
  };

  const goToMyExoScreen = () => {
    navigation.navigate('ExerciseProfile');
  };
  const goBack = () => {
    navigation.navigate('Home'); 
  };
  const { control, handleSubmit } = useForm();
  const dropdownItems = [
    { label: 'Fitness Level', value: '' },
    { label: ' Beginner', value: 'beginner' },
    { label: ' Intermediate', value: 'intermediate' },
    { label: ' Advanced', value: 'advanced' }
  ];

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
      <View style={styles.dropdownContainer}>
        <CustomDropdown
          name="Fitness Level"
          control={control}
          items={dropdownItems}
          rules={{ required: 'Ce champ est requis' }}
        />
      </View>

<View style={styles.featureContainer}>
            {exerciseNames.map((exerciseName, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureButton}
                onPress={() => console.log(`Clicked on ${exerciseName}`)}
              >
                <View style={styles.buttonContent}>
                  <View style={styles.textContainer}>
                    <Icon name="weight-lifter" style={styles.icon} />
                    <Text style={styles.featureText}>{exerciseName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
dropdownContainer: {
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
  marginTop: 20, 
},
featureButton: {
  alignItems: 'center',
  marginHorizontal: 20,
  marginBottom: 25,  // Reduce the bottom margin to bring feature containers closer
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

export default TrainingScreen;