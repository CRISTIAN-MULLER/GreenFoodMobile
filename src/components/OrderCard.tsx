import React, { useContext } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import moment from 'moment'

import { NavigationProps } from '@typings/Navigation'
import { OrderHandleProps } from '@typings/Order'
import { OrderContext } from '@contexts/OrderContext'

export const OrderCard = ({
	data,
	navigation,
}: OrderHandleProps & NavigationProps) => {
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
				<RectButton
					onPress={() => {
						handleSelectedOrder()
					}}
				>
					<View style={{ flexDirection: 'row' }}>
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
								Pedido: #{data.orderNumber}
							</Text>
						</View>
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
								Data:{' '}
								{moment(new Date(data.createdAt!)).format('DD/MM/YY HH:mm:ss')}
							</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
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
								Status: {formatStatus(data.status)}
							</Text>
						</View>
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
								{moment(new Date(data.updatedAt!)).format('DD/MM/YY HH:mm:ss')}
							</Text>
						</View>
					</View>
				</RectButton>
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

export default OrderCard
