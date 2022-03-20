import React, { useContext, useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	FlatList,
} from 'react-native'

import { Load } from '../components/Load'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'

import ProductCardPrimary from '../components/ProductCardPrimary'
import { ProductContext } from '../contexts/ProductContext'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from '../gql/Product.gql'
import { NavigationProps } from '../types/Navigation'

export function Menu({ navigation }: NavigationProps) {
	const { products, setProducts } = useContext(ProductContext)
	const [showModalAddToCart, setShowModalAddToCart] = useState(false)

	const { loading, data, error } = useQuery(GET_ALL_PRODUCTS)

	useEffect(() => {
		if (data) {
			const { getAllProducts } = data
			setProducts(getAllProducts)
		}
	}, [data])
	if (loading) return <Load />
	return (
		// <>
		// {queryLoading ? (return <Load />) : (
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
						//onEndReachedThreshold={0.1}
						// onEndReached={({ distanceFromEnd }) =>
						//   handleFetchMore(distanceFromEnd)
						// }
						// ListFooterComponent={
						// //  <BottomBar />
						//   //loadingMore ? <ActivityIndicator color={'green'} /> : <></>
						// }
					></FlatList>
				</View>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
		// 		)}
		// </>
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
