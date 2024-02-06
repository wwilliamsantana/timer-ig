import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/theme/default'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './styles/globalStyles'
import { Router } from './Router'
import { CycleContextProvider } from './context/CycleContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
