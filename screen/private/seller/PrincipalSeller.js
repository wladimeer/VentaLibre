import Firebase from '../../../service/Firebase';
import DrawerSeller from '../../../components/DrawerSeller';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import ProductsFiltered from './ProductsFiltered';
import PurchaseDetails from './PurchaseDetails';
import ProductDetails from './ProductDetails';
import ReduceProducts from './ReduceProducts';
import UpdateProduct from './UpdateProduct';
import ViewProducts from './ViewProducts';
import ViewRatings from './ViewRatings';
import FullScreen from './FullScreen';
import NewProduct from './NewProduct';
import ViewSales from './ViewSales';
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
        return <DrawerSeller navigation={navigation} user={user} />;
      }}
      initialRouteName="ViewProducts"
      drawerPosition={'left'}
    >
      <Drawer.Screen name="Continue" component={Continue} />
      <Drawer.Screen name="NewProduct" component={NewProduct} />
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="PurchaseDetails" component={PurchaseDetails} />
      <Drawer.Screen name="ProductsFiltered" component={ProductsFiltered} />
      <Drawer.Screen name="ReduceProducts" component={ReduceProducts} />
      <Drawer.Screen name="UpdateProduct" component={UpdateProduct} />
      <Drawer.Screen name="ViewRatings" component={ViewRatings} />
      <Drawer.Screen name="FullScreen" component={FullScreen} />
      <Drawer.Screen name="ViewSales" component={ViewSales} />
    </Drawer.Navigator>
  );
};

export default PrincipalSeller;
