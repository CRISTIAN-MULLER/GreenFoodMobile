import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { CartContext } from '@contexts/CartContext'
import { NavigationProps } from '@typings/Navigation'

import { useRoute } from '@react-navigation/native'

export const BottomBar = ({ navigation }: NavigationProps) => {
	const { cart } = useContext(CartContext)
	const route = useRoute()

	function handleCart() {
		navigation.navigate('Cart')
	}

	function handleMenu() {
		navigation.navigate('Menu')
	}
	function handleSearch() {
		//	navigation.navigate('Cart')
	}
	function handleFavorite() {
		//		navigation.navigate('Cart')
	}
	return (
		<View style={styles.bottomBar}>
			{route.name === 'Cart' ? (
				<TouchableOpacity
					style={styles.bottomBarIcons}
					activeOpacity={0.7}
					onPress={handleMenu}
				>
					<MaterialIcons name='shopping-basket' size={30} color='#FFFFFF' />
					<Text style={styles.bottomBarIcons}>Produtos</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.bottomBarIcons}
					activeOpacity={0.7}
					onPress={handleCart}
				>
					<MaterialIcons name='shopping-cart' size={30} color='#FFFFFF' />
					{cart.items.length > 0 && (
						<Text style={styles.bottomBarQtytext}>{cart.items.length}</Text>
					)}

					<Text style={styles.bottomBarIcons}>Carrinho</Text>
				</TouchableOpacity>
			)}

			<TouchableOpacity
				style={styles.bottomBarIcons}
				activeOpacity={0.7}
				onPress={handleSearch}
			>
				<MaterialIcons name='search' size={30} color='#FFFFFF' />
				<Text style={styles.bottomBarIcons}>Procurar</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bottomBarIcons}
				activeOpacity={0.7}
				onPress={handleFavorite}
			>
				<MaterialIcons name='favorite' size={30} color='#FFFFFF' />
				<Text style={styles.bottomBarIcons}>Favoritos</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	bottomBar: {
		backgroundColor: '#005723',
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	bottomBarIcons: {
		color: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.74,
		fontSize: 12,
	},

	bottomBarQtytext: {
		color: '#005723',
		fontWeight: 'bold',
		position: 'absolute',
		textAlign: 'center',
		top: 3,
		fontSize: 10,
		// opacity: 0.74,
	},
})

export default BottomBar
