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

import { generateCardHash } from 'pagarme-card-hash'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import { NavigationProps } from '@typings/Navigation'
import { OrderContext } from '@contexts/OrderContext'
import { ProfileContext } from '@contexts/ProfileContext'
import { UserPaymentMethodProps } from '@typings/PaymentMethod'
import Button from '@components/Button'
import CreditCardCard from '@components/CreditCardCard'

const PaymentSelection = ({ navigation }: NavigationProps) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card')
	const [refresh, setRefresh] = useState(false)
	const { userProfile } = useContext(ProfileContext)
	const { paymentMethod, setPaymentMethod } = useContext(OrderContext)

	const handleSelectedPaymentMethod = (
		chosenPaymentMethod: UserPaymentMethodProps,
	) => {
		setSelectedPaymentMethod(chosenPaymentMethod.cardName)
		setPaymentMethod(chosenPaymentMethod)
	}

	const hash = async () => {
		if (paymentMethod) {
			try {
				const hashedCard = await generateCardHash(
					{
						number: paymentMethod.cardNumber,
						holderName: paymentMethod.cardHolderName,
						expirationDate: paymentMethod.expirationDate,
						cvv: paymentMethod.cvv,
					},
					'pk_test_dx1JqewJs4udQ8X3',
				)

				return hashedCard
			} catch (err) {
				console.log(err)
			}
		}
		return false
	}

	useEffect(() => {
		// Subscribe for the focus Listener
		const unsubscribe = navigation.addListener('focus', () => {
			setSelectedPaymentMethod('Card')
		})
		return unsubscribe
	}, [navigation])
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
				<Text style={styles.textDelivery}>Método de Pagamento</Text>
				<Text style={styles.text}>Selecione o método de Pagamento.</Text>

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

				<Button buttonText='CONFIMAR PAGAMENTO' onPress={hash} />
				<BottomBar navigation={navigation} />
			</View>
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
		fontSize: 14,
		fontWeight: '400',
		fontFamily: 'Roboto',
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
