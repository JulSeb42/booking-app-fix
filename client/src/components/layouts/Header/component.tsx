/*=============================================== Header component ===============================================*/

import React, { useContext } from "react"
import { Header as Container } from "tsx-library-julseb"
import { uuid } from "../../../utils"

import { AuthContext, AuthContextType } from "../../../context/auth"

import HeaderSearch from "../HeaderSearch"

import * as Styles from "./styles"
import { NavLinkType } from "./types"

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType

    const baseLinks: NavLinkType[] = [
        {
            text: "All artists",
            to: "/artists",
        },
    ]

    const anonLinks: NavLinkType[] = [
        {
            text: "Log in",
            to: "/login",
        },
        {
            text: "Sign up",
            to: "/signup",
        },
    ]

    const loggedInLinks: NavLinkType[] = [
        {
            text: "My account",
            to: "/my-account",
        },
        {
            text: "Log out",
            onClick: logoutUser,
        },
    ]

    const navLinksFunc = (links: NavLinkType[]) =>
        links.map(({ text, to, onClick, end }) =>
            to ? (
                <Styles.Link to={to} end={end} key={uuid()}>
                    {text}
                </Styles.Link>
            ) : (
                <Styles.Link as="button" onClick={onClick} key={uuid()}>
                    {text}
                </Styles.Link>
            )
        )

    return (
        <Container
            logo={{ img: "/images/logo-white.svg" }}
            navMobileVariant="drawer"
            shadow="m"
        >
            {navLinksFunc(baseLinks)}

            {isLoggedIn ? navLinksFunc(loggedInLinks) : navLinksFunc(anonLinks)}

            <HeaderSearch />
        </Container>
    )
}

export default Header
