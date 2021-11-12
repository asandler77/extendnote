import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Create Note</Text>
      </View>
      <TextInput
        style={{
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
        }}
        autoFocus={true}
        multiline
        value={input}
        placeholder={'Write the note'}
        onSubmitEditing={saveTheNote}
        onChangeText={onChangeText}
      />
      {/*<Button title="Save the note" onPress={goToNotes} />*/}
      <TouchableOpacity style={styles.button} onPress={goToNotes}>
        <Text style={styles.text}> Save the note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#ffd700',
    margin: 5,
    borderRadius: 10,
    height: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
  },
});
