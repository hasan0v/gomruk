import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'leaflet/dist/leaflet.css'
import './styles.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster richColors position="top-right" closeButton />
    </BrowserRouter>
  </React.StrictMode>,
)
