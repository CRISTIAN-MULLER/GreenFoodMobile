import { Dispatch, SetStateAction } from 'react'
import { UserAddressProps } from './Address'
import { UserPaymentMethodProps } from './PaymentMethod'

type RootStackParamList = {
	Address: {
		address: UserAddressProps
		action: string
		refresh?: boolean
		setRefresh?: Dispatch<SetStateAction<boolean>>
	}
	AddressSelection: undefined
	Cart: undefined
	CreditCard: {
		paymentMethod: UserPaymentMethodProps
		action: string
		refresh?: boolean
		setRefresh?: Dispatch<SetStateAction<boolean>>
	}
	Delivery: undefined
	Login: undefined
	Menu: undefined
	Order: undefined
	PaymentSelection: undefined
	TrackOrder: undefined
	User: undefined
	Welcome: undefined
}

export default RootStackParamList
