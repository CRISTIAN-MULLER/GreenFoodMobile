import { ApolloClient, InMemoryCache } from '@apollo/client'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.100.3:4000/graphql',
  //uri: 'https://green-foodie-api.herokuapp.com/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
})

export default client