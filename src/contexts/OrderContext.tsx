import React, { createContext, useState } from 'react'
import { OrderProps } from '../types/Order'
import { UserAddressProps, UserProfileProps } from '../types/Profile'

export interface OrderContext {
	order: OrderProps | undefined
	setOrder: (order: OrderProps) => void
	deliveryAddress: UserAddressProps | undefined
	setDeliveryAddress: (deliveryAddress: UserAddressProps) => void
}

export const OrderContext = createContext({} as OrderContext)

const OrderProvider: React.FC = ({ children }) => {
	const [order, setOrder] = useState<OrderProps>()
	const [deliveryAddress, setDeliveryAddress] = useState<UserAddressProps>()

	return (
		<OrderContext.Provider
			value={{
				order,
				setOrder,
				deliveryAddress,
				setDeliveryAddress,
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderProvider
