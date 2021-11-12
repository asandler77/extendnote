import 'react-native-gesture-handler';
import React from 'react';
import Notes from './components/Notes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateNote from './components/CreateNote';

const Stack = createStackNavigator();
const App = () => {
  return (
      // <Notes />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="CreateNote" component={CreateNote} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
