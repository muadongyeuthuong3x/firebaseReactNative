import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen  from './screen/auth/SignInScreen'
import ListChat from './screen/Chat/ListChat'
import chatItem from './screen/Chat/chatItem'
const Stack = createNativeStackNavigator();




function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="SignIn"    component={SignInScreen} />
         <Stack.Screen name="ListChat"    component={ListChat} /> 
        <Stack.Screen name="itemChat"    component={chatItem} />
      </Stack.Navigator>  
    </NavigationContainer>
  
  );
}
export default App;