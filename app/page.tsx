import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-slate-500">Ranti Admin</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
        Panel de administración
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        Gestiona los usuarios con acceso administrativo al sistema.
      </p>
      <Link href="/admins" className="mt-8">
        <Button>Gestionar administradores</Button>
      </Link>
    </main>
  )
}