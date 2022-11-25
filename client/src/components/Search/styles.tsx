/*=============================================== Search styles ===============================================*/

import styled, { css } from "styled-components/macro"
import {
    Button,
    ThemeLight,
    Spacers,
    Radiuses,
    Shadows,
    Mixins,
} from "tsx-library-julseb"

export const StyledSearch = styled.form<{ $isModal?: boolean }>`
    width: 90%;
    max-width: calc(600px + ${Spacers.S} * 2);
    background-color: ${ThemeLight.White};
    padding: ${Spacers.S};
    border-radius: ${Radiuses.M};
    box-shadow: ${Shadows.M};
    text-align: left;

    ${({ $isModal }) =>
        $isModal
            ? css`
                  ${Mixins.Grid({
                      $col: 2,
                      $columnGap: "xs",
                      $rowGap: "xxs",
                  })};
              `
            : css`
                  ${Mixins.Flexbox({
                      $gap: "xs",
                      $alignItems: "flex-end",
                  })};

                  & > div {
                      flex-grow: 1;
                  }

                  & > button {
                      height: 32px;
                  }
              `};
`

export const StyledButton = styled(Button)<{ $isModal?: boolean }>``
