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

export function Delivery({ navigation }: NavigationProps) {
	return (
		// <>
		// {queryLoading ? (return <Load />) : (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />

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
})
