import React, { useContext, useState } from 'react'

import { Text, StyleSheet, Image, View, Modal } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'

import { CartContext } from '@contexts/CartContext'
import { PrimaryProductHandleProps } from '@typings/Product'
import ProductCardSecondary from './ProductCardSecondary'

const ProductCardPrimary = ({ data }: PrimaryProductHandleProps) => {
	const { cart, formatCurrency } = useContext(CartContext)
	const [showModalAddToCart, setShowModalAddToCart] = useState(false)
	return (
		<View style={styles.container}>
			<RectButton
				style={styles.rect}
				onPress={() => setShowModalAddToCart(!showModalAddToCart)}
			>
				<Image source={{ uri: data.image }} style={styles.image} />

				<Text>{data.name}</Text>
				<View style={styles.priceView}>
					<View
						style={{
							marginBottom: data.saleUnits.length > 0 ? -7 : 0,
						}}
					>
						{data.saleUnits.map((saleUnit, index) => (
							<View key={saleUnit._id}>
								<Text
									style={
										index === data.saleUnits.length - 1
											? styles.saleUnitLastChild
											: styles.saleUnit
									}
								>
									{formatCurrency(saleUnit.price)}
									<Text style={{ color: 'red' }}> {saleUnit.saleUnit}</Text>
								</Text>
							</View>
						))}
					</View>

					{cart.items.find((item) => item._id === data._id) && (
						<FontAwesome name='cart-plus' size={24} color='#FF8108' />
					)}
					<View style={styles.iconContainer}>
						<FontAwesome name='plus' size={24} color='#FF8108' />
					</View>
				</View>
				<Modal
					animationType='slide'
					transparent
					visible={showModalAddToCart}
					onRequestClose={() => {
						setShowModalAddToCart(!showModalAddToCart)
					}}
				>
					<ProductCardSecondary
						data={data}
						showModalAddToCart={showModalAddToCart}
						setShowModalAddToCart={setShowModalAddToCart}
					/>
				</Modal>
			</RectButton>
		</View>
	)
}

export default ProductCardPrimary

const styles = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.08)',
		borderRadius: 5,
		margin: 5,
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	rect: {
		marginHorizontal: 5,
	},

	image: {
		flex: 1,
		width: 150,
		height: 130,
		resizeMode: 'contain',
	},
	saleUnit: {
		marginBottom: 5,
		flex: 1,
		fontSize: 10,
		color: 'rgba(0, 0, 0, 0.38)',
	},

	saleUnitLastChild: {
		color: 'rgba(0, 0, 0, 0.87)',
	},

	priceView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 5,
	},
	iconContainer: {
		backgroundColor: '#1E9C25',
		height: 36,
		width: 36,
		marginBottom: -5,
		marginRight: -5,
		borderBottomRightRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
