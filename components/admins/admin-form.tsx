'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function AdminForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errores, setErrores] = useState<Record<string, string[]>>({})
  const [errorGeneral, setErrorGeneral] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrores({})
    setErrorGeneral('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      nombre: formData.get('nombre'),
      usuario: formData.get('usuario'),
      email: formData.get('email'),
      clave: formData.get('clave'),
      estado: formData.get('estado'),
    }

    const res = await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      if (data.detalles) setErrores(data.detalles)
      else setErrorGeneral(data.error || 'Ocurrió un error inesperado')
      return
    }

    router.push('/admins')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorGeneral && (
        <div className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-400">
          {errorGeneral}
        </div>
      )}

      <Campo label="Nombre completo" name="nombre" errores={errores.nombre} />
      <Campo label="Usuario" name="usuario" errores={errores.usuario} mono />
      <Campo label="Correo (opcional)" name="email" type="email" errores={errores.email} />
      <Campo label="Contraseña" name="clave" type="password" errores={errores.clave} />

      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Estado</label>
        <select
          name="estado"
          defaultValue="ACTIVO"
          className="w-full rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar administrador'}
        </Button>
      </div>
    </form>
  )
}

function Campo({
  label,
  name,
  type = 'text',
  mono = false,
  errores,
}: {
  label: string
  name: string
  type?: string
  mono?: boolean
  errores?: string[]
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-slate-400">{label}</label>
      <input
        name={name}
        type={type}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 ${
          errores?.length
            ? 'border-rose-400/50 focus:border-rose-400 focus:ring-rose-400'
            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'
        } bg-[#0B0F17] ${mono ? 'font-[family-name:var(--font-mono)]' : ''}`}
      />
      {errores?.map((e) => (
        <p key={e} className="mt-1 text-xs text-rose-400">{e}</p>
      ))}
    </div>
  )
}