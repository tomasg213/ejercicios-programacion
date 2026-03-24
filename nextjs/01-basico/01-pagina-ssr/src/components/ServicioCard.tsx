import Link from 'next/link'
import { Servicio } from '@/lib/data'

interface ServicioCardProps {
  servicio: Servicio
}

export function ServicioCard({ servicio }: ServicioCardProps) {
  return (
    <div className="servicio-card">
      <div className="servicio-imagen">
        <span className="servicio-icon">📦</span>
      </div>
      <h3>{servicio.titulo}</h3>
      <p>{servicio.descripcion}</p>
      <ul className="caracteristicas">
        {servicio.caracteristicas.slice(0, 3).map((caract, i) => (
          <li key={i}>✓ {caract}</li>
        ))}
      </ul>
      <div className="precio">
        <span className="label">Desde</span>
        <span className="amount">${servicio.precio}</span>
      </div>
      <Link href={`/servicios/${servicio.slug}`} className="btn">
        Ver más →
      </Link>
    </div>
  )
}
