import React from 'react'
import { StyleSheet, View } from 'react-native'

import LottieView from 'lottie-react-native'

import menuLoading from '@assets/menuLoad.json'

const MenuLoad = () => (
	<View style={styles.container}>
		<LottieView source={menuLoading} autoPlay loop style={styles.animation} />
	</View>
)

export default MenuLoad

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	animation: {
		backgroundColor: 'transparent',
		width: 200,
		height: 200,
	},
})
