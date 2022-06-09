import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Pressable,
	FlatList,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import { NavigationProps } from '@typings/Navigation'
import { OrderContext } from '@contexts/OrderContext'
import { ProfileContext } from '@contexts/ProfileContext'

import Button from '@components/Button'
import CreditCardCard from '@components/CreditCardCard'
import { Ionicons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { CartContext } from '@contexts/CartContext'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { CardProps } from '@typings/PaymentMethod'

const PaymentSelection = ({ navigation }: NavigationProps) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

	const { paymentMethod, setPaymentMethod } = useContext(OrderContext)
	const { cart, formatCurrency } = useContext(CartContext)
	// const [deliveryPay, setDeliveryPay] = useState<UserPaymentMethodProps>({
	// 	delivery: {
	// 		card: {
	// 			cardBrand: '',
	// 			type: '',
	// 		},
	// 		cash: {
	// 			change: 0,
	// 		},
	// 	},
	// })

	const [refresh, setRefresh] = useState(false)
	const { userProfile } = useContext(ProfileContext)

	const handleSelectedPaymentMethod = (userPaymentMethod: CardProps) => {
		setSelectedPaymentMethod(userPaymentMethod.cardName)
		setPaymentMethod({
			app: userPaymentMethod,
		})
	}

	useEffect(() => {
		console.log('pay', paymentMethod)
		// Subscribe for the focus Listener

		const unsubscribe = navigation.addListener('focus', () => {
			const favoriteCard = userProfile.paymentMethods!.find(
				(card) => card.isFavorite === true,
			)
			if (favoriteCard) {
				setSelectedPaymentMethod(favoriteCard.cardName)
				setPaymentMethod({
					app: favoriteCard,
				})
			} else if (userProfile.paymentMethods!.length > 0) {
				setSelectedPaymentMethod(userProfile.paymentMethods![0].cardName)

				setPaymentMethod({
					app: userProfile.paymentMethods![0],
				})
			}
		})
		return unsubscribe
	}, [navigation, userProfile])
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />
				<Text style={styles.textDelivery}>Método de Pagamento</Text>
				<Text style={styles.text}>Selecione o método de Pagamento.</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginHorizontal: 20,
						marginTop: 10,
					}}
				>
					<RectButton
						onPress={() =>
							setPaymentMethod({
								app: {
									cardNumber: '',
									cardName: '',
									cardHolderName: '',
									expirationDate: '',
									cardBrand: '',
									cvv: '',
									isFavorite: false,
								},
							})
						}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Ionicons
								name={
									paymentMethod?.delivery
										? 'radio-button-off-outline'
										: 'radio-button-on-outline'
								}
								size={24}
								color='#FF8108'
							/>
							<Text style={styles.textPayment}>Pagar pelo App</Text>
						</View>
					</RectButton>
					<RectButton
						onPress={() =>
							setPaymentMethod({
								delivery: {
									cash: {
										change: '',
									},
								},
							})
						}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Ionicons
								name={
									paymentMethod!.delivery
										? 'radio-button-on-outline'
										: 'radio-button-off-outline'
								}
								size={24}
								color='#FF8108'
							/>
							<Text style={styles.textPayment}>Pagar na entrega.</Text>
						</View>
					</RectButton>
				</View>
				{paymentMethod?.delivery ? (
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<View
							style={{
								flexDirection: 'column',
								justifyContent: 'space-between',
								marginLeft: 10,
								marginRight: 20,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginLeft: 10,
									marginRight: 20,
									marginTop: 10,
								}}
							>
								<Text style={styles.text}>Total do Itens</Text>
								<Text
									style={{
										fontFamily: 'Roboto',
										fontSize: 18,
										color: 'rgba(0, 0, 0, 0.38)',
									}}
								>
									{formatCurrency(cart.itemsTotalPrice)}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginLeft: 10,
									marginRight: 20,
								}}
							>
								<Text style={styles.text}>Total do Frete</Text>
								<Text
									style={{
										fontFamily: 'Roboto',
										fontSize: 18,
										color: 'rgba(0, 0, 0, 0.38)',
									}}
								>
									{formatCurrency(0)}
								</Text>
							</View>
							<View
								style={{
									height: 1,
									backgroundColor: 'rgba(33, 33, 33, 0.08)',
									marginHorizontal: 10,
								}}
							/>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginLeft: 10,
									marginRight: 20,
								}}
							>
								<Text style={styles.textOrange}>Total da Compra</Text>
								<Text
									style={{
										fontFamily: 'Roboto',
										fontSize: 18,
										fontWeight: '700',
										color: '#FF8108',
									}}
								>
									{formatCurrency(cart.itemsTotalPrice)}
								</Text>
							</View>
							<Text style={styles.textDelivery}>Forma de Pagamento</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'flex-start',
									marginHorizontal: 20,
									marginVertical: 10,
								}}
							>
								<RectButton
									style={{
										marginRight: 10,
									}}
									onPress={() => {
										setPaymentMethod({
											delivery: {
												cash: {
													change: '',
												},
											},
										})
									}}
								>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<Ionicons
											name={
												paymentMethod?.delivery?.cash
													? 'radio-button-on-outline'
													: 'radio-button-off-outline'
											}
											size={24}
											color='#FF8108'
										/>
										<Text style={styles.textPayment}>Dinheiro</Text>
									</View>
								</RectButton>
								<RectButton
									onPress={() => {
										setPaymentMethod({
											delivery: {
												card: {
													cardBrand: '',
													type: '',
												},
											},
										})
									}}
								>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<Ionicons
											name={
												paymentMethod?.delivery?.card
													? 'radio-button-on-outline'
													: 'radio-button-off-outline'
											}
											size={24}
											color='#FF8108'
										/>
										<Text style={styles.textPayment}>Cartão</Text>
									</View>
								</RectButton>
							</View>
							<View>
								<Text style={styles.text}>Valor para troco se necessário.</Text>
								<FloatingLabelInput
									value={paymentMethod?.delivery?.cash?.change}
									maskType='currency'
									keyboardType='numeric'
									containerStyles={styles.textInput}
									onChangeText={(value) =>
										setPaymentMethod({
											delivery: {
												cash: {
													change: value,
												},
											},
										})
									}
									label=''
								/>
							</View>
						</View>
					</View>
				) : (
					<>
						<Pressable
							style={{ marginLeft: 30, marginBottom: 10 }}
							onPress={() =>
								navigation.navigate('CreditCard', {
									paymentMethod: {
										cardName: '',
										cardHolderName: '',
										cardNumber: '',
										cardBrand: '',
										expirationDate: '',
										cvv: '',
										isFavorite: false,
									},
									action: 'add',
									refresh,
									setRefresh,
								})
							}
						>
							<Text style={styles.addCard}>+ NOVO CARTÃO</Text>
						</Pressable>

						<FlatList
							extraData={refresh}
							data={userProfile.paymentMethods?.sort()}
							keyExtractor={(chosenPaymentMethod) =>
								String(chosenPaymentMethod.cardName)
							}
							renderItem={({ item }) => (
								<CreditCardCard
									handleSelectedPaymentMethod={handleSelectedPaymentMethod}
									refresh={refresh}
									setRefresh={setRefresh}
									data={item}
									isSelected={item.cardName === selectedPaymentMethod}
									onPress={() => handleSelectedPaymentMethod(item)}
									navigation={navigation}
								/>
							)}
							showsVerticalScrollIndicator={false}
							numColumns={1}
						/>
					</>
				)}
			</View>
			<Button
				buttonText='CONFIMAR FORMA DE PAGAMENTO'
				onPress={() => navigation.navigate('Order')}
			/>
			<BottomBar navigation={navigation} />
		</SafeAreaView>
	)
}

export default PaymentSelection

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	textDelivery: {
		color: '#005723',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
		marginTop: 15,
		marginHorizontal: 10,
	},
	text: {
		marginHorizontal: 10,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 16,
		fontWeight: '400',
		fontFamily: 'Roboto',
	},
	textPayment: {
		marginLeft: 5,
		color: 'rgba(0, 0, 0, 0.60)',
		alignItems: 'flex-start',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	textOrange: {
		marginHorizontal: 10,
		color: '#FF8108',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
	},
	textInput: {
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.38)',
		color: 'rgba(33, 33, 33, 0.8)',
		flexWrap: 'nowrap',
		height: 44,
		padding: 5,
		textAlign: 'left',
	},
	addCard: {
		color: '#FF8108',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
		marginTop: 15,
		marginHorizontal: 10,
	},
})
