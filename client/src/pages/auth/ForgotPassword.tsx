/*=============================================== ForgotPassword ===============================================*/

import React, { useState } from "react"
import { Text, Form, Input, Alert, ComponentProps } from "tsx-library-julseb"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks"

import authService from "../../api/auth.service"

import Page from "../../components/layouts/Page"

interface FormType extends ComponentProps.BaseUseFormType {
    formData: {
        email: string
    }
}

const ForgotPassword = () => {
    const navigate = useNavigate()

    const { formData, handleInputs, handleSubmit } = useForm(
        {
            email: "",
        },
        (formData: FormType) =>
            authService
                .forgotPassword(formData)
                .then(() => navigate("/login/forgot-password/email-sent"))
                .catch(err => setErrorMessage(err.response.data.message))
    ) as FormType

    const [errorMessage, setErrorMessage] = useState(undefined)

    return (
        <Page title="I forgot my password" mainWidth="form" >
            <Text tag="h1">I forgot my password</Text>

            <Text>
                Please enter your email address, we will send you a link to
                reset your password.
            </Text>

            <Form
                onSubmit={handleSubmit}
                buttonPrimary={{ text: "Send" }}
                buttonSecondary={{ text: "Cancel", to: "/login" }}
            >
                <Input
                    id="email"
                    onChange={handleInputs}
                    value={formData.email}
                    label="Email"
                    autoFocus
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default ForgotPassword
