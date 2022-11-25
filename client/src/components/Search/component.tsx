/*=============================================== Search component ===============================================*/

import React, { useContext, useState } from "react"
import { Input, Flexbox } from "tsx-library-julseb"
import { uuid } from "../../utils"
import { useNavigate, createSearchParams } from "react-router-dom"

import { GlobalContext, GlobalType } from "../../context/global"

import * as Styles from "./styles"
import { SearchProps } from "./types"

const Search = ({ close }: SearchProps) => {
    const navigate = useNavigate()

    const { cities, genres } = useContext(GlobalContext) as GlobalType

    const [inputs, setInputs] = useState({
        city: "all",
        genre: "all",
    })

    const handleInputs = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleClose = () => {
        setInputs({
            city: "all",
            genre: "all",
        })

        if (close) {
            close()
        }
    }

    const submitButton = () => (
        <Styles.StyledButton $isModal={close && true} type="submit">
            Search
        </Styles.StyledButton>
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        inputs.city === "all" && inputs.genre === "all"
            ? navigate("/artists")
            : inputs.city === "all" && inputs.genre !== "all"
            ? navigate({
                  pathname: "/artists",
                  search: createSearchParams({
                      genre: inputs.genre,
                      page: "1",
                  }).toString(),
              })
            : inputs.city !== "all" && inputs.genre === "all"
            ? navigate({
                  pathname: "/artists",
                  search: createSearchParams({
                      city: inputs.city,
                      page: "1",
                  }).toString(),
              })
            : navigate({
                  pathname: "/artists",
                  search: createSearchParams({
                      city: inputs.city,
                      genre: inputs.genre,
                      page: "1",
                  }).toString(),
              })
        window.location.reload()
    }

    return (
        <Styles.StyledSearch $isModal={close && true} onSubmit={handleSubmit}>
            <Input
                id="city"
                label="City"
                type="select"
                value={inputs.city}
                onChange={handleInputs}
            >
                <option value="all">All</option>
                {cities?.map(city => (
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
                {genres?.map(genre => (
                    <option value={genre} key={uuid()}>
                        {genre}
                    </option>
                ))}
            </Input>

            {close ? (
                <Flexbox gap="xs">
                    {submitButton()}

                    <Styles.StyledButton
                        variant="text"
                        $isModal
                        onClick={handleClose}
                    >
                        Cancel
                    </Styles.StyledButton>
                </Flexbox>
            ) : (
                submitButton()
            )}
        </Styles.StyledSearch>
    )
}

export default Search
