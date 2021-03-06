import 'react-native-gesture-handler';
import React from 'react';
import Notes from './components/Notes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateNote from './components/CreateNote';
import MyCalendar from './components/MyCalendar';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="Calendar" component={MyCalendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
