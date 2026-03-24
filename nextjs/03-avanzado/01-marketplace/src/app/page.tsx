import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'
import './globals.css'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <html lang="es">
      <body>
        <div className="marketplace">
          <header className="header">
            <h1>🛒 Mi Marketplace</h1>
            <Link href="/carrito" className="cart-link">Carrito 🛒</Link>
          </header>

          <main>
            <section className="filters">
              <input type="text" placeholder="Buscar productos..." />
              <select>
                <option value="">Todas las categorías</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Audio">Audio</option>
              </select>
            </section>

            <section className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          </main>
        </div>
      </body>
    </html>
  )
}
