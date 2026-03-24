import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="home">
      <h1>App con Autenticación</h1>
      {session ? (
        <div>
          <p>Ya has iniciado sesión</p>
          <Link href="/dashboard">Ir al Dashboard</Link>
        </div>
      ) : (
        <div>
          <p>Inicia sesión para continuar</p>
          <Link href="/login">Iniciar Sesión</Link>
        </div>
      )}
    </div>
  )
}
