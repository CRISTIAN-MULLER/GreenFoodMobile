import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Welcome } from '../pages/Welcome'
import { Login } from '../pages/Login'
import { User } from '../pages/User'
import { Menu } from '../pages/Menu'
import { Cart } from '../pages/Cart'
import { Delivery } from '../pages/Delivery'
import { RootStackParamList } from '../types/RootStackParamList'

const stackRoutes = createNativeStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => (
	<stackRoutes.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<stackRoutes.Screen name='Welcome' component={Welcome} />
		<stackRoutes.Screen name='Login' component={Login} />
		<stackRoutes.Screen name='Cart' component={Cart} />
		<stackRoutes.Screen name='User' component={User} />
		<stackRoutes.Screen name='Menu' component={Menu} />
		<stackRoutes.Screen name='Delivery' component={Delivery} />
	</stackRoutes.Navigator>
)

export default AppRoutes
