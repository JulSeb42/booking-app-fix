/*=============================================== Page ===============================================*/

import React, { useContext } from "react"
import { Wrapper, Main, PageLoading } from "tsx-library-julseb"
import { useLocation } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"
import { GlobalContext, GlobalType } from "../../context/global"

import Helmet from "./Helmet"
import Header from "./Header/component"

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
    const location = useLocation().pathname

    const { isLoading: isApiLoading } = useContext(
        AuthContext
    ) as AuthContextType
    const { isLoading: isGlobalLoading } = useContext(
        GlobalContext
    ) as GlobalType

    return isApiLoading || isLoading || isGlobalLoading ? (
        <PageLoading />
    ) : (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            {!isLoading && location !== "/" && <Header />}

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
