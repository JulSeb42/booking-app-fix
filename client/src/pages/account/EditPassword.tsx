/*=============================================== EditPassword ===============================================*/

import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
    Text,
    Form,
    Input,
    ComponentProps,
    Alert,
} from "tsx-library-julseb"
import { passwordRegex } from "../../utils"

import { AuthContext, AuthContextType } from "../../context/auth"
import userService from "../../api/user.service"

import Page from "../../components/layouts/Page"

import { EditType } from "../../types"

const EditPassword = ({ edited, setEdited }: EditType) => {
    const { user, setUser, setToken } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [validation, setValidation] =
        useState<ComponentProps.ValidationStatusProps>(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

        setValidation(
            e.target.value.length > 0
                ? passwordRegex.test(password)
                    ? "passed"
                    : "not-passed"
                : undefined
        )
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        userService
            .editPassword(user._id, { password })
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title="Edit password" mainWidth="form" >
            <Text tag="h1">Edit your password</Text>

            <Form
                onSubmit={handleSubmit}
                buttonPrimary={{ text: "Save" }}
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
            >
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
                    validation={{ status: validation }}
                    value={password}
                    onChange={handlePassword}
                    autoFocus
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default EditPassword
