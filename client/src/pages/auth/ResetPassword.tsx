/*=============================================== ResetPassword ===============================================*/

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Text,
    Form,
    Input,
    ComponentProps,
    Alert,
} from "tsx-library-julseb"
import { passwordRegex } from "../../utils"
import { useForm } from "../../hooks"

import authService from "../../api/auth.service"
import userService from "../../api/user.service"

import Page from "../../components/layouts/Page"
import NotFound from "../NotFound"

interface FormType extends ComponentProps.BaseUseFormType {
    formData: {
        email: string
        password: string
    }
}

const ResetPassword = () => {
    const navigate = useNavigate()
    const { token, id } = useParams()

    const [allIds, setAllIds] = useState<undefined | string[]>([])
    const [allTokens, setAllTokens] = useState<undefined | string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService.allUsers().then(res => {
            setAllIds(res.data.map((user: any) => user._id))
            setAllTokens(res.data.map((user: any) => user.resetToken))
            setIsLoading(false)
        })
    }, [])

    const { formData, handleInputs, handleSubmit } = useForm(
        {
            email: "",
            password: "",
            resetToken: token,
            id,
        },
        (formData: FormType) =>
            authService
                .resetPassword(formData)
                .then(() => navigate("/login"))
                .catch(err => setErrorMessage(err.response.data.message))
    ) as FormType

    const [validation, setValidation] =
        useState<ComponentProps.ValidationStatusProps>(undefined)

    useEffect(() => {
        if (formData.password.length > 0) {
            if (passwordRegex.test(formData.password)) {
                setValidation("passed")
            } else {
                setValidation("not-passed")
            }
        } else {
            setValidation(undefined)
        }
        // eslint-disable-next-line
    }, [])

    const [errorMessage, setErrorMessage] = useState(undefined)

    if (!isLoading) {
        if (
            (id !== undefined && !allIds?.includes(id)) ||
            (token !== undefined && !allTokens?.includes(token))
        ) {
            return <NotFound />
        }
    }

    return (
        <Page title="Reset your password" mainWidth="form" >
            <Text tag="h1">Reset your password</Text>

            <Form onSubmit={handleSubmit} buttonPrimary={{ text: "Send" }}>
                <Input
                    id="password"
                    password
                    label="New password"
                    helperBottom={{
                        text: validation
                            ? "Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                            : "",
                        icon: validation && "close-circle",
                        iconColor: "danger",
                    }}
                    value={formData.password}
                    onChange={handleInputs}
                    validation={{ status: validation }}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default ResetPassword
