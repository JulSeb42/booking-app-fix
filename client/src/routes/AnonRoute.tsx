/*=============================================== AnonRoute ===============================================*/

import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../context/auth"

interface Props {
    children: any
    redirectTo?: string
}

const AnonRoute = ({ children, redirectTo = "/my-account" }: Props) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

export default AnonRoute
