import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

import LogoSVG from '../../assets/LogoSVG'
import Gradient from '../components/Gradient'
import { NavigationProps } from '../types/Navigation'

export function Welcome({ navigation }: NavigationProps) {
	function handleStart() {
		navigation.navigate('Login')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Gradient />
				<LogoSVG width='248' height='243' />
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={handleStart}
				>
					<Text style={styles.text}>ENTRAR</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '70%',
		height: '7%',
		marginTop: 60,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#fff',
	},
})
