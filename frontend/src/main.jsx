import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AppContextProvider>
  </BrowserRouter>,
)
