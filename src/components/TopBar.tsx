import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import TextLogoSVG from '../../assets/TextLogoSVG'

import { ProfileContext } from '../contexts/ProfileContext'

const TopBar = () => {
	const { userProfile } = useContext(ProfileContext)

	return (
		<View style={styles.topBar}>
			<Ionicons name='menu' size={36} color='#FFFFFF' />
			<View style={styles.topBarTextView}>
				<TextLogoSVG height='120' width='140' />
			</View>

			<MaterialCommunityIcons name='bell' size={24} color='#FFFFFF' />
			<View>
				<Text style={styles.topBarText}>{userProfile.firstName}</Text>
			</View>
			<Image
				source={{ uri: userProfile.profilePicture }}
				style={{
					// flex: 1,
					width: 45,
					height: 45,
					borderRadius: 50,
					resizeMode: 'contain',
				}}
			/>

			<Ionicons name='md-share-social-sharp' size={24} color='#FFFFFF' />
		</View>
	)
}

export default TopBar

const styles = StyleSheet.create({
	topBar: {
		backgroundColor: '#005723',
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},

	topBarTextView: {
		justifyContent: 'space-between',
		alignItems: 'center',
		// marginHorizontal: 50,
	},

	topBarText: {
		fontFamily: 'Roboto',
		fontSize: 16,
		color: '#FFFFFF',
		textTransform: 'capitalize',
		marginLeft: 10,
		maxWidth: 100,
		flexWrap: 'wrap',
	},
})
