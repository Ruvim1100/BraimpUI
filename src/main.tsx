import { StrictMode } from 'react'
import './i18n/i18n.ts'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './theme';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
