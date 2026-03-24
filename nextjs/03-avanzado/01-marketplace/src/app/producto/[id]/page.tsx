import { getProductById } from '@/lib/products'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="product-page">
      <Link href="/">← Volver</Link>
      <div className="product-detail">
        <div className="product-image">
          <span className="product-icon">📦</span>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="category">Categoría: {product.category}</p>
          <p className="price">${product.price}</p>
          <p className="stock">Stock disponible: {product.stock}</p>
          <button className="btn-add">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  )
}
