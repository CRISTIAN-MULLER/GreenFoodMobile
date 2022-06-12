import React, { useContext } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import moment from 'moment'
import { AirbnbRating } from 'react-native-ratings'

import { NavigationProps } from '@typings/Navigation'
import { OrderHandleProps } from '@typings/Order'
import { OrderContext } from '@contexts/OrderContext'
import { CartContext } from '@contexts/CartContext'

export const OrderCard = ({
	data,
	navigation,
}: OrderHandleProps & NavigationProps) => {
	const { formatCurrency } = useContext(CartContext)
	const { setOrder } = useContext(OrderContext)
	const formatStatus = (status: string) => {
		if (status === 'order_placed') return 'Aberto'
		if (status === 'confirmed') return 'Confirmado'
		if (status === 'in_progress') return 'Em Preparação'
		if (status === 'out_for_delivery') return 'Saiu para Entrega'
		if (status === 'delivered') return 'Pedido Entregue'
		if (status === 'canceled') return 'Cancelado'
		return ''
	}

	const handleSelectedOrder = () => {
		setOrder(data)
		navigation.navigate('TrackOrder')
	}

	const handleRating = (rating: string) => {
		console.log('Rating is: ' + rating)
		return
	}

	return (
		<View style={styles.container}>
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
				<View style={{ width: '100%' }}>
					<RectButton
						onPress={() => {
							handleSelectedOrder()
						}}
					>
						<Text style={styles.orderNumber}>Pedido: #{data.orderNumber}</Text>

						<Text
							style={[
								styles.orderNumber,
								{ fontWeight: '400', fontSize: 10, marginBottom: 5 },
							]}
						>
							Realizado em{' '}
							{moment(new Date(data.createdAt!)).format('DD/MM/YY HH:mm:ss')}
						</Text>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Text style={styles.text}>Quantidade de itens:</Text>
							<Text style={styles.text}>{data.items.length}</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Text style={styles.text}>Valor do Pedido:</Text>
							<Text style={styles.text}>
								{formatCurrency(data.payment.totalPrice)}
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Text style={styles.text}>Status:</Text>
							<Text style={styles.text}>{formatStatus(data.status)}</Text>
						</View>
					</RectButton>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							flex: 1,
						}}
					>
						<AirbnbRating
							ratingContainerStyle={styles.ratingContainer}
							starContainerStyle={styles.starRatingContainer}
							reviewSize={12}
							reviewColor='rgba(0, 0, 0, 0.38)'
							count={5}
							defaultRating={3}
							size={10}
							reviews={[
								'Avalie seu Pedido',
								'Avalie seu Pedido',
								'Avalie seu Pedido',
								'Avalie seu Pedido',
								'Avalie seu Pedido',
							]}
							onFinishRating={handleRating}
						/>
					</View>
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
	ratingContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -5,
	},
	starRatingContainer: {
		marginTop: -5,
	},

	orderNumber: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		lineHeight: 19,
		fontWeight: '700',
		fontSize: 16,
		color: 'rgba(61, 61, 62, 1)',
	},
	text: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		lineHeight: 18,
		fontWeight: '500',
		fontSize: 14,
		color: 'rgba(0, 0, 0, 0.38)',
	},
})

export default OrderCard
