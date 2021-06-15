import DrawerBuyer from '../../../components/DrawerBuyer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase from '../../../service/Firebase';
import ViewProducts from './ViewProducts';
import React, { useState, useEffect } from 'react';
import FullScreen from './FullScreen';
import ReduceProducts from './ReduceProducts';
import ProductDetails from './ProductDetails';
import ProductsFiltered from './ProductsFiltered';
import PurchaseVerification from './PurchaseVerification';
import QuantitySelection from './QuantitySelection';
import RealizePurchase from './RealizePurchase';
import PurchaseCompleted from './PurchaseCompleted';
import ViewPurchases from './ViewPurchases';
import PurchaseDetails from './PurchaseDetails';
import About from './About';

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
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="FullScreen" component={FullScreen} />
      <Drawer.Screen name="ViewPurchases" component={ViewPurchases} />
      <Drawer.Screen name="ReduceProducts" component={ReduceProducts} />
      <Drawer.Screen name="PurchaseDetails" component={PurchaseDetails} />
      <Drawer.Screen name="PurchaseVerification" component={PurchaseVerification} />
      <Drawer.Screen name="QuantitySelection" component={QuantitySelection} />
      <Drawer.Screen name="PurchaseCompleted" component={PurchaseCompleted} />
      <Drawer.Screen name="ProductsFiltered" component={ProductsFiltered} />
      <Drawer.Screen name="RealizePurchase" component={RealizePurchase} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
    </Drawer.Navigator>
  );
};

export default PrincipalBuyer;
