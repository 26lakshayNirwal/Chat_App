import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async' // ✅ Corrected import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Wrap App with HelmetProvider */}
      <CssBaseline />
      <App />
    </HelmetProvider>
  </StrictMode>
)
