import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-community/picker'
import NumericInput from 'react-native-numeric-input'

import { CartContext } from '../contexts/CartContext'
import { ProductHandleProps, SaleUnitProps } from '../types/Product'
import { ProfileContext } from '../contexts/ProfileContext'
import { ProductContext } from '../contexts/ProductContext'

export const ProductCardSecondary = ({
	data,
	showModalAddToCart,
	setShowModalAddToCart,
}: ProductHandleProps) => {
	const { cart, handleAddItemToCart, formatCurrency } = useContext(CartContext)
	const [saleUnit, setSaleUnit] = useState<SaleUnitProps>({
		_id: '',
		description: '',
		price: 0,
		saleUnit: '',
		active: false,
		isDefault: false,
	})

	const [itemTotalQty, setItemTotalQty] = useState(1)

	const [itemTotalPrice, setItemTotalPrice, ,] = useState(0)

	const saleUnitSelection = (id: any) => {
		const selectedSaleUnit = data.saleUnits.find(
			(saleUnit) => saleUnit._id == id,
		)
		setSaleUnit(selectedSaleUnit!)
		setItemTotalQty(1)
		setItemTotalPrice(selectedSaleUnit!.price * 1)
	}

	const addItemToCart = () => {
		const newItem = {
			_id: data._id,
			name: data.name,
			image: data.image,
			saleUnit: saleUnit,
			itemTotalQty: itemTotalQty,
			itemTotalPrice: itemTotalPrice,
		}
		handleAddItemToCart(newItem)
	}

	useEffect(() => {
		const hasItem = cart.items.find((item) => item._id === data._id)

		if (hasItem) {
			setSaleUnit(hasItem.saleUnit)
			setItemTotalQty(hasItem.itemTotalQty)
			setItemTotalPrice(hasItem.itemTotalPrice)
			return
		}

		const defaultSaleunit = data.saleUnits.find(
			(saleUnit) => saleUnit.isDefault === true,
		)
		setSaleUnit(defaultSaleunit!)
		setItemTotalPrice(defaultSaleunit!.price * itemTotalQty)
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Image source={{ uri: data.image }} style={styles.image} />
				<View style={styles.card}>
					<Text
						style={{
							fontWeight: '500',
							fontSize: 18,
							color: 'rgba(0, 0, 0, 0.87)',
						}}
					>
						{data.name}
					</Text>
					<Text
						style={{
							fontWeight: '500',
							fontSize: 14,
							color: 'rgba(0, 0, 0, 0.38)',
						}}
					>
						{formatCurrency(saleUnit!.price)} / {saleUnit!.saleUnit}
					</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.text}>Selecione</Text>
					<View style={styles.picker}>
						<Picker
							style={styles.picker}
							selectedValue={saleUnit._id}
							onValueChange={(itemValue) => {
								saleUnitSelection(itemValue)
							}}
							mode='dropdown'
						>
							{data.saleUnits.map((saleUnit) => {
								return (
									<Picker.Item
										label={saleUnit.saleUnit}
										value={saleUnit._id}
										key={saleUnit._id}
									/>
								)
							})}
						</Picker>
					</View>
				</View>

				<View style={styles.card}>
					<Text style={styles.text}>Quantidade</Text>
					<NumericInput
						onChange={(value) => {
							if (typeof value !== 'number') {
								const totalQty = parseFloat(value)
								setItemTotalQty(totalQty)
								const totalPrice = (parseFloat(value) * saleUnit.price).toFixed(
									2,
								)
								setItemTotalPrice(parseFloat(totalPrice))
								return
							}
							setItemTotalQty(value)
							const totalPrice = (value * saleUnit.price).toFixed(2)
							setItemTotalPrice(parseFloat(totalPrice))
						}}
						totalWidth={100}
						totalHeight={40}
						valueType='real'
						minValue={0.1}
						initValue={itemTotalQty}
						step={1}
						rounded
						textColor='rgba(0, 0, 0, 0.6)'
						rightButtonBackgroundColor='#FFFFFF'
						leftButtonBackgroundColor='#FFFFFF'
						separatorWidth={0}
					/>
				</View>

				<View
					style={{
						width: '100%',
						height: 1,
						backgroundColor: 'rgba(33, 33, 33, 0.08)',
					}}
				/>

				<View style={styles.card}>
					<Text style={styles.total}>Total</Text>
					<Text style={styles.total}>{formatCurrency(itemTotalPrice)}</Text>
				</View>

				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={() => {
						addItemToCart()
						setItemTotalQty(1)
						setShowModalAddToCart(!showModalAddToCart)
					}}
				>
					<Text style={styles.buttonText}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	wrapper: {
		backgroundColor: '#FFFFFF',
		height: 400,
		width: 300,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingBottom: 12,
	},
	image: {
		flex: 1,
		width: '100%',
		height: 100,
		resizeMode: 'contain',
	},
	text: {
		color: 'rgba(0, 0, 0, 0.6)',
		fontSize: 18,
		marginRight: 10,
	},
	card: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	picker: {
		height: 40,
		width: 100,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#B8B8B9',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '100%',
		height: 50,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},

	buttonText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
	},
	total: {
		color: '#005723',
		fontSize: 18,
		marginRight: 10,
		fontWeight: '700',
	},
})
