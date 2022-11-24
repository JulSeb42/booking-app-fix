/*=============================================== PublicProfile ===============================================*/

import React from "react"
import { Text, PageLoading, Avatar, Flexbox } from "tsx-library-julseb"
import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks"

import userService from "../../api/user.service"

import Page from "../../components/layouts/Page"

import { UserType } from "../../types"

const PublicProfile = () => {
    const { id } = useParams()

    const { response, error, isLoading } = useFetch<UserType | null>(
        userService.getUser(id || "")
    )

    return isLoading ? (
        <PageLoading />
    ) : response && (
        <Page title={response?.fullName}>
            {error ? (
                <Text>{error}</Text>
            ) : (
                <>
                    <Flexbox alignItems="center" gap="xs">
                        <Avatar
                            img={response?.imageUrl}
                            alt={response?.fullName}
                        />
                        <Text tag="h1">{response?.fullName}</Text>
                    </Flexbox>
                </>
            )}
        </Page>
    )
}

export default PublicProfile
