import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert  } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zAZ0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const SignUpScreen = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();
  
    const onSubmit = async (data) => {
      try {
        const { username, password, full_name, address, disability } = data;
    
        // Add the selected disability value to the request body
        const requestData = {
          username,
          password,
          full_name,
          address,
          disability: data.disabilityType, // Get the selected disability value from the form data
        };
    
        const response = await axios.post('http://192.168.56.1:3000/register', requestData);
    
        // Log the response data
        console.log('Response data:', response.data);
    
        if (response.data && response.data.message === 'Registration successful') {
          navigation.navigate('SignIn');
        } else {
          Alert.alert('Registration Error', 'Failed to register. Please try again.');
        }
      } catch (error) {
        // Log any error messages received from the server
        console.error('Request Error:', error);
    
        // Log the error response data if available
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
    
        Alert.alert('Registration Error', 'Failed to register. Please try again.');
      }
    };
    
    
    
    

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const dropdownItems = [
    { label: 'Choose your Disability', value: '' },
    { label: 'Not Applicable', value: 'Healthy' },
    { label: 'One dysfunctional Leg (With a wheelchair)', value: 'onelegwith' },
    { label: 'One dysfunctional Leg (Without a wheelchair)', value: 'onelegwithout' },
    { label: 'Two dysfunctional Legs (With a wheelchair)', value: 'twolegswith' },
    { label: 'Two dysfunctional Legs (Without a wheelchair)', value: 'twolegswithout' }
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="full_name"
          control={control}
          placeholder="Full Name"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            message: 'Username is invalid' ,
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            required: 'Repeat Password is required',
            validate: value => value === pwd || 'Password do not match',
          }}
        />
        <CustomInput
          name="address"
          control={control}
          placeholder="Address"
          rules={{
            required: 'Address is required',
          }}
        />
        <CustomDropdown
          name="disabilityType"
          control={control}
          items={dropdownItems}
          rules={{ required: 'Disability is required' }}
        />
         <CustomButton
          text="Register"
          onPress={handleSubmit(onSubmit)} // Use handleSubmit with the onSubmit function
          bgColor="#C71111"
          fgColor="white"
        />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
