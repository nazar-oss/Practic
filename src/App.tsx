import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'

// Імпорт сторінок через default (без фігурних дужок):
import HomePage from '@/pages/HomePage'
import CatalogPage from '@/pages/CatalogPage'
import BookDetailPage from '@/pages/BookDetailPage'
import ProfilePage from '@/pages/ProfilePage'
import AdminPage from '@/pages/AdminPage'

import './App.css'

function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}

export default App