import React from 'react'
import { Platform } from 'react-native'

import AuthContext from './src/contexts/AuthContext'
import ProfileProvider from './src/contexts/ProfileContext'
import CartProvider from './src/contexts/CartContext'
import ProductProvider from './src/contexts/ProductContext'
import OrderProvider from './src/contexts/OrderContext'

import Routes from './src/routes'

import { ApolloProvider } from '@apollo/client'
import apolloClient from './src/services/apollo'

if (Platform.OS === 'android') {
	// only Android needs polyfill
	require('intl') // import intl object
	require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}

export default function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<AuthContext.Provider value={{ isAuthenticated: false }}>
				<ProfileProvider>
					<OrderProvider>
						<CartProvider>
							<ProductProvider>
								<Routes />
							</ProductProvider>
						</CartProvider>
					</OrderProvider>
				</ProfileProvider>
			</AuthContext.Provider>
		</ApolloProvider>
	)
}
