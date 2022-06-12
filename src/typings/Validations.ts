import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
	password: Yup.string().required('Campo obrigatório'),
	userEmail: Yup.string()
		.email('E-mail invalido')
		.required('Campo obrigatório'),
})

export { SignupSchema }
