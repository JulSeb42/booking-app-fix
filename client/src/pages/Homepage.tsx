/*=============================================== Homepage ===============================================*/

import React from "react"
import { Text, Cover } from "tsx-library-julseb"

import Page from "../components/layouts/Page"
import Search from "../components/Search"
import Logo from "../components/ui/Logo"

const Homepage = () => {
    return (
        <Page title="Homepage" noWrapper>
            <Cover
                src="/images/cover-home.jpg"
                alt="Cover Book a Band"
                overlay="black"
            >
                <Logo size={100} white />

                <Text tag="h1">
                    Book an artist / a band for your next event!
                </Text>

                <Search />
            </Cover>
        </Page>
    )
}

export default Homepage
