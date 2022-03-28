import React, { useContext, useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	ScrollView,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from 'react-native'

import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'

import { NavigationProps } from '../types/Navigation'
import AddressCard from '../components/AddressCard'
import { ProfileContext } from '../contexts/ProfileContext'
import { Button } from '../components/Button'
import { OrderContext } from '../contexts/OrderContext'
import { UserAddressProps } from '../types/Address'

export function AddressSelection({ navigation }: NavigationProps) {
	const [selectedAddress, setSelectedAddress] = useState('Casa')
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
			setSelectedAddress('Casa')
		})
		return () => {
			unsubscribe
		}
	}, [navigation])

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
							},
							action: 'add',
							refresh: refresh,
							setRefresh: setRefresh,
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
					buttonText={'CONFIMAR ENDEREÇO DE ENTREGA'}
					onPress={() => navigation.navigate('Payment')}
				/>
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
	button: {
		// position: 'absolute',
		//width: '70%',
		height: 50,
		marginHorizontal: 12,
		//   left: 64,
		//   top: 450,
		marginTop: 30,
		marginBottom: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	buttonText: {
		//flex: 1,
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
	},
})
