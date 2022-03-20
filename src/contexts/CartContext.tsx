import React, { createContext, useState } from 'react'
import { CartItemsProps } from '../types/Cart'
import { CartProductProps } from '../types/Product'

export interface CartContext {
	cart: CartItemsProps
	setCart: (cart: CartItemsProps) => void
	cartItem: CartProductProps
	setCartItem: (item: CartProductProps) => void
	handleAddItemToCart: (item: CartProductProps) => void
	handleRemoveItemFromCart: (item: CartProductProps) => void
	formatCurrency: (currency: number) => string
}

export const CartContext = createContext({} as CartContext)

const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<CartItemsProps>({
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
			itemsTotalQty: cartItems.reduce(function (previousValue, currentValue) {
				return previousValue + currentValue.itemTotalQty
			}, 0),
			itemsTotalPrice: cartItems.reduce(function (previousValue, currentValue) {
				return parseFloat(
					(previousValue + currentValue.itemTotalPrice).toFixed(2),
				)
			}, 0),
		}
		setCart(newCart)
	}

	function handleAddItemToCart(newItem: CartProductProps) {
		// UPDATE_NFE_STATUS(state, payload) {
		// 	state.list.map((shipping) => {
		// 		const shippings = shipping.orders.filter((order) => {
		// 			if (order.nfe && order.nfe.nfe_erp_id === payload.nfe_erp_id) {
		// 				order.nfe = payload;
		// 			}
		// 		});
		// 	});
		// },

		const cartItems = cart.items

		if (!cartItems.length) {
			cartItems.push(newItem)
			updateCart(cartItems)
			return
		}

		const hasItem = cartItems.filter((item) => {
			if (item._id === newItem._id) {
				;(item.itemTotalQty = newItem.itemTotalQty),
					(item.itemTotalPrice = newItem.itemTotalPrice),
					(item.saleUnit = newItem.saleUnit)
				return item
			}
		})

		if (!hasItem.length) {
			cartItems.push(newItem)
			updateCart(cartItems)
			return
		}
		updateCart(cartItems)
		// if (hasItem) {
		// 	Alert.alert(
		// 		'Item no Carrinho',
		// 		'Este item Já existe no carrinho, gostaria de substituir ou adicionar.',
		// 		[
		// 			{
		// 				text: 'Cancel',
		// 				style: 'cancel',
		// 			},
		// 			{
		// 				text: 'Adicionar',
		// 				onPress: () => {
		// 					newCart.items.push(newItem),
		// 						(newCart.itemsTotalQty =
		// 							cart.itemsTotalQty + newItem.itemTotalQty),
		// 						(newCart.itemsTotalPrice =
		// 							cart.itemsTotalPrice + newItem.itemTotalPrice)
		// 				},
		// 			},
		// 			{ text: 'Substituir', onPress: () => {

		// 			}
		// 		},
		// 		],
		// 		{
		// 			cancelable: true,
		// 		},
		// 	)
		// 	// 	hasItem.itemTotalQty = hasItem.itemTotalQty + newItem.itemTotalQty
		// 	//console.log('hasItem')
		// }
		//console.log(hasItem)
	}
	function handleRemoveItemFromCart(itemToRemove: CartProductProps) {
		const newCartItems = cart.items.filter(
			(item) => item._id !== itemToRemove._id,
		)
		updateCart(newCartItems)
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				cartItem,
				setCartItem,
				handleAddItemToCart,
				handleRemoveItemFromCart,
				formatCurrency,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider
