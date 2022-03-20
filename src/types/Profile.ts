export type UserProfileProps = {
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
  address?: {
    zipcode: string
    street: string
    houseNumber: string
    district: string
    city: string
    state: string
    reference: string
  }
}

