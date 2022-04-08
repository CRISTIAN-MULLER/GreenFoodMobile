import React, { useContext, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import * as AuthSession from 'expo-auth-session'

// import CookieManager from 'react-native-cookies'
// import AsyncStorage from '@react-native-community/async-storage';

import { FloatingLabelInput } from 'react-native-floating-label-input'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'

import LogoSVG from '../../assets/LogoSVG'
import Gradient from '../components/Gradient'

import { useMutation } from '@apollo/client'

import { LOGIN } from '../gql/User.gql'

import { NavigationProps } from '../types/Navigation'
import { GoogleAuthResponse } from '../types/AuthResponse'
import { ProfileContext } from '../contexts/ProfileContext'
import { UserProfileProps } from '../types/Profile'

export function Login({ navigation }: NavigationProps) {
	const { userProfile, setUserProfile } = useContext(ProfileContext)

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [password, setPassword] = useState('admin')
	const [email, setEmail] = useState<string>('muller.cristian@outlook.com')
	const [show, setShow] = useState(false)

	const [loginUser] = useMutation(LOGIN)

	const handleSignIn = async (source: string) => {
		if (source === 'google') {
			const EXPO_GOOGLE_CLIENT_ID =
				'174198411470-5ni1ito2uvhmkp7shqlmh5ooiiepjt25.apps.googleusercontent.com'
			const EXPO_GOOGLE_REDIRECT_URI =
				'https://auth.expo.io/@cristian.muller/greenfoodmobile'
			const EXPO_GOOGLE_RESPONSE_TYPE = 'token'
			const EXPO_GOOGLE_SCOPE = encodeURI('profile email')
			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${EXPO_GOOGLE_CLIENT_ID}&redirect_uri=${EXPO_GOOGLE_REDIRECT_URI}&response_type=${EXPO_GOOGLE_RESPONSE_TYPE}&scope=${EXPO_GOOGLE_SCOPE}`

			const { type, params } = (await AuthSession.startAsync({
				authUrl,
			})) as GoogleAuthResponse

			if (type === 'success') {
				const response = await fetch(
					`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`,
				)
				const { email, family_name, given_name, id, name, picture } =
					await response.json()

				//setUserProfile!(userProfileReturn)
				const user: UserProfileProps = {
					firstName: given_name,
					lastName: family_name,
					email: email,
					profile_picture: picture,
					foreignId: {
						id: id,
						provider: 'google',
					},
				}
				setUserProfile!(user)
				navigation.navigate('Menu')
			}
		}

		if (source === 'login') {
			try {
				const {
					data: { login },
				} = await loginUser({
					variables: {
						data: {
							email: email,
							password: password,
						},
					},
				})
				setUserProfile!(login)
				navigation.navigate('Menu')
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.wrapper}>
					<Gradient />

					<View style={{ marginBottom: 20 }}>
						<LogoSVG width='170' height='150' />
					</View>
					<View style={styles.login}>
						<Text style={styles.textLogin}>LOGIN</Text>
						<FloatingLabelInput
							label='E-mail'
							value={email}
							staticLabel
							containerStyles={{
								margin: 5,
								height: 50,
								borderStyle: 'solid',
								borderWidth: 1,
								borderColor: 'rgba(0, 0, 0, 0.12)',
								borderRadius: 4,
								alignItems: 'center',
							}}
							labelStyles={{
								backgroundColor: '#FFF8EC',
								padding: 2,
							}}
							customLabelStyles={{
								fontSizeFocused: 16,
							}}
							inputStyles={{
								color: '#313130',
								paddingHorizontal: 10,
							}}
							onChangeText={(value) => {
								setEmail(value)
							}}
						/>

						<FloatingLabelInput
							label='Senha'
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
							containerStyles={{
								margin: 5,
								height: 50,
								borderStyle: 'solid',
								borderWidth: 1,
								borderColor: 'rgba(0, 0, 0, 0.12)',
								borderRadius: 4,
								alignItems: 'center',
							}}
							labelStyles={{
								color: 'red',
								backgroundColor: '#FFF8EC',
								padding: 2,
							}}
							customLabelStyles={{
								fontSizeFocused: 16,
							}}
							inputStyles={{
								color: '#313130',
								paddingHorizontal: 10,
							}}
							onChangeText={(value) => {
								setPassword(value)
							}}
						/>
					</View>
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={() => handleSignIn('login')}
					>
						<Text style={styles.text}>ENTRAR</Text>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '70%',
						}}
					>
						<Text style={styles.white}>Esqueceu a Senha?</Text>
						<Pressable onPress={() => navigation.navigate('User')}>
							<Text style={styles.underscore}>Lembrar</Text>
						</Pressable>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '70%',
						}}
					>
						<Text style={styles.white}>Ainda não tem cadastro?</Text>
						<Pressable onPress={() => navigation.navigate('User')}>
							<Text style={styles.underscore}>Faça Agora</Text>
						</Pressable>
					</View>
					<View
						style={{
							width: '70%',
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10,
						}}
					>
						<View
							style={{ flex: 1, height: 1, backgroundColor: '#F9E0B366' }}
						/>
						<View>
							<Text
								style={{ width: 40, textAlign: 'center', color: '#FFFFFF' }}
							>
								Ou
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								height: 1,
								backgroundColor: '#F9E0B366',
							}}
						/>
					</View>

					<Text style={styles.white}>Entre com</Text>
					<View
						style={{
							width: '30%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							// marginBottom: '15%',
						}}
					>
						<AntDesign
							name='google'
							size={36}
							color='#FFFFFF'
							onPress={() => handleSignIn('google')}
						/>
						<Entypo name='facebook-with-circle' size={36} color='#FFFFFF' />
					</View>
				</View>
			</KeyboardAvoidingView>
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
	},
	logoView: {
		width: '70%',
	},
	login: {
		backgroundColor: '#FFF8EC',
		padding: 10,
		width: '70%',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,

		//  height: '40%',
	},
	textLogin: {
		fontSize: 15,
		fontWeight: '700',
		color: '#247D27',
		marginLeft: 10,
		marginTop: 10,
		marginBottom: 10,
	},

	white: {
		color: '#FFFFFF',
		marginBottom: 10,
	},
	underscore: {
		color: '#FF8108',
		textDecorationLine: 'underline',
		marginLeft: 5,
	},

	input: {
		borderWidth: 2,
		borderColor: '#FF8108',
		//color: colors.heading,
		width: '100%',
		fontSize: 18,
		marginTop: 50,
		padding: 10,
		textAlign: 'center',
	},
	button: {
		// position: 'absolute',
		width: '70%',
		height: '7%',
		//   left: 64,
		//   top: 450,
		backgroundColor: '#FF8108',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		marginBottom: 10,
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#fff',
	},
})
