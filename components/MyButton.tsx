import React from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

interface Props {
  customButtonStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  text: string;
  onPress: any;
}
export default (props: Props) => {
  const {text, onPress, customTextStyle, customButtonStyle} = props;
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={customButtonStyle}>
        <Text style={customTextStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
