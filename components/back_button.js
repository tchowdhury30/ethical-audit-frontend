import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 5 }}>
      <Icon name="arrow-back" size={25} color="#000" />
    </TouchableOpacity>
  );
}

export default BackButton;
