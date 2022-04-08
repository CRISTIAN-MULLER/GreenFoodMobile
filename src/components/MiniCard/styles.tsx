import styled from 'styled-components/native'

export const Container = styled.View`
	width: 90%;
`

export const Content = styled.View`
	height: 100%;
	background-color: #ff8108;
	border-radius: 8px;
`

export const TextCVV = styled.Text``

export const View = styled.View``

export const Text = styled.Text<propsText>`
	width: auto;
	color: #fafafa;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
	font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

interface propsText {
	fontSize: string
	bold?: boolean
}

export const ViewInformation = styled.View`
	padding: 4px;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
`
