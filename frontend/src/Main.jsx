// Importing the necessary modules 
import "./Main.css"; 
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Getting the root element 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
