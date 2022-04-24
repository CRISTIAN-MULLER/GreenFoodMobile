import React from 'react'
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	TouchableOpacityProps,
} from 'react-native'

interface ButtonPros extends TouchableOpacityProps {
	buttonText: String
}

const Button = ({ buttonText, onPress }: ButtonPros) => (
	<TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
		<Text style={styles.buttonText}>{buttonText}</Text>
	</TouchableOpacity>
)

export default Button

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
