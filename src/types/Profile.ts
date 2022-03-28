import { UserAddressProps } from './Address'

export type UserProfileProps = {
  _id?: string,
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
  profile_picture?: string
  role?: string
  addresses?: UserAddressProps[]
}

