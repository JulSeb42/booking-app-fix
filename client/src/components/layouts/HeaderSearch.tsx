/*=============================================== HeaderSearch ===============================================*/

import React, { useState } from "react"
import { ButtonIcon, Modal } from "tsx-library-julseb"
import { useKeyPress } from "../../hooks"

import Search from "../Search"

const HeaderSearch = () => {
    const [isOpen, setIsOpen] = useState(false)

    useKeyPress(() => setIsOpen(!isOpen), ["Command", "KeyK"])

    return (
        <>
            <ButtonIcon
                icon="search"
                label="Search"
                size={24}
                variant="transparent"
                color="white"
                onClick={() => setIsOpen(true)}
            />

            <Modal isOpen={isOpen}>
                <Search close={() => setIsOpen(false)} />
            </Modal>
        </>
    )
}

export default HeaderSearch
