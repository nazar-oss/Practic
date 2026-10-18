import { Link, useParams } from 'react-router-dom'
import { PageWrapper } from '@/components/PageWrapper'

function BookDetailPage() {
  const { id } = useParams()

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
          <span className="catalog-header__caption">Електронна бібліотека</span>
        </header>
        <section className="catalog-section">
          <p className="catalog-eyebrow">Книга {id}</p>
          <h1>Деталі книги</h1>
          <p className="catalog-empty">
            Інформація про цю книгу поки що недоступна.
          </p>
          <Link to="/catalog">Повернутися до каталогу</Link>
        </section>
      </main>
    </PageWrapper>
  )
}

export default BookDetailPage