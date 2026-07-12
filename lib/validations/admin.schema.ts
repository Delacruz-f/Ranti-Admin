import { z } from 'zod'

export const adminSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(80, 'El nombre es demasiado largo'),
  usuario: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(30, 'El usuario es demasiado largo')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Solo letras, números, puntos, guiones'),
  email: z
    .string()
    .email('Correo inválido')
    .optional()
    .or(z.literal('')),
  clave: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número'),
  estado: z.enum(['ACTIVO', 'INACTIVO']).default('ACTIVO'),
})

export type AdminInput = z.infer<typeof adminSchema>