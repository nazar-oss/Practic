import { motion } from 'framer-motion'
import Button from '@/components/Button/Button'
import { useBorrow } from '@/context/BorrowContext'
import type { Book } from '@/types/book'
import './BookCard.css'

interface BookCardProps {
  book: Book
  onReserve: (title: string) => void
}

function BookCard({ book, onReserve }: BookCardProps) {
  const { addBorrow, isBookReserved } = useBorrow()
  const isReserved = isBookReserved(book.id)
  const isAvailable = book.available > 0

  return (
    <motion.article
      className="book-card"
      layout
      whileHover={{ y: -6 }}
    >
      <div className="book-card__cover" aria-hidden="true">
        <span className="book-card__cover-mark">ЧИТАЙ</span>
      </div>
      <div className="book-card__content">
        <p className="book-card__genre">{book.genre}</p>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <dl className="book-card__details">
          <div>
            <dt>Рік видання</dt>
            <dd>{book.year}</dd>
          </div>
          <div>
            <dt>Доступно примірників</dt>
            <dd>{book.available}</dd>
          </div>
        </dl>
        <Button
          label={
            isReserved
              ? 'Заброньовано'
              : isAvailable
                ? 'Забронювати'
                : 'Немає в наявності'
          }
          onClick={() => {
            addBorrow(book)
            onReserve(book.title)
          }}
          variant="primary"
          disabled={!isAvailable || isReserved}
        />
      </div>
    </motion.article>
  )
}

export default BookCard
