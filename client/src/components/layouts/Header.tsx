/*=============================================== Header ===============================================*/

import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import {
    Header as Container,
    ThemeContext,
    ComponentProps,
    ButtonIcon,
} from "tsx-library-julseb"
import { uuid } from "../../utils"

import { AuthContext, AuthContextType } from "../../context/auth"

import siteData from "../../data/site-data"

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType
    const { toggleTheme, selectedTheme } = useContext(
        ThemeContext
    ) as ComponentProps.ThemeContextProps

    const baseLinks: NavLinkType[] = [
        {
            text: "Home",
            to: "/",
            end: true,
        },
        {
            text: "All users",
            to: "/users",
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
                <NavLink to={to} end={end} key={uuid()}>
                    {text}
                </NavLink>
            ) : (
                <button onClick={onClick} key={uuid()}>
                    {text}
                </button>
            )
        )

    return (
        <Container
            logo={{ text: siteData.name }}
            navMobileVariant="drawer"
            shadow="m"
        >
            {navLinksFunc(baseLinks)}

            {isLoggedIn ? navLinksFunc(loggedInLinks) : navLinksFunc(anonLinks)}

            <ButtonIcon
                icon={selectedTheme === "dark" ? "sun" : "moon"}
                size={24}
                variant="transparent"
                color="background"
                onClick={toggleTheme}
                label="Toggle theme"
            />
        </Container>
    )
}

export default Header

interface NavLinkBase {
    text: string
    end?: boolean
}

interface NavLinkTo extends NavLinkBase {
    to: string
    onClick?: never
}

interface NavLinkButton extends NavLinkBase {
    to?: never
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type NavLinkType = NavLinkTo | NavLinkButton
