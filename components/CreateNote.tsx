import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

export default ({navigation}: any) => {
  const [input, setInput] = useState('');
  const [data, setData] = useState('');

  const goToNotes = () => {
    console.log('goToNotes data', data);
    navigation.navigate({
      name: 'Notes',
      params: {data: input},
      merge: true,
    });
    navigation.navigate('Notes');
  };

  const onChangeText = (text: string) => setInput(text);

  const saveTheNote = () => {
    setData(input);
  };
  return (
    <View>
      <Text>Create Input</Text>
      <TextInput
        style={{
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
        }}
        multiline
        value={input}
        placeholder={'Write the note'}
        onSubmitEditing={saveTheNote}
        onChangeText={onChangeText}
      />
      <Button title="Save the note" onPress={goToNotes} />
    </View>
  );
};
