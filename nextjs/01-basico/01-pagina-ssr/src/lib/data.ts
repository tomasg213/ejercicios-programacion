export interface Servicio {
  id: string
  slug: string
  titulo: string
  descripcion: string
  precio: number
  caracteristicas: string[]
  imagen: string
}

export const servicios: Servicio[] = [
  {
    id: '1',
    slug: 'desarrollo-web',
    titulo: 'Desarrollo Web',
    descripcion: 'Creamos sitios web modernos, responsivos y optimizados para SEO.',
    precio: 500,
    caracteristicas: [
      'Diseño responsivo',
      'SEO optimizado',
      'Panel de administración',
      'Dominio y hosting'
    ],
    imagen: '/images/web.png'
  },
  {
    id: '2',
    slug: 'diseno-ui-ux',
    titulo: 'Diseño UI/UX',
    descripcion: 'Interfaces intuitivas y atractivas que mejoran la experiencia del usuario.',
    precio: 300,
    caracteristicas: [
      'Prototipos interactivos',
      'Design system',
      'Pruebas de usuario',
      'Iteración rápida'
    ],
    imagen: '/images/design.png'
  },
  {
    id: '3',
    slug: 'marketing-digital',
    titulo: 'Marketing Digital',
    descripcion: 'Estrategias personalizadas para hacer crecer tu negocio online.',
    precio: 400,
    caracteristicas: [
      'Gestión de redes sociales',
      'Google Ads',
      'Email marketing',
      'Analytics y reportes'
    ],
    imagen: '/images/marketing.png'
  },
  {
    id: '4',
    slug: 'tiendas-online',
    titulo: 'Tiendas Online',
    descripcion: 'E-commerce completo con pasarela de pagos y gestión de inventario.',
    precio: 800,
    caracteristicas: [
      'Catálogo de productos',
      'Pasarela de pagos',
      'Gestión de inventario',
      'Diseño responsivo'
    ],
    imagen: '/images/ecommerce.png'
  }
]

export async function getServicios(): Promise<Servicio[]> {
  return servicios
}

export async function getServicioBySlug(slug: string): Promise<Servicio | undefined> {
  return servicios.find(s => s.slug === slug)
}
