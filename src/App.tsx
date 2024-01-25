import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/theme/default'
import { GlobalStyles } from './styles/globalStyles'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello</h1>
      <GlobalStyles />
    </ThemeProvider>
  )
}
