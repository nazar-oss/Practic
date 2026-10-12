import type { Book } from '@/types/book'

export interface BorrowItem {
  book: Book
  reservedAt: string
}

export interface BorrowContextType {
  borrowedBooks: BorrowItem[]
  addBorrow: (book: Book) => void
  removeBorrow: (bookId: number) => void
  clearBorrows: () => void
  isBookReserved: (bookId: number) => boolean
  totalReserved: number
}
