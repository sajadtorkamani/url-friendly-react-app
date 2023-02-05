import React from 'react'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

export const history = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
