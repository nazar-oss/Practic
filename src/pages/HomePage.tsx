import { useState } from 'react'
import { motion } from 'framer-motion'
import BookCard from '@/components/BookCard/BookCard'
import Button from '@/components/Button/Button'
import { PageWrapper } from '@/components/PageWrapper'
import { useBorrow } from '@/context/BorrowContext'
import type { Book } from '@/types/book'

const books: Book[] = [
  {
    id: 1,
    genre: 'УКРАЇНСЬКА КЛАСИКА',
    title: 'Тигролови',
    author: 'Іван Багряний',
    year: 1944,
    available: 3,
  },
  {
    id: 2,
    genre: 'РОМАН',
    title: 'Місто',
    author: "Валер'ян Підмогильний",
    year: 1928,
    available: 2,
  },
  {
    id: 3,
    genre: 'ПОЕЗІЯ',
    title: 'Кобзар',
    author: 'Тарас Шевченко',
    year: 1840,
    available: 4,
  },
  {
    id: 4,
    genre: 'ДРАМА-ФЕЄРІЯ',
    title: 'Лісова пісня',
    author: 'Леся Українка',
    year: 1911,
    available: 1,
  },
]

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { totalReserved } = useBorrow()
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase('uk')
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLocaleLowerCase('uk')
      .includes(normalizedSearchQuery),
  )

  const handleReserveBook = (title: string) => {
    window.alert(`Книгу «${title}» успішно заброньовано!`)
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
        <span className="catalog-reservation-count" role="status">
          Заброньовано книг: {totalReserved}
        </span>
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
          />
        </div>
        <div className="catalog-hero__art" aria-hidden="true">
          <div className="catalog-hero__book catalog-hero__book--back" />
          <div className="catalog-hero__book catalog-hero__book--front">
            <span>
              НОВІ
              <br />
              ІСТОРІЇ
            </span>
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
          <p className="catalog-count">{filteredBooks.length} книги у добірці</p>
        </div>
        <label className="catalog-search">
          <span>Пошук за назвою або автором</span>
          <motion.input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Наприклад, «Тигролови»"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.16 }}
          />
        </label>
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onReserve={handleReserveBook}
            />
          ))}
        </div>
        {filteredBooks.length === 0 && (
          <p className="catalog-empty" role="status">
            За вашим запитом книг не знайдено.
          </p>
        )}
      </section>

      <footer className="catalog-footer">
        Система управління електронною бібліотекою та каталогом книг
      </footer>
    </main>
    </PageWrapper>
  )
}

export default HomePage