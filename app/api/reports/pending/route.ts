// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   const reports = await prisma.report.findMany({
//     where: { status: 'PENDING' },
//     orderBy: { createdAt: 'desc' },
//     include: { road: true }
//   })
//   return NextResponse.json(reports)
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const reports = await prisma.report.findMany({
    where: { status: 'PENDING' },
    // include: { road: true },
    include: { road: true, user: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(reports)
}