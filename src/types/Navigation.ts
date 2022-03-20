import { RootStackParamList } from '../types/RootStackParamList'
import { StackNavigationProp } from '@react-navigation/stack'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>

export type NavigationProps = {
  navigation: LoginScreenNavigationProp
}
