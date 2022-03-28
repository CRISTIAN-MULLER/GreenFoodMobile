import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`

    query GetAllProducts($data: PaginationInput!) {
  getAllProducts(data: $data) {    
    
    products {
      _id
      name
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
    next
  }
}
`

export { GET_ALL_PRODUCTS }