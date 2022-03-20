import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
	query GetAllProducts {
  getAllProducts {
    name
    _id
    description
    image
    saleUnits {
      _id
      saleUnit
      description
      price
      active
      isDefault
    }
    category
    active
  }
}
`

export { GET_ALL_PRODUCTS }