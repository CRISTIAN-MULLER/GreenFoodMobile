import React from 'react'
import { UIManager, Platform } from 'react-native'

import Routes from './src/routes'

import apolloClient from './src/services/apollo'
import { ApolloProvider } from '@apollo/client'
import { AppContextProvider } from './src/contexts/AppContextProvider'

if (Platform.OS === 'android') {
	// only Android needs polyfill
	require('intl') // import intl object
	require('intl/locale-data/jsonp/pt-BR') // load the required locale details
	UIManager.setLayoutAnimationEnabledExperimental &&
		UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<AppContextProvider>
				<Routes />
			</AppContextProvider>
		</ApolloProvider>
	)
}
