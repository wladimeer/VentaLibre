import React, { useState, useEffect } from 'react';
import DrawerDesign from '../../../components/DrawerDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase from '../../../service/Firebase';
import ProductDetails from './ProductDetails';
import ViewProducts from './ViewProducts';
import FullScreen from './FullScreen';

const PrincipalSeller = () => {
  const Drawer = createDrawerNavigator();

  const [user, setUser] = useState();

  useEffect(() => {
    Firebase.CurrentUser().then((response) => {
      setUser(response);
    });
  }, []);

  const Content = () => {
    return <DrawerDesign user={user} />;
  };

  return (
    <Drawer.Navigator
      drawerContent={Content}
      initialRouteName="ViewProducts"
      drawerPosition={'left'}
    >
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="FullScreen" component={FullScreen} />
    </Drawer.Navigator>
  );
};

export default PrincipalSeller;
