import React, { useContext, useEffect } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Text,
	FlatList,
	Image,
} from 'react-native'
import { useMutation } from '@apollo/client'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'
import Button from '@components/Button'

import { NavigationProps } from '@typings/Navigation'
import { ProfileContext } from '@contexts/ProfileContext'
import { OrderContext } from '@contexts/OrderContext'
import { CartContext } from '@contexts/CartContext'
import { OrderProps } from '@typings/Order'
import { CREATE_ORDER } from '@gql/Order.gql'

const Order = ({ navigation }: NavigationProps) => {
	const cartInitialState = {
		items: [],
		itemsTotalQty: 0,
		itemsTotalPrice: 0,
	}
	const { userProfile } = useContext(ProfileContext)
	const { deliveryAddress, paymentMethod } = useContext(OrderContext)
	const { cart, setCart, formatCurrency } = useContext(CartContext)
	const { order, setOrder } = useContext(OrderContext)

	const [createOrder] = useMutation(CREATE_ORDER)

	const handleCreateOrder = async () => {
		const {
			data: { createOrder: createdOrder },
		} = await createOrder({
			variables: {
				data: {
					customerId: order!.customerId,
					deliveryAddress: {
						name: order!.deliveryAddress.name,
						zipcode: order!.deliveryAddress.zipcode,
						street: order!.deliveryAddress.street,
						houseNumber: order!.deliveryAddress.houseNumber,
						district: order!.deliveryAddress.district,
						city: order!.deliveryAddress.city,
						state: order!.deliveryAddress.state,
						reference: order!.deliveryAddress.reference,
						location: {
							type: order!.deliveryAddress.location.type,
							coordinates: order!.deliveryAddress.location.coordinates,
						},
					},
					items: order!.items,
					phone: order!.phone,
					payment: {
						paymentMethod: order!.payment.paymentMethod,
						paymentStatus: order!.payment.paymentStatus,
					},
					origin: order!.origin,
					status: order!.status,
					step: order!.step,
					observation: order!.observation,
				},
			},
		})

		if (createdOrder) {
			setOrder(createdOrder)
			setCart(cartInitialState)
			navigation.navigate('Delivery')
		}
	}

	useEffect(() => {
		const cartItems = cart.items.map((item) => ({
			productId: item._id,
			name: item.name,
			image: item.image,
			saleUnit: {
				saleUnit: item.saleUnit.saleUnit,
				description: item.saleUnit.description,
				price: item.saleUnit.price,
				active: item.saleUnit.active,
			},
			itemTotalQty: item.itemTotalQty,
			itemTotalPrice: item.itemTotalPrice,
		}))

		const newOrder: OrderProps = {
			customerId: userProfile._id!,
			deliveryAddress: deliveryAddress!,
			items: cartItems,
			phone: userProfile.phone!,
			payment: {
				paymentMethod,
				paymentStatus: 'TO_PAY',
			},
			origin: 'APP',
			status: 'ORDER_PLACED',
			step: 1,
			observation: 'Nenhuma',
		}
		setOrder(newOrder)

		console.log(order)
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />

				<Text style={styles.textDelivery}>Resumo do Pedido</Text>
				<Text style={styles.text}>Confira os dados e depois CONFIRME.</Text>

				<View>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 16,
							color: 'rgba(61, 61, 62, 1)',
							marginHorizontal: 10,
							marginTop: 5,
						}}
					>
						Endereço:
					</Text>

					<View style={{ marginLeft: 20 }}>
						<Text
							style={{
								fontWeight: '600',
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.38)',
								// marginLeft: 35,
							}}
						>
							{deliveryAddress!.street}, nº {deliveryAddress!.houseNumber}
						</Text>
						<Text
							style={{
								fontWeight: '600',
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.38)',
								//	marginLeft: 35,
							}}
						>
							{deliveryAddress!.district} - {deliveryAddress!.city} -{' '}
							{deliveryAddress!.state} - {deliveryAddress!.zipcode}
						</Text>
					</View>
				</View>

				<View>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 16,
							color: 'rgba(61, 61, 62, 1)',
							marginHorizontal: 10,
							marginTop: 5,
						}}
					>
						Forma de Pagamento:
					</Text>

					<View style={{ marginLeft: 20 }}>
						<Text
							style={{
								fontWeight: '600',
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.38)',
								// marginLeft: 35,
							}}
						>
							Pagar na entrega
						</Text>
						<Text
							style={{
								fontWeight: '600',
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.38)',
								//	marginLeft: 35,
							}}
						>
							Cartão de débito - Mastercard
						</Text>
					</View>
				</View>

				<View
					style={{
						flex: 1,
					}}
				>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 16,
							color: 'rgba(61, 61, 62, 1)',
							marginHorizontal: 10,
							marginTop: 5,
						}}
					>
						Resumo dos itens:
					</Text>

					<FlatList
						contentContainerStyle={{ paddingBottom: 20 }}
						data={cart.items}
						keyExtractor={(item) => String(item._id)}
						renderItem={({ item }) => (
							<View style={styles.itemContainer} key={item._id}>
								<Image source={{ uri: item.image }} style={styles.image} />

								<View
									style={{
										flex: 1,
										width: '100%',
										paddingHorizontal: 8,
										paddingVertical: 4,
										justifyContent: 'space-between',
										marginRight: 50,
									}}
								>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Text
											style={{
												fontWeight: '600',
												fontSize: 18,
												color: 'rgba(0, 0, 0, 0.87)',
											}}
										>
											{item.name}
										</Text>
									</View>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Text
											style={{
												fontFamily: 'Roboto',
												fontSize: 12,
												color: 'rgba(0, 0, 0, 0.38)',
											}}
										>
											{formatCurrency(item.saleUnit.price)}/
											{item.saleUnit.saleUnit}
										</Text>

										<Text
											style={{
												fontFamily: 'Roboto',
												fontSize: 12,
												color: 'rgba(0, 0, 0, 0.38)',
											}}
										>
											{item.itemTotalQty} x {item.saleUnit.saleUnit}
										</Text>

										<Text
											style={{
												fontFamily: 'Roboto',
												fontWeight: '700',
												fontSize: 13,
												color: 'rgba(0, 0, 0, 0.60)',
											}}
										>
											Total: {formatCurrency(item.itemTotalPrice)}
										</Text>
									</View>
								</View>
							</View>
						)}
						showsVerticalScrollIndicator={false}
						numColumns={1}
					/>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginLeft: 10,
						marginRight: 20,
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
				<Button
					buttonText='CONFIMAR PEDIDO'
					onPress={() => {
						console.log(order)
						handleCreateOrder()
					}}
				/>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default Order

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
		fontSize: 18,
		fontWeight: '400',
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
	image: {
		// flex: 1,
		width: 50,
		height: 50,
		// resizeMode: 'contain',
	},
	itemContainer: {
		marginHorizontal: 12,
		margin: 1,
		// paddingHorizontal: 5,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
	},
})
