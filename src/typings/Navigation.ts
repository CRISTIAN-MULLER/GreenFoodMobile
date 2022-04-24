import { StackNavigationProp } from '@react-navigation/stack'
import RootStackParamList from './RootStackParamList'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>

export type NavigationProps = {
	navigation: LoginScreenNavigationProp
}
