import { StrictMode } from 'react'
import './i18n/i18n.ts'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './theme';
import App from './App.tsx'
import { AuthProvider } from './auth/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
