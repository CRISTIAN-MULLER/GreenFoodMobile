import { gql } from '@apollo/client'

const HELLO = gql`
	query Query {
		hello
	}
`

const LOGIN = gql`  
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      firstName
      lastName
      fullName
      email
    }
  }
`

const FOREIGN_LOGIN = gql`  
  mutation ForeignLogin($data: ForeignLoginInput!) {
  foreignLogin(data: $data) {
    firstName
    lastName
    foreignIds {
      id
      provider
    }
  }
}
`

export { LOGIN, HELLO }