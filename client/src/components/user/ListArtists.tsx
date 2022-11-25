/*=============================================== ListArtists ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

const ListArtists = styled.div`
    ${Mixins.Grid({
        $gap: "s",
    })};
`

export default ListArtists
