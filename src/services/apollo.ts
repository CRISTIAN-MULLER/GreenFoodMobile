import { ApolloClient, InMemoryCache } from '@apollo/client'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.100.3:4000/graphql',
  cache: new InMemoryCache(),
})

export default client