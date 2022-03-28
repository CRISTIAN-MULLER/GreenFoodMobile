import React, { useContext, useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	FlatList,
	ActivityIndicator,
} from 'react-native'

import { MenuLoad } from '../components/MenuLoad'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'

import ProductCardPrimary from '../components/ProductCardPrimary'
import { ProductContext } from '../contexts/ProductContext'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from '../gql/Product.gql'
import { NavigationProps } from '../types/Navigation'
import { ProductProps } from '../types/Product'

interface queryData {
	data: {
		getAllProducts: { products: ProductProps[]; previous: string; next: string }
	}
}

export function Menu({ navigation }: NavigationProps) {
	const { products, setProducts, loadingMore, setLoadingMore } =
		useContext(ProductContext)
	const [showModalAddToCart, setShowModalAddToCart] = useState(false)
	const [nextPage, setNextPage] = useState('')

	const { loading, data, error, fetchMore } = useQuery(GET_ALL_PRODUCTS, {
		variables: {
			data: {
				limit: 6,
				sortAscending: true,
				sortField: 'name',
			},
		},
	})

	async function handleFetchMore(distance: number) {
		if (distance < 1) return
		if (nextPage) {
			setLoadingMore(true)
			const {
				data: {
					getAllProducts: { products: refetchedProducts, next },
				},
			}: queryData = await fetchMore({
				variables: {
					data: {
						limit: 6,
						sortAscending: true,
						sortField: 'name',
						nextPage: nextPage,
					},
				},
			})
			setNextPage(next)
			const newProducts = [...products!, ...refetchedProducts]

			setProducts(newProducts)
			setLoadingMore(false)
		}
	}

	useEffect(() => {
		if (data) {
			const {
				getAllProducts: { products, next },
			} = data
			setNextPage(next)
			setProducts(products)
		}
	}, [data])
	if (loading) return <MenuLoad />
	if (error) console.log(error)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
				<View style={styles.productsCard}>
					<FlatList
						data={products}
						keyExtractor={(item) => String(item._id)}
						renderItem={({ item }) => (
							<ProductCardPrimary
								data={item}
								showModalAddToCart={showModalAddToCart}
								setShowModalAddToCart={setShowModalAddToCart}
							/>
						)}
						showsVerticalScrollIndicator={false}
						numColumns={2}
						onEndReachedThreshold={0.2}
						onEndReached={({ distanceFromEnd }) =>
							handleFetchMore(distanceFromEnd)
						}
						ListFooterComponent={
							loadingMore ? (
								<ActivityIndicator size='large' color='#005723' />
							) : (
								<></>
							)
						}
					></FlatList>
				</View>
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
	productsCard: {
		flex: 1,
		padding: 10,
	},
})
