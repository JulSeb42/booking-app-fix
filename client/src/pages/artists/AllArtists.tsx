/*=============================================== AllArtists ===============================================*/

import React, { useState, useEffect, useContext } from "react"
import {
    Main,
    Aside,
    Grid,
    Text,
    Flexbox,
    InputCheck,
    Input,
    Button,
} from "tsx-library-julseb"
import { useSearchParams } from "react-router-dom"
import { uuid, getToday } from "../../utils"

import userService from "../../api/user.service"
import { GlobalContext, GlobalType } from "../../context/global"

import Page from "../../components/layouts/Page"
import ListArtists from "../../components/user/ListArtists"
import ArtistCard from "../../components/user/ArtistCard"
import Pagination from "../../components/ui/Pagination"

import { UserType } from "../../types"
import { dataLimit, pageLimit } from "../../config/pagination.config"
import { getMinPrice, getMaxPrice } from "../../components/utils/getMinMaxPrice"

const AllArtists = () => {
    const { cities, genres } = useContext(GlobalContext) as GlobalType

    const [q] = useSearchParams()
    const pageNumber = q.get("page") || 1
    const city = q.get("city") || undefined
    const genre = q.get("genre") || undefined

    const [artists, setArtists] = useState<UserType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [inputs, setInputs] = useState({
        sortPrice: false,
        sortAvailable: false,
        minPrice: 0,
        maxPrice: 0,
        city: city || "all",
        genre: genre || "all",
    })

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSortPrice = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            sortPrice: true,
            sortAvailable: false,
        })

    const handleSortAvailable = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            sortPrice: false,
            sortAvailable: true,
        })

    useEffect(() => {
        userService
            .allArtists()
            .then(res => {
                setArtists(res.data)
                setInputs({
                    ...inputs,
                    minPrice: getMinPrice(res.data),
                    maxPrice: getMaxPrice(res.data),
                })
                setIsLoading(false)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    let results = artists.filter(
        artist =>
            artist.price > inputs.minPrice && artist.price < inputs.maxPrice
    )

    if (inputs.city !== "all") {
        results = results.filter(artist => artist.city === inputs.city)
    }

    if (inputs.genre !== "all") {
        results = results.filter(artist => artist.genre === inputs.genre)
    }

    if (inputs.sortPrice) {
        results = results.sort((a, b) => {
            const priceA: number = a.price || 0
            const priceB: number = b.price || 0

            return priceA - priceB
        })
    }

    if (inputs.sortAvailable) {
        results = results.sort((a, b) => {
            const nextAvailableA = a.available.filter(
                date => new Date(date) >= new Date(getToday())
            )[0]
            const nextAvailableB = b.available.filter(
                date => new Date(date) >= new Date(getToday())
            )[0]

            return new Date(nextAvailableA) < new Date(nextAvailableB) ? -1 : 0
        })
    }

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results?.slice(startIndex, endIndex)
    }

    const length = results?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    return (
        <Page title="Artists" template="2cols" isLoading={isLoading}>
            <Aside position={1} justifyItems="start">
                <Grid gap="xs">
                    <Text tag="h5">Sort by</Text>

                    <Flexbox gap="xxs">
                        <InputCheck
                            id="sortPrice"
                            label="Price"
                            checkStyle="selector"
                            type="radio"
                            name="sort"
                            onChange={handleSortPrice}
                        />

                        <InputCheck
                            id="sortAvailable"
                            label="Availability"
                            checkStyle="selector"
                            type="radio"
                            name="sort"
                            onChange={handleSortAvailable}
                        />
                    </Flexbox>
                </Grid>

                <Grid gap="xs">
                    <Text tag="h5">Filters</Text>

                    <Grid gap="xxs" col={2}>
                        <Input
                            id="minPrice"
                            label="Min price"
                            type="number"
                            value={inputs.minPrice}
                            onChange={handleInputs}
                        />

                        <Input
                            id="maxPrice"
                            label="Max price"
                            type="number"
                            value={inputs.maxPrice}
                            onChange={handleInputs}
                        />
                    </Grid>

                    <Input
                        id="city"
                        label="City"
                        type="select"
                        value={inputs.city}
                        onChange={handleInputs}
                    >
                        <option value="all">All</option>

                        {cities.map(city => (
                            <option value={city} key={uuid()}>
                                {city}
                            </option>
                        ))}
                    </Input>

                    <Input
                        id="genre"
                        label="Genre"
                        type="select"
                        value={inputs.genre}
                        onChange={handleInputs}
                    >
                        <option value="all">All</option>

                        {genres.map(genre => (
                            <option value={genre} key={uuid()}>
                                {genre}
                            </option>
                        ))}
                    </Input>
                </Grid>

                <Button onClick={() => window.location.reload()}>
                    Reset filters
                </Button>
            </Aside>

            <Main position={2}>
                {getPaginatedData().length > 0 ? (
                    <>
                        <ListArtists>
                            {getPaginatedData().map(artist => (
                                <ArtistCard artist={artist} key={artist._id} />
                            ))}
                        </ListArtists>

                        {numberOfPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={numberOfPages}
                                pageLimit={pageLimit}
                            />
                        )}
                    </>
                ) : (
                    <Text>No result.</Text>
                )}
            </Main>
        </Page>
    )
}

export default AllArtists
