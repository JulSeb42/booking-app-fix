/*=============================================== Page ===============================================*/

import React, { useContext } from "react"
import { Wrapper, Main, PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../../context/auth"

import Helmet from "./Helmet"
import Header from "./Header"

import { Props as HelmetProps } from "./Helmet"

const Page = ({
    children,
    title,
    description,
    keywords,
    cover,
    mainWidth = "default",
    noWrapper,
    isLoading,
    template = "1col",
}: Props) => {
    const { isLoading: isApiLoading } = useContext(
        AuthContext
    ) as AuthContextType

    return isApiLoading || isLoading ? (
        <PageLoading />
    ) : (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            {!isLoading && <Header />}

            {!noWrapper ? (
                <Wrapper template={template}>
                    {template === "1col" ? (
                        <Main size={mainWidth}>{children}</Main>
                    ) : (
                        children
                    )}
                </Wrapper>
            ) : (
                children
            )}
        </>
    )
}

export default Page

interface Props extends HelmetProps {
    children?: any
    mainWidth?: "default" | "large" | "form"
    template?: "1col" | "2cols" | "3cols"
    isLoading?: boolean
    noWrapper?: boolean
}
