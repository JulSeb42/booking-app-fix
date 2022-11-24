/*=============================================== Signup ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, ComponentProps, Alert } from "tsx-library-julseb"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { passwordRegex, getRandomAvatar } from "../../utils"

import { AuthContext, AuthContextType } from "../../context/auth"
import authService from "../../api/auth.service"

import Page from "../../components/layouts/Page"

const Signup = () => {
    const { loginUser } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const [validationPassword, setValidationPassword] =
        useState<ComponentProps.ValidationStatusProps>(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (e.target.id === "password" && e.target.value.length > 0) {
            if (passwordRegex.test(e.target.value)) {
                setValidationPassword("passed")
            } else {
                setValidationPassword("not-passed")
            }
        } else {
            setValidationPassword(undefined)
        }
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const requestBody = {
            ...inputs,
            imageUrl: getRandomAvatar(),
        }

        await authService
            .signup(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/thank-you")
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
            })
    }

    return (
        <Page title="Signup" mainWidth="form">
            <Text tag="h1">Create an account</Text>

            <Form
                onSubmit={handleSubmit}
                buttonPrimary={{
                    text: "Create your account",
                }}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    autoFocus
                />

                <Input
                    id="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                />

                <Input
                    id="password"
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                    password
                    validation={{
                        status: validationPassword,
                    }}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Text>
                You already have an account? <Link to="/login">Log in</Link>.
            </Text>
        </Page>
    )
}

export default Signup

type ErrorMessageType = string | undefined
