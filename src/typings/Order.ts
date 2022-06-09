import { RectButtonProps } from 'react-native-gesture-handler'
import { UserPaymentMethodProps } from './PaymentMethod'

export type OrderProps = {
	_id?: string
	createdAt?: Date
	updatedAt?: Date
	orderNumber?: number
	customerId: string
	deliveryAddress: {
		name: string
		zipcode: string
		street: string
		houseNumber: string
		district: string
		city: string
		state: string
		reference: string
		location: {
			type: string
			coordinates: {
				latitude: number
				longitude: number
				latitudeDelta: number
				longitudeDelta: number
			}
		}
	}
	items: [
		{
			productId: string
			name: string
			image: string
			saleUnit: {
				saleUnit: string
				description: string
				price: number
				active: boolean
			}
			itemTotalQty: number
			itemTotalPrice: number
		},
	]
	phone: string
	payment: {
		paymentMethod: UserPaymentMethodProps
		paymentStatus: string
	}
	origin: string
	status: string
	step: number
	observation: string
}

export interface OrderHandleProps extends RectButtonProps {
	data: OrderProps
}
