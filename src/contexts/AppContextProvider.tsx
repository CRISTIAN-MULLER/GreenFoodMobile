import ProfileProvider from './ProfileContext'
import CartProvider from './CartContext'
import ProductProvider from './ProductContext'
import OrderProvider from './OrderContext'

import { combineComponents } from './CombineContexts'
const providers = [
	ProfileProvider,
	CartProvider,
	ProductProvider,
	OrderProvider,
]
export const AppContextProvider = combineComponents(...providers)
