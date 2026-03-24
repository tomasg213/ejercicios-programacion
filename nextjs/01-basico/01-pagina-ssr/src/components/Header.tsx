import { ReactNode } from 'react'
import Link from 'next/link'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">Agencia Digital</span>
        </div>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/#servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
      {children}
    </header>
  )
}
