import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Menu } from '../pages/Menu';
import { MaterialIcons } from '@expo/vector-icons';
import { User } from '../pages/User';
import { Platform, View, Text, StyleSheet } from 'react-native';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: '#005723',
          height: 56,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        },
      }}
    >
      <AppTab.Screen
        name="Carrinho"
        component={Menu}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="shopping-cart" size={24} color="#FFFFFF" />
          ),
        }}
      />
      <AppTab.Screen
        name="Minhas Plantas"
        component={User}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#005723',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bottomBarIcons: {
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.74,
  },
});

export default AuthRoutes;
