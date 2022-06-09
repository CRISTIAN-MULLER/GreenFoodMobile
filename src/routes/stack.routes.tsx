import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RootStackParamList from '@typings/RootStackParamList'
import SideMenu from '@pages/SideMenu'

const stackRoutes = createNativeStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => (
	<stackRoutes.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<stackRoutes.Screen name='SideMenu' component={SideMenu} />
	</stackRoutes.Navigator>
)

export default AppRoutes
