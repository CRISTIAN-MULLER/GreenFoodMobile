import React, { useContext, useEffect, useState } from 'react'

import { Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ProductContext } from '@contexts/ProductContext'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { ProductSearchProps } from '@typings/Product'

const ProductSearchModal = ({
	setSearchText,
	searchText,
	handleSearchProduct,
}: ProductSearchProps) => {
	const { showModalSearchProduct, setShowModalSearchProduct } =
		useContext(ProductContext)
	const [isVisible, setIsVisible] = useState(true)

	const handleSearch = () => {
		setShowModalSearchProduct(!showModalSearchProduct)
		handleSearchProduct()
	}

	const handleVisibility = (value: boolean) => {
		setIsVisible(value)
	}

	useEffect(() => {
		handleVisibility(showModalSearchProduct)
	}, [showModalSearchProduct])

	return (
		<Modal
			animationType='slide'
			transparent
			visible={isVisible}
			onRequestClose={() => {
				setShowModalSearchProduct(!showModalSearchProduct)
			}}
		>
			<View style={styles.modalContainer}>
				<View style={styles.wrapper}>
					<Text style={styles.text}>Digite o nome do produto.</Text>
					<FloatingLabelInput
						containerStyles={styles.textInput}
						value={searchText}
						onChangeText={(value) => setSearchText(value)}
						label=''
					/>
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={() => {
							handleSearch()
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={styles.buttonText}>Pesquisar</Text>
							<MaterialIcons name='search' size={30} color='#FFFFFF' />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

export default ProductSearchModal

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
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	wrapper: {
		backgroundColor: '#FFFFFF',
		borderRadius: 4,
		padding: 10,
	},
	text: {
		marginHorizontal: 10,
		marginVertical: 10,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	textInput: {
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(33, 33, 33, 0.38)',
		color: 'rgba(33, 33, 33, 0.8)',
		flexWrap: 'nowrap',
		height: 44,
		padding: 5,
		textAlign: 'left',
	},
	button: {
		height: 50,
		backgroundColor: '#FF8108',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},

	buttonText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
		marginRight: 20,
	},
})
