import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    // await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashed,
    //     role: 'CITIZEN'
    //   }
    // })

    await prisma.user.create({
  data: {
    email,
    password: hashed,
    name: name || null,
    role: 'CITIZEN'
  }
})

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}