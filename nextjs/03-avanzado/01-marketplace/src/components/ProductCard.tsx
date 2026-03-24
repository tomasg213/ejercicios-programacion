'use client'

import { Product } from '@/lib/products'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-icon">📦</span>
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="product-price">${product.price}</span>
      <span className="product-stock">Stock: {product.stock}</span>
      <Link href={`/producto/${product.id}`} className="btn">
        Ver Detalles
      </Link>
    </div>
  )
}
