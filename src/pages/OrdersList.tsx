import React, { useContext, useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Text,
	FlatList,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import { NavigationProps } from '@typings/Navigation'

import Button from '@components/Button'
import { OrderContext } from '@contexts/OrderContext'

import { OrderCard } from '@components/OrderCard'
import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS } from '@gql/Order.gql'
import OrderLoad from '@components/OrderLoad'

import { ProfileContext } from '@contexts/ProfileContext'

const Orderslist = ({ navigation }: NavigationProps) => {
	const { userProfile } = useContext(ProfileContext)

	const { order, userOrders, setUserOrders } = useContext(OrderContext)
	const [nextPage, setNextPage] = useState('')

	const { loading, data, fetchMore } = useQuery(GET_ALL_ORDERS, {
		variables: {
			data: {
				limit: 6,
				sortField: 'createdAt',
				sortAscending: false,
			},
			filter: {
				customerId: userProfile._id,
			},
		},
	})

	async function handleFetchMore(distance: number) {
		if (distance < 1) return
		if (nextPage) {
			const {
				data: {
					getAllOrders: { orders: refetchedOrders, next },
				},
			} = await fetchMore({
				variables: {
					data: {
						limit: 6,
						sortField: 'createdAt',
						sortAscending: false,
						nextPage,
					},
					filter: {
						customerId: userProfile._id,
					},
				},
			})
			setNextPage(next)
			const newOrders = [...userOrders!, ...refetchedOrders]
			setUserOrders(newOrders)
		}
	}

	useEffect(() => {
		if (data) {
			const {
				getAllOrders: { orders: refetchedOrders, next },
			} = data
			setNextPage(next)
			setUserOrders(refetchedOrders)
		}
	}, [data, order])
	if (loading) return <OrderLoad />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />

				<Text style={styles.textDelivery}>Pedidos</Text>
				<Text style={styles.text}>Clique no pedido para ver detalhes.</Text>

				<FlatList
					data={userOrders}
					keyExtractor={(item) => String(item._id)}
					renderItem={({ item }) => (
						<OrderCard data={item} navigation={navigation} />
					)}
					showsVerticalScrollIndicator={false}
					numColumns={1}
					onEndReachedThreshold={0.2}
					onEndReached={({ distanceFromEnd }) =>
						handleFetchMore(distanceFromEnd)
					}
				/>

				<Button
					buttonText='VOLTAR PARA A LOJA'
					onPress={() => navigation.navigate('Menu')}
				/>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default Orderslist

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
	},
	text: {
		marginHorizontal: 10,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 14,
		fontWeight: '400',
		fontFamily: 'Roboto',
	},
})
