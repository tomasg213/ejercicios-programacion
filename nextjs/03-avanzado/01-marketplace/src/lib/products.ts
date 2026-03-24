export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

export const products: Product[] = [
  { id: '1', name: 'Laptop Pro', description: 'Potente laptop para desarrollo', price: 1299, category: 'Electrónica', image: '/laptop.jpg', stock: 10 },
  { id: '2', name: 'Mouse Inalámbrico', description: 'Mouse ergonómico wireless', price: 49, category: 'Accesorios', image: '/mouse.jpg', stock: 50 },
  { id: '3', name: 'Teclado Mecánico', description: 'Teclado RGB switches blue', price: 149, category: 'Accesorios', image: '/keyboard.jpg', stock: 30 },
  { id: '4', name: 'Monitor 4K', description: 'Monitor 27 pulgadas 4K', price: 499, category: 'Electrónica', image: '/monitor.jpg', stock: 15 },
  { id: '5', name: 'Auriculares', description: 'Auriculares noise cancelling', price: 299, category: 'Audio', image: '/headphones.jpg', stock: 25 },
  { id: '6', name: 'Webcam HD', description: 'Webcam 1080p para streaming', price: 89, category: 'Electrónica', image: '/webcam.jpg', stock: 20 }
]

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id)
}

export async function searchProducts(query: string): Promise<Product[]> {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}
