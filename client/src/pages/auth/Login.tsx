/*=============================================== Login ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, Alert, ComponentProps } from "tsx-library-julseb"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "../../hooks"

import { AuthContext, AuthContextType } from "../../context/auth"
import authService from "../../api/auth.service"

import Page from "../../components/layouts/Page"

interface FormType extends ComponentProps.BaseUseFormType {
    formData: {
        email: string
        password: string
    }
}

const Login = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const { formData, handleInputs, handleSubmit } = useForm(
        {
            email: "",
            password: "",
        },
        (formData: FormType) => {
            authService
                .login(formData)
                .then(res => {
                    loginUser(res.data.authToken)
                    navigate(-1)
                })
                .catch(err => setErrorMessage(err.response.data.message))
        }
    ) as FormType

    const [errorMessage, setErrorMessage] = useState(undefined)

    return (
        <Page title="Log in" mainWidth="form" >
            <Text tag="h1">Log in</Text>

            <Form onSubmit={handleSubmit} buttonPrimary={{ text: "Log in" }}>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputs}
                    label="Email"
                    autoFocus
                />

                <Input
                    id="password"
                    password
                    value={formData.password}
                    onChange={handleInputs}
                    label="Password"
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Text>
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Text>

            <Text>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </Text>
        </Page>
    )
}

export default Login
