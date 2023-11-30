import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import background from '../../../assets/images/background.jpeg';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Icon0 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';

const TopScoreNewScreen = () => {
  const navigation = useNavigation();
  const [id, setid] = useState('');
  const [username, setUsername] = useState('');
  const { control, handleSubmit, errors } = useForm();

  // Fetch user data when the component mounts
  useEffect(() => {
    axios.get('http://192.168.56.1:3000/user')
      .then(response => {
        setid(response.data.user.id);
        setUsername(response.data.user.username);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle error cases
      });
  }, []);

  const onAddPressed = async (data) => {
    try {
      const response = await axios.post('http://192.168.56.1:3000/saveTopScore', {
        user_id: id,
        number_of_repetition: data['Number of reps'],
        maximum_weight: data['Maximium Weight'],
      });

      console.log(response.data.message);
      navigation.navigate('TopScore');
      // Handle success, e.g., show a success message or navigate to another screen
    } catch (error) {
      console.error('Error saving top score:', error.response ? error.response.data : error.message);
      // Handle error, e.g., show an error message to the user
    }
  };


  const dropdownItems = [
    { label: 'Choose an Exercise', value: '' },
    { label: 'Exercise 1', value: 'Exercise1' },
    { label: 'Exercise 2', value: 'Exercise2' },
    { label: 'Exercise 3', value: 'Exercise3' }
  ];

  const onRetour = () => {
    navigation.navigate('TopScore');
  }

  return (

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Icon0 style={styles.goBackIcon} name="left" onPress={onRetour} />
            <Icon1 style={styles.userIcon} name="user" />
            <View>
            <Text style={styles.title}>{username}</Text>
            </View>
          </View>
        </View>

        <CustomDropdown
          name="exercises"
          control={control}
          items={dropdownItems}
          rules={{ required: 'Ce champ est requis' }}
        />

        <CustomInput
          control={control}
          name="Number of reps"
          placeholder="Number of reps"
          rules={{ required: 'Required Field' }}
        />

        <CustomInput
          control={control}
          name="Maximium Weight"
          placeholder="Maximium Weight"
          rules={{ required: 'Required Field' }}

        />

         {errors && (
            <Text style={styles.errorText}>{errors['Number of reps']?.message}</Text>
          )}
          {errors && (
            <Text style={styles.errorText}>{errors['Maximium Weight']?.message}</Text>
          )}
          
        <View style={styles.button}>
        <CustomButton text="Add" onPress={handleSubmit(onAddPressed)} style={{ backgroundColor: 'black' }} />
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
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#212A3E',
    marginBottom: 100,
  },
  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    
  },
  container: {
    backgroundColor: "#F1F6F9",
    width: "90%",
    borderColor: "#212A3E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  icon: {
    fontSize: 20,
    color: '#212A3E',
    marginRight: 10,
    marginTop: 0,
  },
  dropdown: {
    flex: 1,
    color: '#212A3E',
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
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
});

export default TopScoreNewScreen;