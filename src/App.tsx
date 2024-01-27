import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/theme/default'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './styles/globalStyles'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
