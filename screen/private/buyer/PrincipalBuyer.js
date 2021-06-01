import DrawerBuyer from '../../../components/DrawerBuyer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase from '../../../service/Firebase';
import ViewProducts from './ViewProducts';
import React, { useState, useEffect } from 'react';
import FullScreen from './FullScreen';
import ReduceProducts from './ReduceProducts';
import ProductDetails from './ProductDetails';
import ProductsFiltered from './ProductsFiltered';

const PrincipalBuyer = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  const [user, setUser] = useState(null);

  useEffect(() => {
    Firebase.CurrentUser().then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={() => {
        return <DrawerBuyer navigation={navigation} user={user} />;
      }}
      initialRouteName="ViewProducts"
      drawerPosition={'left'}
    >
      <Drawer.Screen name="FullScreen" component={FullScreen} />
      <Drawer.Screen name="ReduceProducts" component={ReduceProducts} />
      <Drawer.Screen name="ProductsFiltered" component={ProductsFiltered} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
    </Drawer.Navigator>
  );
};

export default PrincipalBuyer;
