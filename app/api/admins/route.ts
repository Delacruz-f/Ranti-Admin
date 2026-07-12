import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { adminSchema } from '@/lib/validations/admin.schema'

// GET /api/admins — listar
export async function GET() {
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      nombre: true,
      usuario: true,
      email: true,
      estado: true,
      createdAt: true,
      // clave: se sigue excluyendo, aunque no esté hasheada
    },
  })

  return NextResponse.json(admins)
}

// POST /api/admins — crear
export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = adminSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { nombre, usuario, email, clave, estado } = result.data

  const existente = await prisma.admin.findUnique({ where: { usuario } })
  if (existente) {
    return NextResponse.json(
      { error: 'El nombre de usuario ya está en uso' },
      { status: 409 }
    )
  }

  const nuevoAdmin = await prisma.admin.create({
    data: {
      nombre,
      usuario,
      email: email || null,
      clave, // texto plano por ahora
      estado,
    },
    select: {
      id: true,
      nombre: true,
      usuario: true,
      email: true,
      estado: true,
      createdAt: true,
    },
  })

  return NextResponse.json(nuevoAdmin, { status: 201 })
}