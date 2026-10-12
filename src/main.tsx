import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BorrowProvider } from '@/context/BorrowContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BorrowProvider>
      <App />
    </BorrowProvider>
  </StrictMode>,
)
