import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: 'desc' },
    include: { road: true, district: true }
  })
  return NextResponse.json(alerts)
}