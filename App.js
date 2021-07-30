import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrincipalSeller from './screen/private/seller/PrincipalSeller';
import PrincipalBuyer from './screen/private/buyer/PrincipalBuyer';
import SignUpScreen from './screen/public/SignUpScreen';
import SignInScreen from './screen/public/SignInScreen';
import CreateScreen from './screen/public/CreateScreen';
import SplashScreen from 'react-native-splash-screen';
import React from 'react';

const Stack = createStackNavigator();

setTimeout(() => {
  SplashScreen.hide();
}, 1500);

const AuthScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
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

const MyTheme = {
  dark: false,
  colors: {
    card: 'transparent',
    primary: 'transparent',
    background: 'transparent',
    notification: 'transparent',
    border: 'transparent',
    text: 'transparent'
  }
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreens" component={AuthScreens} />
        <Stack.Screen name="SellerScreens" component={SellerScreens} />
        <Stack.Screen name="BuyerScreens" component={BuyerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
