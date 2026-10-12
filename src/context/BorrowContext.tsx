import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Book } from '@/types/book'
import type { BorrowContextType, BorrowItem } from '@/types/borrow'

const STORAGE_KEY = 'elibrary_borrowed_books'

const BorrowContext = createContext<BorrowContextType | undefined>(undefined)

function isBook(value: unknown): value is Book {
  if (typeof value !== 'object' || value === null) return false

  const book = value as Record<string, unknown>
  return (
    typeof book.id === 'number' &&
    typeof book.genre === 'string' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string' &&
    typeof book.year === 'number' &&
    typeof book.available === 'number'
  )
}

function isBorrowItem(value: unknown): value is BorrowItem {
  if (typeof value !== 'object' || value === null) return false

  const item = value as Record<string, unknown>
  return isBook(item.book) && typeof item.reservedAt === 'string'
}

function readBorrowedBooks(): BorrowItem[] {
  if (typeof window === 'undefined') return []

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (storedValue === null) return []

    const parsedValue: unknown = JSON.parse(storedValue)
    if (Array.isArray(parsedValue) && parsedValue.every(isBorrowItem)) {
      return parsedValue
    }

    console.error(`Invalid borrowed books data in localStorage key "${STORAGE_KEY}".`)
  } catch (error) {
    console.error('Failed to read borrowed books from localStorage.', error)
  }

  return []
}

interface BorrowProviderProps {
  children: ReactNode
}

export function BorrowProvider({ children }: BorrowProviderProps) {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowItem[]>(readBorrowedBooks)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(borrowedBooks))
    } catch (error) {
      console.error('Failed to save borrowed books to localStorage.', error)
    }
  }, [borrowedBooks])

  const addBorrow = useCallback((book: Book) => {
    setBorrowedBooks((currentBooks) =>
      currentBooks.some((item) => item.book.id === book.id)
        ? currentBooks
        : [...currentBooks, { book, reservedAt: new Date().toISOString() }],
    )
  }, [])

  const removeBorrow = useCallback((bookId: number) => {
    setBorrowedBooks((currentBooks) =>
      currentBooks.filter((item) => item.book.id !== bookId),
    )
  }, [])

  const clearBorrows = useCallback(() => {
    setBorrowedBooks([])
  }, [])

  const isBookReserved = useCallback(
    (bookId: number) => borrowedBooks.some((item) => item.book.id === bookId),
    [borrowedBooks],
  )

  const contextValue = useMemo(
    () => ({
      borrowedBooks,
      addBorrow,
      removeBorrow,
      clearBorrows,
      isBookReserved,
      totalReserved: borrowedBooks.length,
    }),
    [
      borrowedBooks,
      addBorrow,
      removeBorrow,
      clearBorrows,
      isBookReserved,
    ],
  )

  return (
    <BorrowContext.Provider value={contextValue}>
      {children}
    </BorrowContext.Provider>
  )
}

// The context hook belongs with its provider, though Fast Refresh expects component-only exports.
// eslint-disable-next-line react-refresh/only-export-components
export function useBorrow(): BorrowContextType {
  const context = useContext(BorrowContext)
  if (context === undefined) {
    throw new Error('useBorrow must be used within a BorrowProvider')
  }
  return context
}
