import React, { createContext, useMemo, useState } from 'react'
import { UserAddressProps } from '@typings/Address'
import { OrderProps } from '@typings/Order'
import { UserPaymentMethodProps } from '@typings/PaymentMethod'

export interface OrderContextProps {
	order: OrderProps | undefined
	setOrder: (order: OrderProps) => void
	deliveryAddress: UserAddressProps | undefined
	setDeliveryAddress: (deliveryAddress: UserAddressProps) => void
	paymentMethod: UserPaymentMethodProps | undefined
	setPaymentMethod: (paymentMethod: UserPaymentMethodProps) => void
}

export const OrderContext = createContext({} as OrderContextProps)

const OrderProvider: React.FC = ({ children }) => {
	const [order, setOrder] = useState<OrderProps>()
	const [deliveryAddress, setDeliveryAddress] = useState<UserAddressProps>()
	const [paymentMethod, setPaymentMethod] = useState<UserPaymentMethodProps>()

	const orderContext = useMemo(
		() => ({
			order,
			setOrder,
			deliveryAddress,
			setDeliveryAddress,
			paymentMethod,
			setPaymentMethod,
		}),
		[order, deliveryAddress, paymentMethod],
	)

	return (
		<OrderContext.Provider value={orderContext}>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderProvider
