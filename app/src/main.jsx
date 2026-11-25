import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

var root = createRoot(document.getElementById('root'))
root.render(<App />)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function () {})
  })
}
