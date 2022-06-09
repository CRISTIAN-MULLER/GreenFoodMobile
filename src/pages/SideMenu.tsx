import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Orderslist from '@pages/OrdersList'
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

const Drawer = createDrawerNavigator()

const SideMenu = () => (
	<Drawer.Navigator
		initialRouteName='Welcome'
		screenOptions={{
			headerShown: false,
			drawerStyle: {
				backgroundColor: '#005723',
				width: 200,
			},
		}}
	>
		<Drawer.Screen
			name='Welcome'
			component={Welcome}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Login'
			component={Login}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Orderslist'
			component={Orderslist}
			options={{
				drawerLabelStyle: { color: '#FFFFFF' },
				drawerLabel: 'Meus Pedidos',
			}}
		/>
		<Drawer.Screen
			name='Menu'
			component={Menu}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>

		<Drawer.Screen
			name='User'
			component={User}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Cart'
			component={Cart}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='AddressSelection'
			component={AddressSelection}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Address'
			component={Address}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='PaymentSelection'
			component={PaymentSelection}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='CreditCard'
			component={CreditCard}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Order'
			component={Order}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='Delivery'
			component={Delivery}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<Drawer.Screen
			name='TrackOrder'
			component={TrackOrder}
			options={{
				drawerItemStyle: { display: 'none' },
			}}
		/>
	</Drawer.Navigator>
)
export default SideMenu
