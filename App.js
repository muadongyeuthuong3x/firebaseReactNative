import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen  from './screen/auth/SignInScreen'
const Stack = createNativeStackNavigator();




function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="SignIn"    component={SignInScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
export default App;