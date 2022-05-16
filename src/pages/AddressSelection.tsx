import React, { useContext, useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Text,
	FlatList,
	Pressable,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import { NavigationProps } from '@typings/Navigation'
import AddressCard from '@components/AddressCard'
import { ProfileContext } from '@contexts/ProfileContext'
import Button from '@components/Button'
import { OrderContext } from '@contexts/OrderContext'
import { UserAddressProps } from '@typings/Address'

const AddressSelection = ({ navigation }: NavigationProps) => {
	const [selectedAddress, setSelectedAddress] = useState('')
	const [refresh, setRefresh] = useState(false)
	const { userProfile } = useContext(ProfileContext)
	const { setDeliveryAddress } = useContext(OrderContext)

	const handleSelectedAddress = (address: UserAddressProps) => {
		setSelectedAddress(address.name)
		setDeliveryAddress(address)
	}

	useEffect(() => {
		// Subscribe for the focus Listener

		const unsubscribe = navigation.addListener('focus', () => {
			const favoriteAddress = userProfile.addresses!.find(
				(address) => address.isFavorite === true,
			)
			if (favoriteAddress) {
				setSelectedAddress(favoriteAddress.name)
				setDeliveryAddress(favoriteAddress)
			} else if (userProfile.addresses!.length > 0) {
				setSelectedAddress(userProfile.addresses![0].name)
				setDeliveryAddress(userProfile.addresses![0])
			}
		})
		return unsubscribe
	}, [navigation, userProfile])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />

				<Text style={styles.textDelivery}>Endereço de Entrega</Text>
				<Text style={styles.text}>
					Selecione o endereço onde quer receber sua compra.
				</Text>

				<Pressable
					style={{ marginLeft: 30, marginBottom: 10 }}
					onPress={() =>
						navigation.navigate('Address', {
							address: {
								name: '',
								zipcode: '',
								street: '',
								houseNumber: '',
								district: '',
								city: '',
								state: '',
								reference: '',
								location: {
									type: '',
									coordinates: [0, 0],
								},
								isFavorite: false,
							},
							action: 'add',
							refresh,
							setRefresh,
						})
					}
				>
					<Text style={styles.addAddress}>+ NOVO ENDEREÇO</Text>
				</Pressable>

				<FlatList
					extraData={refresh}
					data={userProfile.addresses?.sort()}
					keyExtractor={(address) => String(address.name)}
					renderItem={({ item }) => (
						<AddressCard
							handleSelectedAddress={handleSelectedAddress}
							refresh={refresh}
							setRefresh={setRefresh}
							data={item}
							isSelected={item.name === selectedAddress}
							onPress={() => handleSelectedAddress(item)}
							navigation={navigation}
						/>
					)}
					showsVerticalScrollIndicator={false}
					numColumns={1}
				/>

				<Button
					buttonText='CONFIMAR ENDEREÇO DE ENTREGA'
					onPress={() => navigation.navigate('PaymentSelection')}
				/>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default AddressSelection

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
	addAddress: {
		color: '#FF8108',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
		marginTop: 15,
		marginHorizontal: 10,
	},
})
