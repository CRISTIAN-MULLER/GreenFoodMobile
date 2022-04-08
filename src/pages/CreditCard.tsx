import React, { useContext, useEffect, useState } from 'react'
import {
	Animated,
	SafeAreaView,
	StyleSheet,
	StatusBar,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	Text,
} from 'react-native'
import { useRoute } from '@react-navigation/core'

import { getBrand, getBrandIcon } from '../components/Input/brand'

import Card from '../components/Card'
import Input from '../components/Input'
import IconUser from '../../assets/icon-user'
import IconCode from '../../assets/icon-code'
import IconDate from '../../assets/icon-date'
import IconNumber from '../../assets/icon-number'

import { BottomBar } from '../components/BottomBar'
import TopBar from '../components/TopBar'
import { NavigationProps } from '../types/Navigation'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { Button } from '../components/Button'
import { UserPaymentMethodProps } from '../types/PaymentMethod'
import { ProfileContext } from '../contexts/ProfileContext'

const windowWidth = Dimensions.get('window').width

interface Params {
	paymentMethod: UserPaymentMethodProps
	action: string
	refresh: boolean
	setRefresh: (refresh: boolean) => void
}

export function CreditCard({ navigation }: NavigationProps) {
	const route = useRoute()
	const { paymentMethod, action, refresh, setRefresh } = route.params as Params

	const { userProfile, handlePaymentMethod } = useContext(ProfileContext)

	const [cardName, setCardName] = useState(paymentMethod.cardName)
	const [cardHolderName, setcardHolderName] = useState(
		paymentMethod.cardHolderName,
	)
	const [cardNumber, setCardNumber] = useState(paymentMethod.cardNumber)
	const [expirationDate, setexpirationDate] = useState(
		paymentMethod.expirationDate,
	)
	const [cardBrand, setCardBrand] = useState(paymentMethod.cardBrand)
	const [cvv, setCvv] = useState(paymentMethod.cvv)

	const [widthAnimated, setWidthAnimated] = useState(
		new Animated.Value(windowWidth),
	)
	const [backView, setBackView] = useState(false)
	const [icon, setIcon] = useState({
		icon: false,
	})

	const lazyCardFlip = () => {
		if (cvv.length >= 2) {
			setTimeout(() => {
				animatedCard(false)
			}, 1000)
		}
		return
	}

	const setCardData = () => {
		const newCreditCard: any = {
			cardName: cardName,
			cardHolderName: cardHolderName,
			cardNumber: cardNumber,
			cardBrand: cardBrand,
			expirationDate: expirationDate,
			cvv: cvv,
		}

		const hasCards = userProfile.paymentMethods!.filter(
			(paymentMethod) => paymentMethod.cardName === cardName,
		)

		if (hasCards.length && action === 'add') {
			alert('Já existe um cartão com esse nome')
			return
		}

		handlePaymentMethod(newCreditCard, action)
		setRefresh(!refresh)
		navigation.navigate('PaymentSelection')
	}

	useEffect(() => {
		setIcon(getBrandIcon(cardNumber))
	})

	const animatedCard = (back: boolean) => {
		if (back && !backView) {
			Animated.timing(widthAnimated, {
				toValue: 0,
				duration: 400,
				useNativeDriver: false,
			}).start()

			setTimeout(() => {
				Animated.timing(widthAnimated, {
					toValue: windowWidth,
					duration: 400,
					useNativeDriver: false,
				}).start()
				setBackView(true)
			}, 400)
		}

		if (!back && backView) {
			Animated.timing(widthAnimated, {
				toValue: 0,
				duration: 400,
				useNativeDriver: false,
			}).start()

			setTimeout(() => {
				Animated.timing(widthAnimated, {
					toValue: windowWidth,
					duration: 400,
					useNativeDriver: false,
				}).start()
				setBackView(false)
			}, 400)
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.wrapper}>
					<TopBar />
					<ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 10,
							}}
						>
							<Text style={styles.textDelivery}>Cadastrar Cartão</Text>
							<Text style={styles.text}>Nome:</Text>
							<FloatingLabelInput
								value={cardName}
								containerStyles={{
									marginLeft: 5,
									alignItems: 'center',
									borderBottomColor: 'rgba(33, 33, 33, 0.38)',
									borderBottomWidth: 1,
								}}
								onChangeText={(value) => setCardName(value)}
								label={''}
							/>
						</View>
						<Animated.View style={{ width: widthAnimated }}>
							<Card
								cardHolderName={cardHolderName}
								cardNumber={cardNumber}
								cardBrand={cardBrand}
								expirationDate={expirationDate}
								cvv={cvv}
								icon={icon?.icon}
								back={backView}
							/>
						</Animated.View>

						<Input
							placeholder='Nome do titular'
							value={cardHolderName}
							onChangeText={(text) => {
								setcardHolderName(text)
								animatedCard(false)
							}}
							icon={<IconUser fill='#FF8108' width={16} height={16} />}
						/>

						<Input
							placeholder='Número do cartão'
							value={cardNumber}
							type='credit-card'
							mask
							onChangeText={(text) => {
								setCardNumber(text)
								setIcon(getBrandIcon(text))
								animatedCard(false)
							}}
							icon={<IconNumber fill='#FF8108' width={16} height={16} />}
						/>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 10,
							}}
						>
							<Input
								placeholder='Validade'
								value={expirationDate}
								type='custom'
								options={{
									mask: '99/99',
								}}
								mask
								onChangeText={(text) => {
									setexpirationDate(text)
									animatedCard(false)
								}}
								width='45%'
								icon={<IconDate fill='#FF8108' width={16} height={16} />}
							/>
							<Input
								placeholder='CVV'
								value={cvv}
								type='custom'
								options={{
									mask: '9999',
								}}
								mask
								onChangeText={(text) => {
									setCvv(text)
									animatedCard(true)
									lazyCardFlip()
								}}
								width='45%'
								icon={<IconCode fill='#FF8108' width={16} height={16} />}
							/>
						</View>
					</ScrollView>
					<Button buttonText={'SALVAR'} onPress={() => setCardData()} />
					<BottomBar navigation={navigation} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},

	wrapper: {
		flex: 1,
		//	alignItems: 'center',
		justifyContent: 'space-between',
	},

	textDelivery: {
		//marginLeft: 5,
		marginTop: 10,
		color: '#005723',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
		marginRight: 20,
	},
	text: {
		marginLeft: 5,
		marginTop: 5,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	picker: {
		height: 40,
		width: 100,
	},
	button: {
		// position: 'absolute',
		//width: '100%',
		height: 50,
		//marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	naviButton: {
		// position: 'absolute',
		//width: '70%',
		height: 50,
		//marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 10,
		//marginBottom: 10,
		//padding: 10,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#FF8108',
	},
	naviButtonText: {
		//flex: 1,
		marginLeft: 10,
		color: '#FF8108',
		fontSize: 20,
		fontWeight: '600',
	},
	buttonText: {
		//flex: 1,
		marginLeft: 10,
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
	},
	textInput: {
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.38)',

		color: 'rgba(33, 33, 33, 0.8)',
		//width: 'auto',
		flexWrap: 'nowrap',
		height: 44,

		padding: 5,
		textAlign: 'left',
	},

	cep: {
		flex: 3,
		alignItems: 'flex-start',
		justifyContent: 'center',
		//backgroundColor: 'red',
		marginRight: 12,
		//width: 'auto',
		//height: '100%',
		borderRadius: 4,
		//padding: 5,
		//textAlign: 'center',
		width: '100%',
	},
	state: {
		//	flex: 1,
		//alignItems: 'flex-start',
		//justifyContent: 'center',
		//backgroundColor: 'grey',
		width: 70,
		//height: ,
		textAlign: 'left',
		borderRadius: 4,
		//padding: 5,
		//textAlign: 'center',
	},
})
