import React, { useContext } from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { NavigationProps } from '@typings/Navigation'
import { ProfileContext } from '@contexts/ProfileContext'
import { CardProps, PaymentMethodHandleProps } from '@typings/PaymentMethod'

// import { getBrandIcon } from './Input/brand'
// import MiniCard from './MiniCard'

const CreditCardCard = ({
	data,
	refresh,
	handleSelectedPaymentMethod,
	setRefresh,
	isSelected = false,
	navigation,
	onPress,
}: PaymentMethodHandleProps & NavigationProps) => {
	const { userProfile, handlePaymentMethod } = useContext(ProfileContext)
	// const [icon, setIcon] = useState({
	// 	icon: false,
	// })

	function handleEditPaymentMethod(paymentMethod: CardProps, action: string) {
		navigation.navigate('CreditCard', {
			paymentMethod,
			action,
			refresh,
			setRefresh,
		})
	}

	const handleFavoritePaymentMethod = (selectedCard: CardProps) => {
		userProfile.paymentMethods!.forEach((card) => {
			card.isFavorite = false
		})
		selectedCard.isFavorite = true
		handleSelectedPaymentMethod(selectedCard)
	}

	// useEffect(() => {
	// 	setIcon(getBrandIcon(data.cardNumber))
	// })

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
				<RectButton onPress={onPress}>
					<View style={{ flexDirection: 'row' }}>
						<Ionicons
							name={`${
								isSelected
									? 'radio-button-on-outline'
									: 'radio-button-off-outline'
							}`}
							size={24}
							color='#FF8108'
						/>

						<View style={{ marginLeft: 10, marginRight: -30 }}>
							<View style={{ marginLeft: 10 }}>
								<Text
									style={{
										flex: 1,
										fontWeight: '600',
										fontSize: 16,
										color: 'rgba(61, 61, 62, 1)',
										// marginLeft: 10,
									}}
								>
									{data.cardName}
								</Text>

								<Text
									style={{
										flex: 1,
										fontWeight: '600',
										fontSize: 16,
										color: 'rgba(0, 0, 0, 0.38)',
										// marginLeft: 35,
									}}
								>
									{data.cardHolderName}
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
									**** **** **** {data.cardNumber?.slice(-4)}
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
									Valido até {data.expirationDate?.slice(0, 2)}/
									{data.expirationDate?.slice(-2)}
								</Text>
							</View>
							{/* <MiniCard
								cardHolderName={data.cardHolderName}
								cardNumber={data.cardNumber}
								cardName={data.cardName}
								icon={icon?.icon}
							/> */}
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
							onPress={() => handleEditPaymentMethod(data, 'update')}
						>
							<MaterialIcons
								name='edit'
								size={24}
								color='rgba(0, 0, 0, 0.60)'
							/>
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
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor='rgba(0, 0, 0, 0.06)'
						style={{ height: 24, borderRadius: 4 }}
						onPress={() => {
							setRefresh(!refresh)
							handleFavoritePaymentMethod(data)
						}}
					>
						<MaterialIcons
							name={`${data.isFavorite ? 'favorite' : 'favorite-border'}`}
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

export default CreditCardCard
