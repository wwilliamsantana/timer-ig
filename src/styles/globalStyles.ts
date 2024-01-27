import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus{
  outline: 0;
  box-shadow: 0 0 0 2px ;
}

body{
  background: ${(props) => props.theme.gray900};
  color: ${(props) => props.theme.gray300};
  -webkit-font-smoothing: antialiased;
}


body, button, input, textarea{
  font-weight: 400;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
}


`
