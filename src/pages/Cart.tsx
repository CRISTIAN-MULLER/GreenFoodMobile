import React, { useContext } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	FlatList,
	Pressable,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'
import ProductCardTertiary from '@components/ProductCardTertiary'
import { CartContext } from '@contexts/CartContext'

import { NavigationProps } from '@typings/Navigation'
import EmptyCartSVG from '@assets/EmptyCartSVG'
import Button from '@components/Button'

const Cart = ({ navigation }: NavigationProps) => {
	const { cart, formatCurrency } = useContext(CartContext)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />
				{cart.items.length === 0 ? (
					<View style={styles.svg}>
						<EmptyCartSVG width='80%' height='80%' />
						<Text
							style={{
								fontFamily: 'Roboto',
								fontSize: 20,
								textAlign: 'center',
								color: '#005723',
								marginBottom: 30,
							}}
						>
							Poxa!!!, Você ainda não escolheu nenhum produto.
						</Text>
						<Pressable onPress={() => navigation.navigate('Menu')}>
							<Text
								style={{
									fontFamily: 'Roboto',
									fontSize: 20,
									textAlign: 'center',
									color: '#FF8108',
								}}
							>
								VOLTAR PARA LOJA
							</Text>
						</Pressable>
					</View>
				) : (
					<>
						<Text style={styles.text}>Carrinho</Text>
						<FlatList
							data={cart.items}
							keyExtractor={(item) => String(item._id)}
							renderItem={({ item }) => <ProductCardTertiary data={item} />}
							showsVerticalScrollIndicator={false}
							numColumns={1}
						/>
						<View
							style={{
								height: 1,
								backgroundColor: 'rgba(33, 33, 33, 0.08)',
								marginHorizontal: 12,
							}}
						/>

						<View
							style={{ flexDirection: 'row', justifyContent: 'space-between' }}
						>
							<Text style={styles.text}>Total dos Itens</Text>
							<Text style={styles.text}>
								{formatCurrency(cart.itemsTotalPrice)}
							</Text>
						</View>
						<Button
							buttonText='FINALIZAR'
							onPress={() => navigation.navigate('AddressSelection')}
						/>
					</>
				)}
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}
export default Cart

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},

	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	text: {
		// flex: 1,
		marginHorizontal: 12,
		marginTop: 15,
		color: '#005723',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	svg: {
		flex: 1,
		marginTop: -50,
		marginBottom: 50,
		alignItems: 'center',
	},
})
