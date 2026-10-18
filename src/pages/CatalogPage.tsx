import { useState } from 'react'
import BookCard from '@/components/BookCard/BookCard'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import { PageWrapper } from '@/components/PageWrapper'
import type { Book } from '@/types/book'

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'Тигролови',
    author: 'Іван Багряний',
    genre: 'УКРАЇНСЬКА КЛАСИКА',
    year: 1944,
    available: 3,
  },
  {
    id: 2,
    title: 'Місто',
    author: "Валер'ян Підмогильний",
    genre: 'РОМАН',
    year: 1928,
    available: 2,
  },
  {
    id: 3,
    title: 'Кобзар',
    author: 'Тарас Шевченко',
    genre: 'ПОЕЗІЯ',
    year: 1840,
    available: 4,
  },
  {
    id: 4,
    title: 'Лісова пісня',
    author: 'Леся Українка',
    genre: 'ДРАМА-ФЕЄРІЯ',
    year: 1911,
    available: 1,
  },
]

function CatalogPage() {
  const [books, setBooks] = useState(initialBooks)
  const [notice, setNotice] = useState('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const reserveBook = (bookToReserve: Book) => {
    const reservedBook = books.find((book) => book.id === bookToReserve.id)
    if (!reservedBook || reservedBook.available === 0) return

    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === reservedBook.id && book.available > 0
          ? { ...book, available: book.available - 1 }
          : book,
      ),
    )
    setNotice(`Книгу «${reservedBook.title}» додано до ваших бронювань.`)
    setSelectedBook(reservedBook)
  }

  return (
    <PageWrapper>
    <main className="catalog-page">
      <header className="catalog-header">
        <a className="catalog-brand" href="/" aria-label="Електронна бібліотека">
          <span className="catalog-brand__icon" aria-hidden="true">
            е
          </span>
          <span>Книгосвіт</span>
        </a>
        <span className="catalog-header__caption">Електронна бібліотека</span>
      </header>

      <section className="catalog-hero">
        <div className="catalog-hero__copy">
          <p className="catalog-eyebrow">Знання починаються тут</p>
          <h1>Знайдіть свою наступну улюблену книгу</h1>
          <p className="catalog-hero__description">
            Відкривайте нові історії, досліджуйте каталог і бронюйте книги у
            кілька кліків.
          </p>
          <Button
            label="Перейти до каталогу"
            onClick={() =>
              document
                .getElementById('book-catalog')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            variant="primary"
          />
        </div>
        <div className="catalog-hero__art" aria-hidden="true">
          <div className="catalog-hero__book catalog-hero__book--back" />
          <div className="catalog-hero__book catalog-hero__book--front">
            <span>НОВІ<br />ІСТОРІЇ</span>
          </div>
          <span className="catalog-hero__sparkle">✦</span>
        </div>
      </section>

      <section className="catalog-section" id="book-catalog">
        <div className="catalog-section__heading">
          <div>
            <p className="catalog-eyebrow">Добірка бібліотеки</p>
            <h2>Каталог книг</h2>
          </div>
          <p className="catalog-count">{books.length} книги у добірці</p>
        </div>
        {notice && (
          <p className="catalog-notice" role="status">
            {notice}
          </p>
        )}
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onReserve={reserveBook} />
          ))}
        </div>
      </section>

      <footer className="catalog-footer">
        Система управління електронною бібліотекою та каталогом книг
      </footer>
      <Modal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title="Статус бронювання"
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Книгу <strong>«{selectedBook?.title}»</strong> успішно заброньовано!
          </p>
          <p style={{ color: '#666' }}>Автор: {selectedBook?.author}</p>
        </div>
      </Modal>
    </main>
    </PageWrapper>
  )
}

export default CatalogPage
