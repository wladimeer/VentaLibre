import { DrawerDesign } from '../../../components/DrawerDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Firebase from '../../../service/Firebase';
import ViewProducts from './ViewProducts';
import React from 'react';

const PrincipalBuyer = () => {
  const Drawer = createDrawerNavigator();

  Firebase.CurrentUser((response) => {
    console.log(response);
  });

  // const [user, setUser] = useState({});

  // const LoadComponent = function () {
  //   return <DrawerDesign user={user} />;
  // };

  return (
    <Drawer.Navigator initialRouteName="ViewProducts">
      <Drawer.Screen name="ViewProducts" component={ViewProducts} />
    </Drawer.Navigator>
  );
};

export default PrincipalBuyer;
