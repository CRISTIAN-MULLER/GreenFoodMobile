import { UserAddressProps } from './Address'
import { CardProps } from './PaymentMethod'

export type UserProfileProps = {
	_id?: string
	foreignId?: {
		id: string
		provider: string
	}
	firstName: string
	lastName: string
	fullName?: string
	email: string
	password?: string
	phone?: string
	profilePicture?: string
	role?: string
	addresses?: UserAddressProps[]
	paymentMethods?: CardProps[]
	favoriteProducts?: string[]
}
