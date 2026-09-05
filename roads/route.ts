import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const roads = await prisma.road.findMany()
  return NextResponse.json(roads)
}