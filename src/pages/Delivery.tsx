import React, { useEffect } from 'react'
import {
	BackHandler,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Text,
	Pressable,
} from 'react-native'

import TopBar from '@components/TopBar'
import BottomBar from '@components/BottomBar'
import Button from '@components/Button'

import { NavigationProps } from '@typings/Navigation'
import DeliveryBoySVG from '@assets/DeliveryBoySVG'

const Delivery = ({ navigation }: NavigationProps) => {
	useEffect(() => {
		function handleBackButton() {
			navigation.navigate('Menu')
			return true
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			handleBackButton,
		)
		return () => backHandler.remove()
	}, [navigation])
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<TopBar navigation={navigation} />
				<View style={styles.svg}>
					<DeliveryBoySVG width='100%' height='100%' />
				</View>
				<Text
					style={{
						fontFamily: 'Roboto',
						fontSize: 20,
						textAlign: 'center',
						color: '#005723',
						marginBottom: 10,
						marginHorizontal: 20,
					}}
				>
					Compra Finalizada com sucesso, agora é só aguardar seu pedido.
				</Text>
				<Button
					buttonText='ACOMPANHAR PEDIDO'
					onPress={() => navigation.navigate('TrackOrder')}
				/>
				<Pressable onPress={() => navigation.navigate('Menu')}>
					<Text
						style={{
							fontFamily: 'Roboto',
							fontSize: 20,
							textAlign: 'center',
							color: '#FF8108',
							marginTop: 15,
							marginBottom: 20,
						}}
					>
						VOLTAR PARA LOJA
					</Text>
				</Pressable>
				<BottomBar navigation={navigation} />
			</View>
		</SafeAreaView>
	)
}

export default Delivery

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	svg: {
		flex: 1,
		alignItems: 'center',
	},
})
