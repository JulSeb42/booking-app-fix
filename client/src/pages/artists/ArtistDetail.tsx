/*=============================================== ArtistDetail ===============================================*/

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Main, Aside, Text, Avatar } from "tsx-library-julseb"

import userService from "../../api/user.service"

import Page from "../../components/layouts/Page"
import NotFound from "../NotFound"

import { UserType } from "../../types"

const ArtistDetail = () => {
    const { id } = useParams()

    const [artist, setArtist] = useState<UserType>()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        userService
            .getUser(id || "")
            .then(res => {
                setArtist(res.data)
                setIsLoading(false)
            })
            .catch(() => setIsError(true))
    }, [id])

    if (isError) return <NotFound />

    return (
        <Page
            title={artist?.fullName || "Artist"}
            isLoading={isLoading}
            template="3cols"
        >
            <Aside position={1} size="small" justifyItems="center">
                <Avatar
                    size={120}
                    img={artist?.imageUrl || ""}
                    alt={`Avatar ${artist?.fullName}`}
                />
            </Aside>

            <Main position={2}>
                <Text tag="h1">{artist?.fullName}</Text>
            </Main>

            <Aside position={3} size="small"></Aside>
        </Page>
    )
}

export default ArtistDetail
