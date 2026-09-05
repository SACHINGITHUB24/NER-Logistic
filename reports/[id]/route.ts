// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { action } = await req.json()

//   const report = await prisma.report.findUnique({
//     where: { id: params.id },
//     include: { road: true }
//   })

//   if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 })

//   if (action === 'REJECT') {
//     await prisma.report.update({
//       where: { id: params.id },
//       data: { status: 'REJECTED' }
//     })
//     return NextResponse.json({ success: true })
//   }

//   if (action === 'APPROVE') {
//     // Update report status
//     await prisma.report.update({
//       where: { id: params.id },
//       data: { status: 'APPROVED' }
//     })

//     const road = report.road

//     // Calculate new risk score
//     let newRiskScore = road.riskScore
//     if (report.severity === 'MINOR') newRiskScore += 10
//     if (report.severity === 'MAJOR') newRiskScore += 25
//     if (report.severity === 'BLOCKED') newRiskScore = 100
//     if (newRiskScore > 100) newRiskScore = 100

//     // Calculate new status
//     let newStatus: 'CLEAR' | 'AT_RISK' | 'BLOCKED' = 'CLEAR'
//     if (newRiskScore >= 40 && newRiskScore < 70) newStatus = 'AT_RISK'
//     if (newRiskScore >= 70) newStatus = 'BLOCKED'

//     // Update road
//     await prisma.road.update({
//       where: { id: road.id },
//       data: { riskScore: newRiskScore, status: newStatus }
//     })

//     // Find affected district
//     const district = await prisma.district.findFirst({
//       where: { primaryRoadId: road.id }
//     })

//     if (district) {
//       // Calculate drain rate for predictive engine
//       let drainRate = 1
//       if (newStatus === 'AT_RISK') drainRate = 1.5
//       if (newStatus === 'BLOCKED') drainRate = 2.5

//       const daysToStockout = district.supplyDaysRemaining / drainRate
//       const newSupply = newRiskScore >= 70
//         ? district.supplyDaysRemaining * 0.8
//         : district.supplyDaysRemaining

//       await prisma.district.update({
//         where: { id: district.id },
//         data: {
//           supplyDaysRemaining: newSupply,
//           drainRate: drainRate,
//           daysToStockout: daysToStockout
//         }
//       })

//       // Fire alert if high risk
//       if (newRiskScore >= 70 && road.riskScore < 70) {
//         await prisma.alert.create({
//           data: {
//             roadId: road.id,
//             districtId: district.id,
//             message: `⚠️ APPROVED: ${road.name} is BLOCKED — ${district.name} stockout predicted in ${daysToStockout.toFixed(1)} days. Alternate route recommended.`
//           }
//         })
//       }
//     }

//     return NextResponse.json({ success: true })
//   }

//   return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
// }

// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params
//   const { action } = await req.json()

//   const report = await prisma.report.findUnique({
//     where: { id },
//     include: { road: true }
//   })

//   if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 })

//   if (action === 'REJECT') {
//     await prisma.report.update({
//       where: { id },
//       data: { status: 'REJECTED' }
//     })
//     return NextResponse.json({ success: true })
//   }

//   if (action === 'APPROVE') {
//     await prisma.report.update({
//       where: { id },
//       data: { status: 'APPROVED' }
//     })

//     const road = report.road
//     let newRiskScore = road.riskScore
//     if (report.severity === 'MINOR') newRiskScore += 10
//     if (report.severity === 'MAJOR') newRiskScore += 25
//     if (report.severity === 'BLOCKED') newRiskScore = 100
//     if (newRiskScore > 100) newRiskScore = 100

//     let newStatus: 'CLEAR' | 'AT_RISK' | 'BLOCKED' = 'CLEAR'
//     if (newRiskScore >= 40 && newRiskScore < 70) newStatus = 'AT_RISK'
//     if (newRiskScore >= 70) newStatus = 'BLOCKED'

//     await prisma.road.update({
//       where: { id: road.id },
//       data: { riskScore: newRiskScore, status: newStatus }
//     })

//     const district = await prisma.district.findFirst({
//       where: { primaryRoadId: road.id }
//     })

//     if (district) {
//       let drainRate = 1
//       if (newStatus === 'AT_RISK') drainRate = 1.5
//       if (newStatus === 'BLOCKED') drainRate = 2.5

//       const newSupply = newRiskScore >= 70
//         ? district.supplyDaysRemaining * 0.8
//         : district.supplyDaysRemaining

//       const daysToStockout = newSupply / drainRate

//       await prisma.district.update({
//         where: { id: district.id },
//         data: {
//           supplyDaysRemaining: newSupply,
//           drainRate,
//           daysToStockout
//         }
//       })

//       if (newRiskScore >= 70) {
//         const alternateRoad = road.alternateRouteId
//           ? await prisma.road.findUnique({ where: { id: road.alternateRouteId } })
//           : null

//         await prisma.alert.create({
//           data: {
//             roadId: road.id,
//             districtId: district.id,
//             message: `⚠️ APPROVED: ${road.name} is ${newStatus} — ${district.name} stockout in ${daysToStockout.toFixed(1)} days.${alternateRoad ? ` Alternate: ${alternateRoad.name}` : ''}`
//           }
//         })
//       }
//     }

//     return NextResponse.json({ success: true })
//   }

//   return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
// }

// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params
//   await prisma.road.update({
//     where: { id },
//     data: { riskScore: 0, status: 'CLEAR' }
//   })
//   const district = await prisma.district.findFirst({ where: { primaryRoadId: id } })
//   if (district) {
//     await prisma.district.update({
//       where: { id: district.id },
//       data: { drainRate: 1, daysToStockout: district.supplyDaysRemaining }
//     })
//   }
//   return NextResponse.json({ success: true })
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { action } = await req.json()

  const report = await prisma.report.findUnique({
    where: { id },
    include: { road: true }
  })
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Mark report as APPROVED or REJECTED — this is what makes it disappear from pending
  await prisma.report.update({
    where: { id },
    data: { status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
  })

  if (action === 'APPROVE') {
    // Map severity → road status + risk
    let newStatus: 'AT_RISK' | 'BLOCKED' = 'AT_RISK'
    let newRiskScore = 30
    let reroutingActive = false

    if (report.severity === 'BLOCKED') {
      newStatus = 'BLOCKED'
      newRiskScore = 100
      // Only activate rerouting if this road actually has an alternate configured
      reroutingActive = report.road.alternateRouteId !== null
    } else if (report.severity === 'MAJOR') {
      newStatus = 'AT_RISK'
      newRiskScore = 70
    } else {
      // MINOR
      newStatus = 'AT_RISK'
      newRiskScore = 30
    }

    await prisma.road.update({
      where: { id: report.roadId },
      data: {
        status: newStatus,
        riskScore: newRiskScore,
        reroutingActive
      }
    })

    // Update the district linked to this road
    const district = await prisma.district.findFirst({
      where: { primaryRoadId: report.roadId }
    })

    if (district) {
      const drainRate =
        newStatus === 'BLOCKED' ? 2.5 :
        newStatus === 'AT_RISK'  ? 1.5 : 1

      const daysToStockout = district.supplyDaysRemaining / drainRate

      await prisma.district.update({
        where: { id: district.id },
        data: { drainRate, daysToStockout }
      })

      await prisma.alert.create({
        data: {
          roadId: report.roadId,
          districtId: district.id,
          message: `${report.road.name} is now ${newStatus}. Drain rate ${drainRate}x — ${district.name} estimated stockout in ${daysToStockout.toFixed(1)} days.`
        }
      })
    }
  }

  return NextResponse.json({ success: true })
}