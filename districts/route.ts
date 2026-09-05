import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const districts = await prisma.district.findMany()
  return NextResponse.json(districts)
}