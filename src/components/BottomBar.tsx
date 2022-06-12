import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { CartContext } from '@contexts/CartContext'
import { NavigationProps } from '@typings/Navigation'

import { useRoute } from '@react-navigation/native'
import { ProfileContext } from '@contexts/ProfileContext'
import { ProductContext } from '@contexts/ProductContext'
import { useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '@gql/Product.gql'
import ProductSearchModal from './ProductSearchModal'

// import { useQuery } from '@apollo/client'
// import GET_ALL_PRODUCTS from '@gql/Product.gql'

export const BottomBar = ({ navigation }: NavigationProps) => {
	const {
		setNextPage,
		setLoadingMore,
		setProducts,
		products,
		showModalSearchProduct,
		setShowModalSearchProduct,
	} = useContext(ProductContext)
	const [filtered, setFiltered] = useState<boolean>()
	const [searched, setSearched] = useState<boolean>()
	const [searchText, setSearchText] = useState('')
	const { cart } = useContext(CartContext)
	const { userProfile } = useContext(ProfileContext)
	const route = useRoute()

	const { fetchMore } = useQuery(GET_ALL_PRODUCTS, {
		variables: {
			data: {
				limit: 6,
				sortAscending: true,
				sortField: 'name',
			},
			filter: {
				status: 'ativo',
			},
		},
	})

	function handleCart() {
		navigation.navigate('Cart')
	}

	function handleMenu() {
		navigation.navigate('Menu')
	}
	function handleOpenSearchModal() {
		setShowModalSearchProduct(!showModalSearchProduct)
		console.log(showModalSearchProduct)
		//	navigation.navigate('Cart')
	}

	const handleSearchProduct = async () => {
		console.log(searchText)
		if (searched) {
			setSearched(false)
			setProducts([])
			fetchProducts()
		}
		if (!searched) {
			setSearched(true)
			setProducts([])
		}
	}

	const handleFavorite = async () => {
		if (filtered) {
			setFiltered(false)
			setProducts([])
			fetchProducts()
		}
		if (!filtered) {
			setFiltered(true)
			setProducts([])
		}
	}

	const fetchProducts = async () => {
		setLoadingMore(true)
		const {
			data: {
				getAllProducts: { products: refetchedProducts, next },
			},
		} = await fetchMore({
			variables: {
				data: {
					limit: 6,
					sortAscending: true,
					sortField: 'name',
				},
				filter: {
					status: 'ativo',
				},
			},
		})
		setNextPage(next)
		const newProducts = [...refetchedProducts]
		setProducts(newProducts)
		setLoadingMore(false)
	}

	const filterProducts = async (filter: {}) => {
		setLoadingMore(true)
		const {
			data: {
				getAllProducts: { products: refetchedProducts, next },
			},
		} = await fetchMore({
			variables: {
				data: {
					sortAscending: true,
					sortField: 'name',
				},
				filter: filter,
			},
		})

		setNextPage(next)
		const newProducts = [...products!, ...refetchedProducts]
		setProducts(newProducts)
		setLoadingMore(false)
	}

	useEffect(() => {
		if (filtered) {
			filterProducts({
				status: 'ativo',
				_id: userProfile.favoriteProducts,
			})
		}
		if (searched) {
			filterProducts({
				status: 'ativo',
				name: searchText,
			})
		}
	}, [filtered, searched])

	return (
		<View style={styles.bottomBar}>
			<ProductSearchModal
				searchText={searchText}
				setSearchText={setSearchText}
				handleSearchProduct={handleSearchProduct}
			/>
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
				disabled={route.name !== 'Menu'}
				style={styles.bottomBarIcons}
				activeOpacity={0.7}
				onPress={handleOpenSearchModal}
			>
				<MaterialIcons name='search' size={30} color='#FFFFFF' />
				<Text style={styles.bottomBarIcons}>Procurar</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bottomBarIcons}
				activeOpacity={0.7}
				onPress={handleFavorite}
			>
				<MaterialIcons
					name={
						userProfile.favoriteProducts?.length
							? 'favorite'
							: 'favorite-outline'
					}
					size={30}
					color='#FFFFFF'
				/>
				<Text style={styles.bottomBarIcons}>Favoritos</Text>
				{userProfile.favoriteProducts?.length > 0 && (
					<Text style={styles.bottomBarQtytext}>
						{userProfile.favoriteProducts?.length}
					</Text>
				)}
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
		top: 5,
		fontSize: 10,
		// opacity: 0.74,
	},
})

export default BottomBar
