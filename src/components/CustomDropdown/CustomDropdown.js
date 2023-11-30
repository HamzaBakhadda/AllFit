import { View, Text, StyleSheet,  } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker'; // Import from the new package

const CustomDropdown = ({ control, name, rules = {}, placeholder, iconName, items }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#F1F6F9",
      width: "100%",
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
    }
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : "#212A3E" }]}>
            <View style={styles.inputContainer}>
              {iconName && <Icon style={styles.icon} name={iconName} />}
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.dropdown}
              >
                {items.map((item, index) => (
                  <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
          </View>
          {error && <Text
            style={{
              color: 'red',
              alignSelf: 'stretch',
              paddingHorizontal: 22
            }}>{error.message || 'Error'}
          </Text>
          }
        </>
      )}
    />
  );
};

export default CustomDropdown;