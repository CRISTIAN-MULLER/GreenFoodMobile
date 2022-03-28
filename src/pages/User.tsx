import React, { useContext, useState } from 'react'

import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	StatusBar,
} from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { FloatingLabelInput } from 'react-native-floating-label-input'

import LogoSVG from '../../assets/LogoSVG'
import Gradient from '../components/Gradient'
import { NavigationProps } from '../types/Navigation'
import { useMutation } from '@apollo/client'

import { REGISTER } from '../gql/User.gql'
import { ProfileContext } from '../contexts/ProfileContext'

export function User({ navigation }: NavigationProps) {
	const { userProfile, setUserProfile } = useContext(ProfileContext)

	const [password, setPassword] = useState<string>('')
	const [confirmationPassword, setConfirmationPassword] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [show, setShow] = useState(false)

	const [registerNewUser] = useMutation(REGISTER)

	async function handleRegisterNewUser() {
		console.log(email, password, firstName, lastName, phone)

		try {
			const {
				data: { registerUser },
			} = await registerNewUser({
				variables: {
					data: {
						password: password,
						phone: phone,
						email: email,
						firstName: firstName,
						lastName: lastName,
					},
				},
			})
			setUserProfile!(registerUser)
			navigation.navigate('Menu')
		} catch (error) {
			console.log(error)
		}
	}

	// function handleInputBlur() {
	//   setIsFocused(false);
	//   setIsFilled(!!name);
	// }

	// function handleInputFocus() {
	//   setIsFocused(true);
	// }
	// function handleInputChange(value: string) {
	//   setIsFilled(!!value);
	//   setName(value);
	// }

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Gradient />
				<View style={{ marginTop: StatusBar.currentHeight }}>
					<LogoSVG width='170' height='150' />
				</View>
				<View style={styles.userInputs}>
					<Text style={styles.text}>Nome</Text>
					<FloatingLabelInput
						leftComponent={
							<Ionicons
								name='person'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						value={firstName}
						containerStyles={styles.textInput}
						inputStyles={{
							color: '#313130',
							paddingHorizontal: 10,
						}}
						onChangeText={(name) => setFirstName(name)}
						label={''}
					/>
					<Text style={styles.text}>Sobrenome</Text>
					<FloatingLabelInput
						leftComponent={
							<Ionicons
								name='person'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						value={lastName}
						containerStyles={styles.textInput}
						inputStyles={{
							color: '#313130',
							paddingHorizontal: 10,
						}}
						onChangeText={(name) => setLastName(name)}
						label={''}
					/>
					<Text style={styles.text}>E-mail</Text>
					<FloatingLabelInput
						leftComponent={
							<MaterialIcons
								name='email'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						keyboardType='email-address'
						value={email}
						containerStyles={styles.textInput}
						inputStyles={{
							color: '#313130',
							paddingHorizontal: 10,
						}}
						onChangeText={(value) => setEmail(value)}
						label={''}
					/>

					<Text style={styles.text}>Senha</Text>
					<FloatingLabelInput
						leftComponent={
							<MaterialIcons
								name='lock'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						value={password}
						isPassword
						togglePassword={show}
						customShowPasswordComponent={
							<Ionicons
								name='eye'
								size={24}
								color='rgba(0, 0, 0, 0.38)'
								style={{ marginRight: 5 }}
							/>
						}
						customHidePasswordComponent={
							<Ionicons
								name='eye-off'
								size={24}
								color='rgba(0, 0, 0, 0.38)'
								style={{ marginRight: 5 }}
							/>
						}
						staticLabel
						containerStyles={styles.textInput}
						inputStyles={{
							color: '#313130',
							paddingHorizontal: 10,
						}}
						onChangeText={(value) => setPassword(value)}
						label={''}
					/>

					<Text style={styles.text}>Confirmar senha</Text>
					<FloatingLabelInput
						leftComponent={
							<MaterialIcons
								name='lock'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						value={confirmationPassword}
						isPassword
						togglePassword={show}
						customShowPasswordComponent={
							<Ionicons
								name='eye'
								size={24}
								color='rgba(0, 0, 0, 0.38)'
								style={{ marginRight: 5 }}
							/>
						}
						customHidePasswordComponent={
							<Ionicons
								name='eye-off'
								size={24}
								color='rgba(0, 0, 0, 0.38)'
								style={{ marginRight: 5 }}
							/>
						}
						staticLabel
						containerStyles={styles.textInput}
						inputStyles={{
							color: '#313130',
							paddingHorizontal: 10,
						}}
						onChangeText={(value) => setConfirmationPassword(value)}
						label={''}
					/>

					<Text style={styles.text}>Telefone</Text>
					<FloatingLabelInput
						leftComponent={
							<MaterialIcons
								name='phone'
								size={24}
								color='rgba(0, 0, 0, 0.6)'
								style={{ marginLeft: 10 }}
							/>
						}
						keyboardType='phone-pad'
						staticLabel
						label={''}
						value={phone}
						hintTextColor={'#aaa'}
						mask='(99) 99999-9999'
						hint='(  ) _____-____'
						containerStyles={styles.textInput}
						onChangeText={(value) => {
							setPhone(value)
						}}
					/>
				</View>

				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={() => handleRegisterNewUser()}
				>
					<Text style={styles.text}>CADASTRAR</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 12,
	},

	userInputs: {
		width: '100%',
	},

	text: {
		marginBottom: 5,
		fontWeight: '600',
		color: 'white',
	},

	textInput: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: 44,
		borderRadius: 4,
		//padding: 5,
		//textAlign: 'center',
	},
	button: {
		// position: 'absolute',
		width: '100%',
		height: '7%',
		//   left: 64,
		//   top: 450,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
	},
})
