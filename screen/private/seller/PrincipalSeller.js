import React, { useState, useEffect } from 'react';
import DrawerDesign from '../../../components/DrawerDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase from '../../../service/Firebase';
import ProductDetails from './ProductDetails';
import UpdateProduct from './UpdateProduct';
import ViewProducts from './ViewProducts';
import FullScreen from './FullScreen';
import NewProduct from './NewProduct';
import Continue from './Continue';

const PrincipalSeller = ({ navigation }) => {
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
        return <DrawerDesign navigation={navigation} user={user} />;
      }}
      initialRouteName="ViewProducts"
      drawerPosition={'left'}
    >
      <Drawer.Screen name="NewProduct" component={NewProduct} />
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="UpdateProduct" component={UpdateProduct} />
      <Drawer.Screen name="FullScreen" component={FullScreen} />
      <Drawer.Screen name="Continue" component={Continue} />
    </Drawer.Navigator>
  );
};

export default PrincipalSeller;
