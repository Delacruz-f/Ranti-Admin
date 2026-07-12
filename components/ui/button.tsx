import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-400',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 border border-slate-700',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}