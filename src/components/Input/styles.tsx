import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'

interface propsContainer {
	width: any
}

export const Container = styled.View<propsContainer>`
	width: ${({ width }) => width || '100%'};
	height: 50px;
	padding: 8px;
	margin-top: 15px;
	background-color: #bdbdbd50;
	border-radius: 8px;
	flex-direction: row;
	align-items: center;
`

export const TextInput = styled.TextInput`
	width: 100%;
	margin-left: 4px;
	font-weight: bold;
`

export const MaskTextInput = styled(TextInputMask)`
	width: 100%;
	margin-left: 4px;
	font-weight: bold;
`
