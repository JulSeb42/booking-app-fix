/*=============================================== ArtistCard component ===============================================*/

import React from "react"
import {
    Avatar,
    Flexbox,
    TextIcon,
    Text,
    Grid,
    Button,
} from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { convertPrice, getToday, convertDateShort } from "../../../utils"

import * as Styles from "./styles"
import { ArtistCardProps } from "./types"

const ArtistCard = ({
    artist: { imageUrl, fullName, _id, city, genre, price, available },
}: ArtistCardProps) => {
    const url = `/artists/${_id}`

    const availabilities = available
        .filter(date => new Date(date) >= new Date(getToday()))
        .sort((a: string, b: string) => (new Date(a) < new Date(b) ? -1 : 0))

    return (
        <Styles.StyledArtistCard>
            <Link to={url}>
                <Avatar size={80} img={imageUrl} alt={`Avatar ${fullName}`} />
            </Link>

            <Styles.Content>
                <Flexbox
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="xs"
                >
                    <Text tag="h4">
                        <Link to={url}>{fullName}</Link>
                    </Text>

                    <TextIcon icon="map">{city}</TextIcon>
                </Flexbox>

                <Flexbox
                    alignItems="flex-end"
                    justifyContent="space-between"
                    gap="xs"
                >
                    <Grid gap="xxs">
                        <Text>
                            <Text tag="strong">Genre:</Text> {genre}
                        </Text>

                        <Text>
                            <Text tag="strong">Next availability:</Text>{" "}
                            {availabilities.length > 0
                                ? convertDateShort(new Date(availabilities[0]))
                                : "-"}
                        </Text>

                        <Text>
                            <Text tag="strong">Price:</Text>{" "}
                            {convertPrice(price, "EUR")}
                        </Text>
                    </Grid>

                    <Button to={url}>See their page</Button>
                </Flexbox>
            </Styles.Content>
        </Styles.StyledArtistCard>
    )
}

export default ArtistCard
