import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Modal,
	Pressable,
	TextInput,
} from 'react-native'

import { Fontisto, MaterialIcons } from '@expo/vector-icons'

import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'

import { NavigationProps } from '../types/Navigation'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { ProfileContext } from '../contexts/ProfileContext'
//import { UserAddressProps } from '../types/Profile'
import { Picker } from '@react-native-community/picker'
import { OrderContext } from '../contexts/OrderContext'
import { Load } from '../components/Load'

export function Delivery({ navigation }: NavigationProps) {
	const { setDeliveryAddress } = useContext(OrderContext)
	const { userProfile, setUserProfile } = useContext(ProfileContext)
	const [showModalSaveAddress, setShowModalSaveAddress] = useState(false)

	const [selectedAddress, setSelectedAddress] = useState()

	const [name, setName] = useState('')
	const [newName, setNewName] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [state, setState] = useState('')
	const [city, setCity] = useState('')
	const [district, setDistrict] = useState('')
	const [street, setStreet] = useState('')
	const [houseNumber, setHouseNumber] = useState('')
	const [reference, setReference] = useState('')
	const [coordinates, setCoordinates] = useState([])

	function setAddressData() {
		const newDeliveryAddress: any = {
			name: newName ? newName : name,
			zipcode: zipcode,
			street: street,
			houseNumber: houseNumber,
			district: district,
			city: city,
			state: state,
			reference: reference,
			location: {
				type: 'Point',
				coordinates: [0, 0],
			},
		}

		setDeliveryAddress(newDeliveryAddress)
		if (
			JSON.stringify(newDeliveryAddress) !== JSON.stringify(selectedAddress) &&
			newName === ''
		) {
			setShowModalSaveAddress(!showModalSaveAddress)
			return newDeliveryAddress
		}
		if (newName) {
			return newDeliveryAddress
		}
		navigation.navigate('Payment')
	}

	const addressSelection = (name: string) => {
		if (userProfile.addresses) {
			const selectedAddress = userProfile.addresses.find(
				(address) => address.name == name,
			)
			//	setSelectedAddress(selectedAddress!)
			setDeliveryAddress(selectedAddress!)
			//setNewName(selectedAddress!.name)
			setName(selectedAddress!.name)
			setZipcode(selectedAddress!.zipcode)
			setState(selectedAddress!.state)
			setCity(selectedAddress!.city)
			setDistrict(selectedAddress!.district)
			setStreet(selectedAddress!.street)
			setHouseNumber(selectedAddress!.houseNumber)
			setReference(selectedAddress!.reference)
		}
	}

	async function saveAddress() {
		const profile = userProfile
		const newDeliveryAddress = setAddressData()

		if (profile.addresses) {
			profile.addresses!.push(newDeliveryAddress!)
			setUserProfile!(profile)
			navigation.navigate('Payment')
			return
		}
		//perfil não tem endereço
		profile.addresses = [newDeliveryAddress!]
		setUserProfile!(profile)
		navigation.navigate('Payment')
	}

	function handleDeleteAddress(addressName: string) {
		const profile = userProfile
		const profileAddresses = userProfile.addresses!.filter(
			(address) => address.name !== addressName,
		)
		if (profileAddresses.length) {
			profile.addresses = profileAddresses
			setUserProfile!(profile)
			addressSelection(profile.addresses[0].name)
			return
		}
		profile.addresses = []
		setUserProfile!(profile)
		setSelectedAddress(undefined)
	}

	useEffect(() => {
		if (userProfile.addresses?.length) {
			addressSelection(userProfile.addresses[0].name)
		}
	}, [])

	if (userProfile.addresses?.length && !selectedAddress) return <Load />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar />
				<ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text style={styles.textDelivery}>Endereço de Entrega</Text>
						{userProfile.addresses?.length ? (
							<>
								<Picker
									style={styles.picker}
									//	selectedValue={selectedAddress!.name}
									onValueChange={(itemValue) => {
										addressSelection(itemValue.toString())
									}}
									mode='dropdown'
								>
									{userProfile.addresses!.map((address) => {
										return (
											<Picker.Item
												label={address.name}
												value={address.name}
												key={address.name}
											/>
										)
									})}
								</Picker>

								<MaterialIcons
									name='delete-outline'
									size={24}
									color='rgba(0, 0, 0, 0.60)'
									//onPress={() => handleDeleteAddress(selectedAddress!.name)}
								/>
							</>
						) : (
							<></>
						)}
					</View>
					<TouchableOpacity style={styles.naviButton} activeOpacity={0.7}>
						<Fontisto name='map-marker-alt' size={24} color='#FF8108' />
						<Text style={styles.naviButtonText}>ESCOLHER NO MAPA</Text>
					</TouchableOpacity>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={styles.cep}>
							<Text style={styles.text}>Cep</Text>
							<FloatingLabelInput
								value={zipcode}
								containerStyles={styles.textInput}
								onChangeText={(value) => setZipcode(value)}
								label={''}
							/>
						</View>
						<View style={styles.state}>
							<Text style={styles.text}>UF</Text>
							<FloatingLabelInput
								value={state}
								containerStyles={styles.textInput}
								onChangeText={(value) => setState(value)}
								label={''}
							/>
						</View>
					</View>
					<Text style={styles.text}>Cidade</Text>
					<FloatingLabelInput
						value={city}
						containerStyles={styles.textInput}
						onChangeText={(value) => setCity(value)}
						label={''}
					/>
					<Text style={styles.text}>Bairro</Text>
					<FloatingLabelInput
						value={district}
						containerStyles={styles.textInput}
						onChangeText={(value) => setDistrict(value)}
						label={''}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={styles.cep}>
							<Text style={styles.text}>Rua</Text>
							<FloatingLabelInput
								value={street}
								containerStyles={styles.textInput}
								onChangeText={(value) => setStreet(value)}
								label={''}
							/>
						</View>
						<View style={styles.state}>
							<Text style={styles.text}>Número</Text>
							<FloatingLabelInput
								value={houseNumber}
								containerStyles={styles.textInput}
								onChangeText={(value) => setHouseNumber(value)}
								label={''}
							/>
						</View>
					</View>

					<Text style={styles.text}>Ponto de Referencia</Text>
					<FloatingLabelInput
						value={reference}
						containerStyles={styles.textInput}
						onChangeText={(value) => setReference(value)}
						label={''}
					/>

					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.button}
						onPress={async () => {
							setAddressData()
						}}
					>
						<Text style={styles.buttonText}>AVANÇAR</Text>
					</TouchableOpacity>

					<Modal
						animationType='slide'
						transparent={true}
						visible={showModalSaveAddress}
						onRequestClose={() => {
							setShowModalSaveAddress(!showModalSaveAddress)
						}}
					>
						<View style={styles.modal}>
							<View style={styles.modalWrapper}>
								<Text style={styles.modaltext}>Salvar este endereço?</Text>
								<FloatingLabelInput
									label=''
									hint='Digite o nome, Ex. Casa'
									value={newName}
									staticLabel
									containerStyles={{
										margin: 5,
										height: 50,
										borderStyle: 'solid',
										borderWidth: 1,
										borderColor: 'rgba(0, 0, 0, 0.12)',
										borderRadius: 4,
										//alignItems: 'center',
									}}
									labelStyles={{
										backgroundColor: '#FFFFFF',
										//	padding: 2,
									}}
									customLabelStyles={{
										fontSizeFocused: 16,
									}}
									inputStyles={{
										color: '#313130',
										paddingHorizontal: 10,
									}}
									onChangeText={(value) => {
										setNewName(value)
									}}
								/>
								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Pressable
										onPress={() => {
											navigation.navigate('Payment')
										}}
									>
										<Text
											style={{
												fontFamily: 'Roboto',
												fontSize: 20,
												textAlign: 'center',
												color: 'rgba(33, 33, 33, 0.38)',
											}}
										>
											Cancelar
										</Text>
									</Pressable>

									<Pressable
										onPress={() => {
											saveAddress()
										}}
									>
										<Text
											style={{
												fontFamily: 'Roboto',
												fontSize: 20,
												textAlign: 'center',
												color: '#FF8108',
											}}
										>
											Salvar
										</Text>
									</Pressable>
								</View>
							</View>
						</View>
					</Modal>
				</ScrollView>

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
		marginVertical: 15,
	},
	text: {
		marginLeft: 5,
		marginTop: 5,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
	},
	picker: {
		width: 130,
	},

	button: {
		height: 50,
		marginTop: 10,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	naviButton: {
		height: 50,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#FF8108',
	},
	naviButtonText: {
		marginLeft: 10,
		color: '#FF8108',
		fontSize: 20,
		fontWeight: '600',
	},
	buttonText: {
		marginLeft: 10,
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
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

	cep: {
		flex: 3,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginRight: 12,
		borderRadius: 4,
		width: '100%',
	},
	state: {
		width: 70,
		textAlign: 'left',
		borderRadius: 4,
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalWrapper: {
		backgroundColor: '#FFFFFF',
		height: 200,
		width: 300,
		borderRadius: 4,
		//alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40,
		paddingVertical: 30,
	},

	modaltext: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: '700',
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.5)',
	},
})
