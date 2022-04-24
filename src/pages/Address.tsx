import React, { useContext, useState, Dispatch, SetStateAction } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	LogBox,
} from 'react-native'

import { useRoute } from '@react-navigation/native'

import { Fontisto } from '@expo/vector-icons'

import { FloatingLabelInput } from 'react-native-floating-label-input'
import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'

import { NavigationProps } from '@typings/Navigation'
import { ProfileContext } from '@contexts/ProfileContext'
import { UserAddressProps } from '@typings/Address'
import Button from '@components/Button'

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state',
])

interface Params {
	address: UserAddressProps
	action: string
	refresh: boolean
	setRefresh: Dispatch<SetStateAction<boolean>>
}

const Address = ({ navigation }: NavigationProps) => {
	const route = useRoute()
	const { address, action, refresh, setRefresh } = route.params as Params

	const { userProfile, handleAddress } = useContext(ProfileContext)

	const [name, setName] = useState(address.name)
	const [zipcode, setZipcode] = useState(address.zipcode)
	const [state, setState] = useState(address.state)
	const [city, setCity] = useState(address.city)
	const [district, setDistrict] = useState(address.district)
	const [street, setStreet] = useState(address.street)
	const [houseNumber, setHouseNumber] = useState(address.houseNumber)
	const [reference, setReference] = useState(address.reference)

	function setAddressData() {
		const newDeliveryAddress: any = {
			name,
			zipcode,
			street,
			houseNumber,
			district,
			city,
			state,
			reference,
			location: {
				type: 'Point',
				coordinates: [0, 0],
			},
		}

		const hasAddres = userProfile.addresses!.filter(
			(userAddress: { name: string }) => userAddress.name === name,
		)

		if (hasAddres.length && action === 'add') {
			alert('Já existe um endereço com esse nome')
			return
		}

		handleAddress(newDeliveryAddress, action)
		setRefresh(!refresh)
		navigation.navigate('AddressSelection')
	}

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
						<Text style={styles.text}>Nome:</Text>
						<FloatingLabelInput
							value={name}
							containerStyles={{
								marginLeft: 5,
								alignItems: 'center',
								borderBottomColor: 'rgba(33, 33, 33, 0.38)',
								borderBottomWidth: 1,
							}}
							onChangeText={(value) => setName(value)}
							label=''
						/>
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
								label=''
							/>
						</View>
						<View style={styles.state}>
							<Text style={styles.text}>UF</Text>
							<FloatingLabelInput
								value={state}
								containerStyles={styles.textInput}
								onChangeText={(value) => setState(value)}
								label=''
							/>
						</View>
					</View>
					<Text style={styles.text}>Cidade</Text>
					<FloatingLabelInput
						value={city}
						containerStyles={styles.textInput}
						onChangeText={(value) => setCity(value)}
						label=''
					/>
					<Text style={styles.text}>Bairro</Text>
					<FloatingLabelInput
						value={district}
						containerStyles={styles.textInput}
						onChangeText={(value) => setDistrict(value)}
						label=''
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
								label=''
							/>
						</View>
						<View style={styles.state}>
							<Text style={styles.text}>Número</Text>
							<FloatingLabelInput
								value={houseNumber}
								containerStyles={styles.textInput}
								onChangeText={(value) => setHouseNumber(value)}
								label=''
							/>
						</View>
					</View>

					<Text style={styles.text}>Ponto de Referencia</Text>
					<FloatingLabelInput
						value={reference}
						containerStyles={styles.textInput}
						onChangeText={(value) => setReference(value)}
						label=''
					/>

					<Button buttonText='SALVAR' onPress={() => setAddressData()} />
				</ScrollView>

				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default Address

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
		marginRight: 10,
		color: '#005723',
		fontSize: 18,
		fontWeight: '700',
		fontFamily: 'Roboto',
		marginVertical: 15,
	},
	text: {
		marginLeft: 5,
		color: 'rgba(33, 33, 33, 0.38)',
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'Roboto',
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
		width: 80,
		textAlign: 'left',
		borderRadius: 4,
	},
})
