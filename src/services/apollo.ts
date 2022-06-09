import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// const uri = 'http://192.168.100.3:4000/graphql'
const uri = 'https://green-foodie-api.herokuapp.com/graphql'

const httpLink = new HttpLink({
	uri,
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
	uri,
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache({
		addTypename: false,
	}),
})
export default client
