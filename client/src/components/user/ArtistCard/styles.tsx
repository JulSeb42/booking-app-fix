/*=============================================== ArtistCard styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, ThemeLight, Spacers } from "tsx-library-julseb"

export const StyledArtistCard = styled.div`
    ${Mixins.Flexbox({
        $alignItems: "flex-start",
        $justifyContent: "flex-start",
        $gap: "s",
    })};

    &:not(:last-child) {
        border-bottom: 1px solid ${ThemeLight.Gray200};
        padding-bottom: ${Spacers.S};
    }
`

export const Content = styled.div`
    flex-grow: 1;
`
