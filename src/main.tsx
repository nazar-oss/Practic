import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BorrowProvider } from '@/context/BorrowContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BorrowProvider>
        <App />
      </BorrowProvider>
    </BrowserRouter>
  </React.StrictMode>
)