/*=============================================== AllUsers ===============================================*/

import React from "react"
import { Text, PageLoading, Grid } from "tsx-library-julseb"
import { uuid } from "../../utils"
import { useMaxWidth, useFetch } from "../../hooks"

import userService from "../../api/user.service"

import Page from "../../components/layouts/Page"
import UserCard from "../../components/UserCard"

import { UserType } from "../../types"

const AllUsers = () => {
    const { response, error, isLoading } = useFetch<UserType[] | null>(
        userService.allUsers()
    )
    const users = response

    const isMobile = useMaxWidth(600)
    const isTablet = useMaxWidth(768)

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="All users">
            <Text tag="h1">All users</Text>

            {error ? (
                <Text>{error}</Text>
            ) : users?.length === 0 ? (
                <Text>No user yet.</Text>
            ) : (
                <Grid col={isMobile || isTablet ? 12 : 6} gap="s">
                    {users?.map(user => (
                        <UserCard user={user} key={uuid()} />
                    ))}
                </Grid>
            )}
        </Page>
    )
}

export default AllUsers
