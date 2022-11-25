/*=============================================== Global context ===============================================*/

import React, { createContext, useState, useEffect } from "react"

import userService from "../api/user.service"

import { UserType } from "../types"

export type GlobalType = {
    genres: string[]
    cities: string[]
    isLoading: boolean
}

export const GlobalContext = createContext<GlobalType | null>(null)

interface Props {
    children?: any
}

export const GlobalProviderWrapper = ({ children }: Props) => {
    const [genres, setGenres] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService.allArtists().then(res => {
            setCities([
                // @ts-expect-error
                ...new Set(
                    res.data.map((artist: UserType) => artist.city).sort()
                ),
            ])
            setGenres([
                // @ts-expect-error
                ...new Set(
                    res.data.map((artist: UserType) => artist.genre).sort()
                ),
            ])
            setIsLoading(false)
        })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                genres,
                cities,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
