import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, Image, View } from 'react-native'

import { CartProductHandleProps } from '../types/Product'
import { MaterialIcons } from '@expo/vector-icons'
import NumericInput from 'react-native-numeric-input'

import { CartContext } from '../contexts/CartContext'

export const ProductCardTertiary = ({ data }: CartProductHandleProps) => {
	const { handleAddItemToCart, handleRemoveItemFromCart, formatCurrency } =
		useContext(CartContext)

	const [currentItemTotalQty, setCurrentItemTotalQty] = useState(1)
	const [currentItemTotalPrice, setCurrentItemTotalPrice] = useState(0)

	function handleChangeProductQty(value: number) {
		data.itemTotalQty = value
		data.itemTotalPrice = data.saleUnit.price * value
		setCurrentItemTotalQty(data.itemTotalQty)
		setCurrentItemTotalPrice(data.itemTotalPrice)
		handleAddItemToCart(data)
	}

	useEffect(() => {
		setCurrentItemTotalQty(data.itemTotalQty)
		setCurrentItemTotalPrice(data.itemTotalPrice)
	}, [])

	return (
		<View style={styles.container} key={data._id}>
			<Image source={{ uri: data.image }} style={styles.image} />
			<View style={styles.verticalBar}></View>
			<View
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					paddingHorizontal: 8,
					paddingVertical: 4,
					justifyContent: 'space-between',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 18,
							color: 'rgba(0, 0, 0, 0.87)',
						}}
					>
						{data.name}
					</Text>

					<MaterialIcons
						name='delete-outline'
						size={24}
						color='rgba(0, 0, 0, 0.60)'
						onPress={() => handleRemoveItemFromCart(data)}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
					}}
				>
					<Text
						style={{
							marginTop: -5,
							fontFamily: 'Roboto',
							fontSize: 12,
							color: 'rgba(0, 0, 0, 0.38)',
						}}
					>
						{formatCurrency(data.saleUnit.price)}/{data.saleUnit.saleUnit}
					</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
					}}
				>
					<Text
						style={{
							fontFamily: 'Roboto',
							fontWeight: '700',
							fontSize: 13,
							color: 'rgba(0, 0, 0, 0.60)',
						}}
					>
						Total: {formatCurrency(currentItemTotalPrice)}
					</Text>

					<NumericInput
						onChange={(value) => {
							handleChangeProductQty(value)
						}}
						totalWidth={90}
						totalHeight={30}
						valueType='real'
						minValue={0.1}
						initValue={currentItemTotalQty}
						step={1}
						rounded
						textColor='rgba(0, 0, 0, 0.6)'
						containerStyle={{
							backgroundColor: '#FFFFFF',
							shadowColor: 'rgba(0, 0, 0, 0.6)',
							shadowOpacity: 0.78,
							shadowRadius: 10.95,
							elevation: 5,
						}}
						rightButtonBackgroundColor='#FFFFFF'
						leftButtonBackgroundColor='#FFFFFF'
						separatorWidth={0}
					/>
				</View>
			</View>
			{/* </RectButton> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.08)',
		borderRadius: 5,
		marginHorizontal: 12,
		margin: 5,
		//paddingHorizontal: 5,
		backgroundColor: 'rgba(98, 0, 238, 0.04)',
		flexDirection: 'row',
		//justifyContent: 'space-between',
		alignItems: 'center',
	},

	wrapper: {
		//flex: 1,
		backgroundColor: 'rgba(98, 0, 238, 0.04)',
		flexDirection: 'row',
		//justifyContent: 'space-between',
		alignItems: 'center',
	},
	verticalBar: {
		height: 50,
		width: 1,
		backgroundColor: 'rgba(0, 87, 35, 0.2)',
		//	position: 'absolute',
		marginLeft: 10,
	},
	text: {
		//alignContent: 'flex-start',
		// color: colors.green_dark,
		// fontFamily: fonts.heading,
		//marginVertical: 16,
	},
	rect: {
		//maxWidth: '45%',
		//paddingVertical: 10,
		//backgroundColor: 'red',
		//justifyContent: 'flex-end',
		//margin: 10,
		//marginHorizontal: 5,
	},

	image: {
		//flex: 1,
		width: 75,
		height: 75,
		//resizeMode: 'contain',
	},
})

export default ProductCardTertiary
