import { Metadata } from 'next'
import { getServicios } from '@/lib/data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ServicioCard } from '@/components/ServicioCard'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agencia Digital - Servicios',
  description: 'Ofrecemos servicios de desarrollo web, diseño UI/UX y marketing digital',
}

export default async function HomePage() {
  const servicios = await getServicios()

  return (
    <html lang="es">
      <body>
        <Header />
        <main>
          <section className="hero">
            <div className="container">
              <h1>Transformamos tu presencia digital</h1>
              <p>Servicios profesionales para hacer crecer tu negocio</p>
            </div>
          </section>

          <section id="servicios" className="servicios">
            <div className="container">
              <h2>Nuestros Servicios</h2>
              <div className="servicios-grid">
                {servicios.map(servicio => (
                  <ServicioCard key={servicio.id} servicio={servicio} />
                ))}
              </div>
            </div>
          </section>

          <section className="cta">
            <div className="container">
              <h2>¿Listo para empezar?</h2>
              <p>Contáctanos hoy y discutamos tu proyecto</p>
              <a href="mailto:info@agenciadigital.com" className="btn-cta">
                Contáctanos
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
