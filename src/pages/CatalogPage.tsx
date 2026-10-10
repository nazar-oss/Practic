import { useState } from 'react'
import BookCard from '@/components/BookCard/BookCard'
import Button from '@/components/Button/Button'
import type { Book } from '@/types/book'

const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Тигролови',
    author: 'Іван Багряний',
    genre: 'Українська класика',
    year: 1944,
    availableCopies: 3,
  },
  {
    id: 'book-2',
    title: 'Місто',
    author: 'Валер’ян Підмогильний',
    genre: 'Роман',
    year: 1928,
    availableCopies: 2,
  },
  {
    id: 'book-3',
    title: 'Кобзар',
    author: 'Тарас Шевченко',
    genre: 'Поезія',
    year: 1840,
    availableCopies: 4,
  },
  {
    id: 'book-4',
    title: 'Лісова пісня',
    author: 'Леся Українка',
    genre: 'Драма-феєрія',
    year: 1911,
    availableCopies: 1,
  },
]

function CatalogPage() {
  const [books, setBooks] = useState(initialBooks)
  const [notice, setNotice] = useState('')

  const reserveBook = (reservedBook: Book) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === reservedBook.id && book.availableCopies > 0
          ? { ...book, availableCopies: book.availableCopies - 1 }
          : book,
      ),
    )
    setNotice(`Книгу «${reservedBook.title}» додано до ваших бронювань.`)
  }

  return (
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
    </main>
  )
}

export default CatalogPage
