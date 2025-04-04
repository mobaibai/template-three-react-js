import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'virtual:uno.css'

const rootDiv = document.getElementById('root')
const root = ReactDOM.createRoot(rootDiv)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)