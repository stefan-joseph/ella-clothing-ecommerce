import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --backgroundColor: ${(props) => props.theme.backgroundColor};
    --secondaryBackgroundColor: ${(props) =>
      props.theme.secondaryBackgroundColor};
    --mainColor: ${(props) => props.theme.mainColor};
    --secondaryColor: ${(props) => props.theme.secondaryColor};
    --tertiaryColor: ${(props) => props.theme.tertiaryColor};
    --dangerColor: ${(props) => props.theme.dangerColor};
    --borderWidth: ${(props) => props.theme.borderWidth};
    --fontWeight: ${(props) => props.theme.fontWeight};
  }
  `;
