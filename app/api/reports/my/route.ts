// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   const reports = await prisma.report.findMany({
//     orderBy: { createdAt: 'desc' },
//     take: 10,
//     include: { road: true }
//   })
//   return NextResponse.json(reports)
// }


import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json([], { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  })

  if (!user) return NextResponse.json([])

  const reports = await prisma.report.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { road: true }
  })

  return NextResponse.json(reports)
}