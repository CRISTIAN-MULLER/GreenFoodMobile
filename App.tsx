import 'react-native-gesture-handler'
import React from 'react'
import { UIManager, Platform } from 'react-native'
import { LogBox } from 'react-native'

import { ApolloProvider } from '@apollo/client'
import AppContextProvider from '@contexts/AppContextProvider'
import Routes from './src/routes'

import apolloClient from './src/services/apollo'

require('intl') // import intl object
require('intl/locale-data/jsonp/pt-BR') // load the required locale details

LogBox.ignoreLogs(['ViewPropTypes will be removed'])

if (Platform.OS === 'android') {
	// only Android needs polyfill
	UIManager.setLayoutAnimationEnabledExperimental(true)
}

const App = () => (
	<ApolloProvider client={apolloClient}>
		<AppContextProvider>
			<Routes />
		</AppContextProvider>
	</ApolloProvider>
)

export default App
