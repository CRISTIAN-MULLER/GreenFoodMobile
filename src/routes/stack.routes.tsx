import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome}></stackRoutes.Screen>
    <stackRoutes.Screen name="Login" component={Login} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
