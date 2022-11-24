/*=============================================== Verify ===============================================*/

import React, { useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Text, PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../../context/auth"
import authService from "../../api/auth.service"

import Page from "../../components/layouts/Page"

import { EditType } from "../../types"

const Verify = ({ edited, setEdited }: EditType) => {
    const { user, setUser, isLoggedIn, setToken } = useContext(
        AuthContext
    ) as AuthContextType

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [verified, setVerified] = useState<boolean>(false)

    const { token, id } = useParams()

    setTimeout(() => {
        if (isLoggedIn && user._id === id && user.verifyToken === token) {
            authService
                .verify({ id: id })
                .then(res => {
                    setUser(res.data.user)
                    setToken(res.data.authToken)
                    setVerified(true)
                    setEdited(!edited)
                })
                .catch(err => console.log(err))
        }

        setIsLoading(false)
    }, 1000)

    return (
        <Page title="Verify your account" isLoading={isLoading}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    {!isLoggedIn ? (
                        <>
                            <Text tag="h1">You are not logged in!</Text>

                            <Text>Please log in to verify your account.</Text>
                        </>
                    ) : verified ? (
                        <>
                            <Text tag="h1">Your account is verifed!</Text>

                            <Text>
                                You can now access all the functionalities on
                                our website.{" "}
                                <Link to="/my-account">Go to your account</Link>
                                .
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text tag="h1">Verification failed</Text>

                            <Text>
                                Your account could not be verified, please try
                                again later.
                            </Text>
                        </>
                    )}
                </>
            )}
        </Page>
    )
}

export default Verify
