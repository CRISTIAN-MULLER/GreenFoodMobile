import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from 'react'
import { CartProps } from '@typings/Cart'
import { CartProductProps } from '@typings/Product'

export interface CartContextProps {
	cart: CartProps
	setCart: Dispatch<SetStateAction<CartProps>>
	cartItem: CartProductProps
	setCartItem: Dispatch<SetStateAction<CartProductProps>>
	handleAddItemToCart: (newItem: CartProductProps) => void
	handleRemoveItemFromCart: (itemToRemove: CartProductProps) => void
	formatCurrency: (value: number) => string
}

export const CartContext = createContext({} as CartContextProps)

const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<CartProps>({
		items: [],
		itemsTotalQty: 0,
		itemsTotalPrice: 0,
	})

	const [cartItem, setCartItem] = useState<CartProductProps>({
		_id: '',
		name: '',
		image: '',
		saleUnit: {
			_id: '',
			saleUnit: '',
			price: 0,
			description: '',
			active: false,
			isDefault: false,
		},
		itemTotalQty: 0,
		itemTotalPrice: 0,
	})

	const formatCurrency = (value: number) => {
		const formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
		})
		return formatter.format(value).replace(/^(\D+)/, 'R$ ')
	}

	async function updateCart(cartItems: CartProductProps[]) {
		const newCart = {
			items: cartItems,
			itemsTotalQty: cartItems.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.itemTotalQty,
				0,
			),
			itemsTotalPrice: cartItems.reduce(
				(previousValue, currentValue) =>
					parseFloat((previousValue + currentValue.itemTotalPrice).toFixed(2)),
				0,
			),
		}
		setCart(newCart)
	}

	function handleAddItemToCart(newItem: CartProductProps) {
		const cartItems = cart.items

		if (!cartItems.length) {
			cartItems.push(newItem)
			updateCart(cartItems)
			return
		}

		const hasItem = cartItems.filter((item) => {
			if (item._id === newItem._id) {
				item.itemTotalQty = newItem.itemTotalQty
				item.itemTotalPrice = newItem.itemTotalPrice
				item.saleUnit = newItem.saleUnit
				return item
			}
			return false
		})

		if (!hasItem.length) {
			cartItems.push(newItem)
			updateCart(cartItems)
			return
		}
		updateCart(cartItems)
	}

	function handleRemoveItemFromCart(itemToRemove: CartProductProps) {
		const newCartItems = cart.items.filter(
			(item) => item._id !== itemToRemove._id,
		)
		updateCart(newCartItems)
	}

	const cartContext = useMemo(
		() => ({
			cart,
			setCart,
			cartItem,
			setCartItem,
			handleAddItemToCart,
			handleRemoveItemFromCart,
			formatCurrency,
		}),
		[cart, cartItem],
	)

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	)
}

export default CartProvider
