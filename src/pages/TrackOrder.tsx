import React, { useContext, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar,
	Text,
	RefreshControl,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'
import Button from '@components/Button'

import { NavigationProps } from '@typings/Navigation'

import {
	Foundation,
	Entypo,
	Ionicons,
	FontAwesome5,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import { OrderContext } from '@contexts/OrderContext'
import { GET_ALL_ORDERS } from '@gql/Order.gql'
import { useQuery } from '@apollo/client'

const Order = ({ navigation }: NavigationProps) => {
	const { order, setOrder } = useContext(OrderContext)
	const { fetchMore } = useQuery(GET_ALL_ORDERS, {
		variables: {
			data: {
				limit: 1,
			},
		},
	})

	const [refreshing] = useState(false)

	const onRefresh = async () => {
		const {
			data: { getAllOrders: createdOrder },
		} = await fetchMore({
			variables: {
				data: {
					limit: 1,
				},
				filter: {
					orderId: order?._id,
				},
			},
		})

		const [fetchedOrder] = createdOrder.orders
		setOrder(fetchedOrder)
	}

	const setColor = (step: number) => {
		if (order!.step < step) return 'rgba(33, 33, 33, 0.38)'
		if (order!.step === step) return '#FF8108'
		return '#005723'
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.wrapper}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<TopBar navigation={navigation} />
				<View
					style={{
						justifyContent: 'space-between',
						marginHorizontal: 15,
						marginBottom: 'auto',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={styles.textDelivery}>Acompanhe seu Pedido</Text>
						<Text
							style={{
								color: '#FF8108',
								fontSize: 18,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginTop: 15,
								marginHorizontal: 10,
								marginBottom: 10,
							}}
						>
							#{order?.orderNumber}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginLeft: 5,

							alignItems: 'center',
						}}
					>
						<Foundation name='clipboard-notes' size={30} color='#005723' />
						<Text
							style={{
								color: setColor(1),
								fontSize: 16,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginLeft: 15,
							}}
						>
							Aberto
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Entypo name='flow-line' size={30} color={setColor(1)} />
						<Text
							style={[
								styles.text,
								{
									color: setColor(1),
								},
							]}
						>
							Aguarde a confirmação do estabelecimento.
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Ionicons name='checkmark-done' size={30} color={setColor(2)} />

						<Text
							style={{
								color: setColor(2),
								fontSize: 16,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginHorizontal: 10,
							}}
						>
							Confirmado
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Entypo name='flow-line' size={30} color={setColor(2)} />
						<Text
							style={[
								styles.text,
								{
									color: setColor(2),
								},
							]}
						>
							Pedido confirmado pelo estabelecimento.
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginHorizontal: 1,
							alignItems: 'center',
						}}
					>
						<FontAwesome5 name='people-carry' size={24} color={setColor(3)} />
						<Text
							style={{
								color: setColor(3),
								fontSize: 16,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginHorizontal: 10,
							}}
						>
							Em preparação
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Entypo name='flow-line' size={30} color={setColor(3)} />
						<Text
							style={[
								styles.text,
								{
									color: setColor(3),
								},
							]}
						>
							Estamos separando e embalando seus produtos.
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginHorizontal: 1,
							alignItems: 'center',
						}}
					>
						<MaterialCommunityIcons
							name='truck-delivery-outline'
							size={30}
							color={setColor(4)}
						/>
						<Text
							style={{
								color: setColor(4),
								fontSize: 16,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginHorizontal: 10,
							}}
						>
							Saiu para entrega
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Entypo name='flow-line' size={30} color={setColor(4)} />
						<Text
							style={[
								styles.text,
								{
									color: setColor(4),
								},
							]}
						>
							Nosso entregador está a caminho.
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginHorizontal: 1,
							alignItems: 'center',
						}}
					>
						<FontAwesome5 name='smile-beam' size={30} color={setColor(5)} />
						<Text
							style={{
								color: setColor(5),
								fontSize: 16,
								fontWeight: '700',
								fontFamily: 'Roboto',
								marginHorizontal: 10,
							}}
						>
							Entregue
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Entypo name='flow-line' size={30} color={setColor(5)} />
						<Text
							style={[
								styles.text,
								{
									color: setColor(5),
								},
							]}
						>
							Seu pedido foi concluído.
						</Text>
					</View>
				</View>
				<Button
					buttonText='VOLTAR PARA A LOJA'
					onPress={() => navigation.navigate('Menu')}
				/>
				<BottomBar navigation={navigation} />
			</ScrollView>
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
		marginBottom: 10,
	},
	text: {
		color: '#FF8108',
		alignItems: 'flex-start',
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'Roboto',
	},
})
