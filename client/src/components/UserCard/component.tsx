/*=============================================== UserCard component ===============================================*/

import React from "react"
import { Image } from "tsx-library-julseb"

import * as Styles from "./styles"
import { UserCardProps } from "./types"

const UserCard = ({ user }: UserCardProps) => {
    const { _id, fullName, imageUrl } = user

    return (
        <Styles.StyledUserCard to={`/users/${_id}`}>
            <Image
                src={imageUrl}
                alt={`Avatar ${fullName}`}
                width="100%"
                height="100%"
                fit="cover"
            />

            <Styles.Username>{fullName}</Styles.Username>
        </Styles.StyledUserCard>
    )
}

export default UserCard
