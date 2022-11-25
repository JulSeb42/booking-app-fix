/*=============================================== Header types ===============================================*/

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
