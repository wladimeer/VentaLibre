import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalBuyer from './screen/private/buyer/PrincipalBuyer';
import PrincipalSeller from './screen/private/seller/PrincipalSeller';
import SignInScreen from './screen/public/SignInScreen';
import React from 'react';

const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const SellerScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PrincipalSeller" component={PrincipalSeller} />
    </Stack.Navigator>
  );
};

const BuyerScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PrincipalBuyer" component={PrincipalBuyer} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreens" component={AuthScreens} />
        <Stack.Screen name="SellerScreens" component={SellerScreens} />
        <Stack.Screen name="BuyerScreens" component={BuyerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
