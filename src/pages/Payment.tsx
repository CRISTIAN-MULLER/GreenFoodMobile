import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	ScrollView,
} from 'react-native'

import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'

import { NavigationProps } from '../types/Navigation'
import { OrderContext } from '../contexts/OrderContext'
import { ProfileContext } from '../contexts/ProfileContext'

export function Payment({ navigation }: NavigationProps) {
	const { userProfile, setUserProfile } = useContext(ProfileContext)
	const { deliveryAddress } = useContext(OrderContext)
	console.log('pay profile', userProfile)
	console.log('pay address', deliveryAddress)
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
				<ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
					<Text style={styles.textDelivery}>Escolher Pagamento</Text>
				</ScrollView>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},

	wrapper: {
		flex: 1,
		//	alignItems: 'center',
		justifyContent: 'space-between',
	},

	textDelivery: {
		//marginLeft: 5,
		marginTop: 10,
		color: '#005723',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
	},
	text: {
		marginLeft: 5,
		marginTop: 5,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	picker: {
		height: 40,
		width: 100,
	},
	button: {
		// position: 'absolute',
		//width: '100%',
		height: 50,
		//marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	naviButton: {
		// position: 'absolute',
		//width: '70%',
		height: 50,
		//marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 10,
		//marginBottom: 10,
		//padding: 10,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#FF8108',
	},
	naviButtonText: {
		//flex: 1,
		marginLeft: 10,
		color: '#FF8108',
		fontSize: 20,
		fontWeight: '600',
	},
	buttonText: {
		//flex: 1,
		marginLeft: 10,
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
	},
	textInput: {
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.38)',

		color: 'rgba(33, 33, 33, 0.8)',
		//width: 'auto',
		flexWrap: 'nowrap',
		height: 44,

		padding: 5,
		textAlign: 'left',
	},

	cep: {
		flex: 3,
		alignItems: 'flex-start',
		justifyContent: 'center',
		//backgroundColor: 'red',
		marginRight: 12,
		//width: 'auto',
		//height: '100%',
		borderRadius: 4,
		//padding: 5,
		//textAlign: 'center',
		width: '100%',
	},
	state: {
		//	flex: 1,
		//alignItems: 'flex-start',
		//justifyContent: 'center',
		//backgroundColor: 'grey',
		width: 70,
		//height: ,
		textAlign: 'left',
		borderRadius: 4,
		//padding: 5,
		//textAlign: 'center',
	},
})
