import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({
	uri: 'http://192.168.100.3:4000/graphql',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		)

	if (networkError) console.log(`[Network error]: ${networkError}`)
})

// Initialize Apollo Client
const client = new ApolloClient({
	uri: 'http://192.168.100.3:4000/graphql',
	// uri: 'https://green-foodier-api.herokuapp.com/graphql',
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache({
		addTypename: false,
	}),
})
export default client
