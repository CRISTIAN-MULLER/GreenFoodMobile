import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RootStackParamList from '@typings/RootStackParamList'
import Address from '@pages/Address'
import AddressSelection from '@pages/AddressSelection'
import Cart from '@pages/Cart'
import CreditCard from '@pages/CreditCard'
import Delivery from '@pages/Delivery'
import Login from '@pages/Login'
import Menu from '@pages/Menu'
import Order from '@pages/Order'
import PaymentSelection from '@pages/PaymentSelection'
import TrackOrder from '@pages/TrackOrder'
import User from '@pages/User'
import Welcome from '@pages/Welcome'

const stackRoutes = createNativeStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => (
	<stackRoutes.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<stackRoutes.Screen name='Welcome' component={Welcome} />
		<stackRoutes.Screen name='Menu' component={Menu} />
		<stackRoutes.Screen name='Login' component={Login} />
		<stackRoutes.Screen name='User' component={User} />
		<stackRoutes.Screen name='Cart' component={Cart} />
		<stackRoutes.Screen name='AddressSelection' component={AddressSelection} />
		<stackRoutes.Screen name='Address' component={Address} />
		<stackRoutes.Screen name='PaymentSelection' component={PaymentSelection} />
		<stackRoutes.Screen name='CreditCard' component={CreditCard} />
		<stackRoutes.Screen name='Order' component={Order} />
		<stackRoutes.Screen name='Delivery' component={Delivery} />
		<stackRoutes.Screen name='TrackOrder' component={TrackOrder} />
	</stackRoutes.Navigator>
)

export default AppRoutes
