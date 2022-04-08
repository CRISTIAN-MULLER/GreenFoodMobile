import React, { useContext } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { AddressHandleProps, UserAddressProps } from '../types/Address'
import { NavigationProps } from '../types/Navigation'
import { ProfileContext } from '../contexts/ProfileContext'

export const AddressCard = ({
	data,
	refresh,
	setRefresh,
	isSelected = false,
	navigation,
	...rest
}: AddressHandleProps & NavigationProps) => {
	const { handleAddress } = useContext(ProfileContext)

	function handleEditAddress(address: UserAddressProps, action: string) {
		navigation.navigate('Address', { address, action, refresh, setRefresh })
	}

	return (
		<View style={styles.container} key={data.name}>
			<View
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					paddingHorizontal: 8,
					paddingVertical: 4,
					justifyContent: 'space-between',
					flexDirection: 'row',
				}}
			>
				<RectButton {...rest}>
					<View style={{ flexDirection: 'row' }}>
						{isSelected ? (
							<Ionicons
								name='radio-button-on-outline'
								size={24}
								color='#FF8108'
							/>
						) : (
							<Ionicons
								name='radio-button-off-outline'
								size={24}
								color='#FF8108'
							/>
						)}
						<View style={{ marginLeft: 10 }}>
							<Text
								style={{
									flex: 1,
									fontWeight: '600',
									fontSize: 16,
									color: 'rgba(61, 61, 62, 1)',
									//marginLeft: 10,
								}}
							>
								{data.name}
							</Text>

							<Text
								style={{
									flex: 1,
									fontWeight: '600',
									fontSize: 16,
									color: 'rgba(0, 0, 0, 0.38)',
									//marginLeft: 35,
								}}
							>
								{data.street}, nº {data.houseNumber}
							</Text>
							<Text
								style={{
									flex: 1,
									fontWeight: '600',
									fontSize: 16,
									color: 'rgba(0, 0, 0, 0.38)',
									//	marginLeft: 35,
								}}
							>
								{data.district} - {data.city} - {data.state}
							</Text>

							<Text
								style={{
									flex: 1,
									fontWeight: '600',
									fontSize: 16,
									color: 'rgba(0, 0, 0, 0.38)',
									//	marginLeft: 35,
								}}
							>
								CEP {data.zipcode}
							</Text>
						</View>
					</View>
				</RectButton>
				<View
					style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
				>
					<View style={{ flexDirection: 'row' }}>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor='rgba(0, 0, 0, 0.06)'
							style={{ height: 24, marginRight: 15, borderRadius: 4 }}
							onPress={() => handleEditAddress(data, 'update')}
						>
							<MaterialIcons
								name='edit'
								size={24}
								color='rgba(0, 0, 0, 0.60)'
							/>
						</TouchableHighlight>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor='rgba(0, 0, 0, 0.06)'
							style={{ height: 24, borderRadius: 4 }}
							onPress={() => {
								setRefresh(!refresh)
								handleAddress(data, 'delete')
							}}
						>
							<MaterialIcons
								name='delete-outline'
								size={24}
								color='rgba(0, 0, 0, 0.60)'
							/>
						</TouchableHighlight>
					</View>
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor='rgba(0, 0, 0, 0.06)'
						style={{ height: 24, borderRadius: 4 }}
						onPress={() => {
							setRefresh(!refresh)
							handleAddress(data, 'delete')
						}}
					>
						<MaterialIcons
							name='favorite'
							size={24}
							color='rgba(0, 0, 0, 0.60)'
						/>
					</TouchableHighlight>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.08)',
		borderRadius: 5,
		marginHorizontal: 12,
		marginTop: 15,
		backgroundColor: 'rgba(98, 0, 238, 0.04)',
		alignItems: 'center',
	},
})

export default AddressCard
