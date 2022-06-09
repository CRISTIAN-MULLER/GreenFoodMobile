import React from 'react'
import { StyleSheet, View } from 'react-native'

import LottieView from 'lottie-react-native'

import OrderLoading from '@assets/OrderLoading.json'

const OrderLoad = () => (
	<View style={styles.container}>
		<LottieView source={OrderLoading} autoPlay loop style={styles.animation} />
	</View>
)

export default OrderLoad

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
