import React from 'react'
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	TouchableOpacityProps,
} from 'react-native'
import { NavigationProps } from '../types/Navigation'

interface ButtonPros extends TouchableOpacityProps {
	buttonText: String
}

export function Button({ buttonText, ...rest }: ButtonPros) {
	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
			<Text style={styles.buttonText}>{buttonText}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		height: 44,
		marginHorizontal: 12,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
})
