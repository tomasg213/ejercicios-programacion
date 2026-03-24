import Link from 'next/link'

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span>📝</span>
          <span>Mi Blog</span>
        </div>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/about">Acerca de</Link>
        </nav>
      </div>
    </header>
  )
}
