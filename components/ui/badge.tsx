export function EstadoBadge({ estado }: { estado: 'ACTIVO' | 'INACTIVO' }) {
  const activo = estado === 'ACTIVO'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        activo
          ? 'bg-emerald-400/10 text-emerald-400'
          : 'bg-rose-400/10 text-rose-400'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          activo ? 'bg-emerald-400' : 'bg-rose-400'
        }`}
      />
      {activo ? 'Activo' : 'Inactivo'}
    </span>
  )
}