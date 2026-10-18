import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/PageWrapper'

function AdminPage() {
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
          <span className="catalog-header__caption">Адміністрування</span>
        </header>
        <section className="catalog-section">
          <p className="catalog-eyebrow">Книгосвіт</p>
          <h1>Панель адміністратора</h1>
          <p className="catalog-empty">
            Інструменти керування бібліотекою будуть доступні тут.
          </p>
        </section>
      </main>
    </PageWrapper>
  )
}

export default AdminPage