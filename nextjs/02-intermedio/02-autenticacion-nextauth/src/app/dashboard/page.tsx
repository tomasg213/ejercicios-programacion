import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Protegido</h1>
      <p>Bienvenido, {session.user?.name}</p>
      <p>Tu email: {session.user?.email}</p>
      <p>Tu rol: {(session.user as any).role}</p>
    </div>
  )
}
