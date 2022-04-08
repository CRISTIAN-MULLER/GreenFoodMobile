import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { NavigationProps } from '../types/Navigation'
import { ProfileContext } from '../contexts/ProfileContext'
import {
	PaymentMethodHandleProps,
	UserPaymentMethodProps,
} from '../types/PaymentMethod'

import { getBrandIcon } from './Input/brand'
import MiniCard from './MiniCard'

export const CreditCardCard = ({
	data,
	refresh,
	setRefresh,
	isSelected = false,
	navigation,
	...rest
}: PaymentMethodHandleProps & NavigationProps) => {
	const { handlePaymentMethod } = useContext(ProfileContext)
	const [icon, setIcon] = useState({
		icon: false,
	})

	function handleEditPaymentMethod(
		paymentMethod: UserPaymentMethodProps,
		action: string,
	) {
		navigation.navigate('CreditCard', {
			paymentMethod,
			action,
			refresh,
			setRefresh,
		})
	}

	useEffect(() => {
		setIcon(getBrandIcon(data.cardNumber))
	})

	return (
		<View style={styles.container} key={data.cardName}>
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

						<View style={{ marginLeft: 10, marginRight: -30 }}>
							<MiniCard
								cardHolderName={data.cardHolderName}
								cardNumber={data.cardNumber}
								cardName={data.cardName}
								icon={icon?.icon}
							/>
						</View>
					</View>
				</RectButton>

				<View style={{ flexDirection: 'row' }}>
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor='rgba(0, 0, 0, 0.06)'
						style={{ height: 24, marginRight: 15, borderRadius: 4 }}
						onPress={() => handleEditPaymentMethod(data, 'update')}
					>
						<MaterialIcons name='edit' size={24} color='rgba(0, 0, 0, 0.60)' />
					</TouchableHighlight>
					<MaterialIcons
						name='delete-outline'
						size={24}
						color='rgba(0, 0, 0, 0.60)'
						onPress={() => {
							setRefresh(!refresh)
							handlePaymentMethod(data, 'delete')
						}}
					/>
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

export default CreditCardCard
