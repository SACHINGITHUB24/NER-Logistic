// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   const roads = await prisma.road.findMany()
//   return NextResponse.json(roads)
// }
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { action } = await req.json()

  if (action === 'RESOLVE') {
    await prisma.road.update({
      where: { id },
      data: { riskScore: 0, status: 'CLEAR', reroutingActive: false }
    })
    const district = await prisma.district.findFirst({ where: { primaryRoadId: id } })
    if (district) {
      await prisma.district.update({
        where: { id: district.id },
        data: { drainRate: 1, daysToStockout: district.supplyDaysRemaining }
      })
    }
  }

  if (action === 'REMOVE_REROUTING') {
    await prisma.road.update({
      where: { id },
      data: { reroutingActive: false }
    })
  }

  if (action === 'ACTIVATE_REROUTING') {
    await prisma.road.update({
      where: { id },
      data: { reroutingActive: true }
    })
  }

  return NextResponse.json({ success: true })
}