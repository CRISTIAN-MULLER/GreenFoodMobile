import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, View, StatusBar, Text } from 'react-native'

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

const Order = ({ navigation }: NavigationProps) => {
	const { order } = useContext(OrderContext)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
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
								color: '#005723',
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
						<Entypo name='flow-line' size={30} color='#005723' />
						<Text style={styles.text}>
							Aguarde a confirmação do estabelecimento.
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Ionicons
							name='checkmark-done'
							size={30}
							color={order!.step < 2 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>

						<Text
							style={{
								color: `${
									order!.step < 2 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
								}`,
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
						<Entypo
							name='flow-line'
							size={30}
							color={order!.step < 2 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={[
								styles.text,
								{
									color: `${
										order!.step < 2 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
									}`,
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
						<FontAwesome5
							name='people-carry'
							size={24}
							color={order!.step < 3 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={{
								color: `${
									order!.step < 3 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
								}`,
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
						<Entypo
							name='flow-line'
							size={30}
							color={order!.step < 3 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={[
								styles.text,
								{
									color: `${
										order!.step < 3 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
									}`,
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
							color={order!.step < 3 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={{
								color: `${
									order!.step < 4 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
								}`,
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
						<Entypo
							name='flow-line'
							size={30}
							color={order!.step < 4 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={[
								styles.text,
								{
									color: `${
										order!.step < 4 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
									}`,
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
						<FontAwesome5
							name='smile-beam'
							size={30}
							color={order!.step < 5 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={{
								color: `${
									order!.step < 5 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
								}`,
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
						<Entypo
							name='flow-line'
							size={30}
							color={order!.step < 5 ? 'rgba(33, 33, 33, 0.38)' : '#005723'}
						/>
						<Text
							style={[
								styles.text,
								{
									color: `${
										order!.step < 5 ? 'rgba(33, 33, 33, 0.38)' : '#005723'
									}`,
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
