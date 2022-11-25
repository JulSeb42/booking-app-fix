/*=============================================== UserCard styles ===============================================*/

import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import {
    Radiuses,
    Mixins,
    FontSizes,
    Overlays,
    Transitions,
    Breakpoints,
    Shadows,
} from "tsx-library-julseb"

const StyledUserCard = styled(Link)`
    aspect-ratio: 1;
    border-radius: ${Radiuses.M};
    overflow: hidden;
    position: relative;
    color: ${({ theme }) => theme.White};
    text-decoration: none;
    font-size: ${FontSizes.Titles.H6};
    transition: ${Transitions.Short};

    img {
        position: relative;
        z-index: 0;
    }

    &:before {
        content: "";
        background: ${Overlays.Gradient.Black};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    @media ${Breakpoints.Hover} {
        &:hover {
            transform: scale(1.02);
            box-shadow: ${Shadows.XS};
        }
    }
`

const Username = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    ${Mixins.Flexbox({
        $flexDirection: "column",
        $alignContent: "flex-start",
        $justifyContent: "flex-end",
        $padding: "xs",
    })};
`

export { StyledUserCard, Username }
