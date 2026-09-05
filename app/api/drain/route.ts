// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function POST() {
//   const districts = await prisma.district.findMany({
//     include: { alerts: false }
//   })

//   for (const district of districts) {
//     const road = await prisma.road.findUnique({ where: { id: district.primaryRoadId } })
//     if (!road) continue

//     let drainRate = 1
//     if (road.status === 'AT_RISK') drainRate = 1.5
//     if (road.status === 'BLOCKED') drainRate = 2.5

//     const drainPerCycle = drainRate * (30 / (24 * 60 * 2)) // drains over 30 days realistically
//     const newSupply = Math.max(0, district.supplyDaysRemaining - drainPerCycle)
//     const daysToStockout = drainRate > 0 ? newSupply / drainRate : newSupply

//     await prisma.district.update({
//       where: { id: district.id },
//       data: { supplyDaysRemaining: newSupply, drainRate, daysToStockout }
//     })
//   }

//   return NextResponse.json({ success: true })
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const districts = await prisma.district.findMany()

  for (const district of districts) {
    const road = await prisma.road.findUnique({
      where: { id: district.primaryRoadId }
    })
    if (!road) continue

    // CLEAR roads: supply is being replenished, no drain
    // AT_RISK: 0.15 days per 30s cycle (~1 day supply lost every 3.3 min demo time)
    // BLOCKED: 0.5 days per 30s cycle (~1 day supply lost every 1 min demo time)
    const drainPerCycle =
      road.status === 'BLOCKED' ? 0.5 :
      road.status === 'AT_RISK'  ? 0.15 : 0

    if (drainPerCycle === 0) continue

    const newSupply = Math.max(0, district.supplyDaysRemaining - drainPerCycle)
    const daysToStockout = district.drainRate > 0
      ? newSupply / district.drainRate
      : newSupply

    await prisma.district.update({
      where: { id: district.id },
      data: {
        supplyDaysRemaining: newSupply,
        daysToStockout
      }
    })

    // Create a critical alert if stockout is imminent
    if (daysToStockout <= 3 && daysToStockout > 0) {
      const recentAlert = await prisma.alert.findFirst({
        where: {
          districtId: district.id,
          message: { contains: 'CRITICAL' },
          createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) } // dedupe within 5 min
        }
      })
      if (!recentAlert) {
        await prisma.alert.create({
          data: {
            roadId: district.primaryRoadId,
            districtId: district.id,
            message: `⚠️ CRITICAL: ${district.name} has only ${daysToStockout.toFixed(1)} days of supply remaining.`
          }
        })
      }
    }
  }

  return NextResponse.json({ success: true })
}