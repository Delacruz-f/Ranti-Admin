import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { EstadoBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function AdminsPage() {
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, nombre: true, usuario: true, email: true, estado: true, createdAt: true },
  })

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Panel de administración</p>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Administradores
          </h1>
        </div>
        <Link href="/admins/nuevo">
          <Button>+ Nuevo administrador</Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#131826]">
        {admins.length === 0 ? (
          <div className="px-6 py-16 text-center text-slate-500">
            Todavía no hay administradores registrados.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Nombre</th>
                <th className="px-6 py-3 font-medium">Usuario</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium">Creado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-slate-500">
                    #{admin.id}
                  </td>
                  <td className="px-6 py-4 text-slate-200">{admin.nombre}</td>
                  <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-slate-400">
                    {admin.usuario}
                  </td>
                  <td className="px-6 py-4">
                    <EstadoBadge estado={admin.estado} />
                  </td>
                  <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-xs text-slate-500">
                    {new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(admin.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}