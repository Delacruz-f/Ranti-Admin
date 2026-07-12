import Link from 'next/link'
import { AdminForm } from '@/components/admins/admin-form'

export default function NuevoAdminPage() {
  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <Link href="/admins" className="mb-6 inline-block text-sm text-slate-500 hover:text-slate-300">
        ← Volver a administradores
      </Link>
      <p className="text-xs uppercase tracking-widest text-slate-500">Nuevo registro</p>
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
        Agregar administrador
      </h1>
      <AdminForm />
    </main>
  )
}