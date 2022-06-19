import React, { useContext, useEffect } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	FlatList,
	ActivityIndicator,
} from 'react-native'

import MenuLoad from '@components/MenuLoad'
import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import ProductCardPrimary from '@components/ProductCardPrimary'
import { ProductContext } from '@contexts/ProductContext'
import { NavigationProps } from '@typings/Navigation'
import { useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '@gql/Product.gql'

const Menu = ({ navigation }: NavigationProps) => {
	const { handleFetchMore, products, setProducts, loadingMore, setNextPage } =
		useContext(ProductContext)

	const { loading, data } = useQuery(GET_ALL_PRODUCTS, {
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

	useEffect(() => {
		if (data) {
			const {
				getAllProducts: { products: refetchedProducts, next },
			} = data
			setNextPage(next)
			setProducts(refetchedProducts)
		}
	}, [data])
	if (loading) return <MenuLoad />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />
				<View style={styles.productsCard}>
					<FlatList
						data={products}
						keyExtractor={(item) => String(item._id)}
						renderItem={({ item }) => <ProductCardPrimary data={item} />}
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
								<View />
							)
						}
					/>
				</View>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default Menu

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},

	wrapper: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'space-between',
	},
	productsCard: {
		flex: 1,
		padding: 10,
	},
})
