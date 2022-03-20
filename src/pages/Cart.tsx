import React, { useContext } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	FlatList,
	TouchableOpacity,
	Pressable,
} from 'react-native'

import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import ProductCardTertiary from '../components/ProductCardTertiary'
import { CartContext } from '../contexts/CartContext'

import { NavigationProps } from '../types/Navigation'
import EmptyCartSVG from '../../assets/EmptyCartSVG'

export function Cart({ navigation }: NavigationProps) {
	const { cart, formatCurrency } = useContext(CartContext)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
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
							onEndReachedThreshold={0.1}
						></FlatList>
						<View
							style={{
								height: 1,
								backgroundColor: 'rgba(33, 33, 33, 0.08)',
								marginHorizontal: 12,
							}}
						></View>

						<View
							style={{ flexDirection: 'row', justifyContent: 'space-between' }}
						>
							<Text style={styles.text}>Total dos Itens</Text>
							<Text style={styles.text}>
								{formatCurrency(cart.itemsTotalPrice)}
							</Text>
						</View>

						<TouchableOpacity
							style={styles.button}
							activeOpacity={0.7}
							onPress={() => navigation.navigate('Delivery')}
						>
							<Text style={styles.buttonText}>FINALIZAR</Text>
						</TouchableOpacity>
					</>
				)}
				<BottomBar navigation={navigation} />
			</View>
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
		//alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		//flex: 1,
		marginHorizontal: 12,
		marginTop: 15,
		color: '#005723',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	bottomText: {
		//flex: 1,
		marginHorizontal: 12,
		color: 'rgba(0, 0, 0, 0.38)',
		alignItems: 'flex-start',
		fontSize: 15,
		fontWeight: '500',
	},
	productsCard: {
		flex: 1,
		//padding: 10,
	},
	button: {
		// position: 'absolute',
		//width: '70%',
		height: 60,
		marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 30,
		marginBottom: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	buttonText: {
		//flex: 1,
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
	},

	svg: {
		flex: 1,
		marginTop: -50,
		marginBottom: 50,
		alignItems: 'center',
	},
})
