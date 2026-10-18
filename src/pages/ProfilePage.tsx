import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/PageWrapper'
import { useBorrow } from '@/context/BorrowContext'

function ProfilePage() {
  const { borrowedBooks, removeBorrow } = useBorrow()

  return (
    <PageWrapper>
      <main className="catalog-page">
        <header className="catalog-header">
          <Link className="catalog-brand" to="/" aria-label="Електронна бібліотека">
            <span className="catalog-brand__icon" aria-hidden="true">
              е
            </span>
            <span>Книгосвіт</span>
          </Link>
          <span className="catalog-header__caption">Особистий кабінет</span>
        </header>
        <section className="catalog-section">
          <p className="catalog-eyebrow">Ваш обліковий запис</p>
          <h1>Мої бронювання</h1>
          {borrowedBooks.length > 0 ? (
            <ul>
              {borrowedBooks.map(({ book }) => (
                <li key={book.id}>
                  <strong>{book.title}</strong> — {book.author}{' '}
                  <button type="button" onClick={() => removeBorrow(book.id)}>
                    Скасувати бронювання
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="catalog-empty">У вас поки немає заброньованих книг.</p>
          )}
          <Link to="/catalog">Переглянути каталог</Link>
        </section>
      </main>
    </PageWrapper>
  )
}

export default ProfilePage