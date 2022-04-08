import React, { createContext, useState } from 'react'
import { UserAddressProps } from '../types/Address'
import { OrderProps } from '../types/Order'
import { UserPaymentMethodProps } from '../types/PaymentMethod'

export interface OrderContext {
	order: OrderProps | undefined
	setOrder: (order: OrderProps) => void
	deliveryAddress: UserAddressProps | undefined
	setDeliveryAddress: (deliveryAddress: UserAddressProps) => void
	paymentMethod: UserPaymentMethodProps | undefined
	setPaymentMethod: (paymentMethod: UserPaymentMethodProps) => void
}

export const OrderContext = createContext({} as OrderContext)

const OrderProvider: React.FC = ({ children }) => {
	const [order, setOrder] = useState<OrderProps>()
	const [deliveryAddress, setDeliveryAddress] = useState<UserAddressProps>()
	const [paymentMethod, setPaymentMethod] = useState<UserPaymentMethodProps>()

	return (
		<OrderContext.Provider
			value={{
				order,
				setOrder,
				deliveryAddress,
				setDeliveryAddress,
				paymentMethod,
				setPaymentMethod,
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderProvider
