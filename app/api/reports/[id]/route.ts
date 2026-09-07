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
//   if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })

//   // Mark report as APPROVED or REJECTED — this is what makes it disappear from pending
//   await prisma.report.update({
//     where: { id },
//     data: { status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
//   })

//   if (action === 'APPROVE') {
//     // Map severity → road status + risk
//     let newStatus: 'AT_RISK' | 'BLOCKED' = 'AT_RISK'
//     let newRiskScore = 30
//     let reroutingActive = false

//     if (report.severity === 'BLOCKED') {
//       newStatus = 'BLOCKED'
//       newRiskScore = 100
//       // Only activate rerouting if this road actually has an alternate configured
//       reroutingActive = report.road.alternateRouteId !== null
//     } else if (report.severity === 'MAJOR') {
//       newStatus = 'AT_RISK'
//       newRiskScore = 70
//     } else {
//       // MINOR
//       newStatus = 'AT_RISK'
//       newRiskScore = 30
//     }

//     await prisma.road.update({
//       where: { id: report.roadId },
//       data: {
//         status: newStatus,
//         riskScore: newRiskScore,
//         reroutingActive
//       }
//     })

//     // Update the district linked to this road
//     const district = await prisma.district.findFirst({
//       where: { primaryRoadId: report.roadId }
//     })

//     if (district) {
//       const drainRate =
//         newStatus === 'BLOCKED' ? 2.5 :
//         newStatus === 'AT_RISK'  ? 1.5 : 1

//       const daysToStockout = district.supplyDaysRemaining / drainRate

//       await prisma.district.update({
//         where: { id: district.id },
//         data: { drainRate, daysToStockout }
//       })

//       await prisma.alert.create({
//         data: {
//           roadId: report.roadId,
//           districtId: district.id,
//           message: `${report.road.name} is now ${newStatus}. Drain rate ${drainRate}x — ${district.name} estimated stockout in ${daysToStockout.toFixed(1)} days.`
//         }
//       })
//     }
//   }

//   return NextResponse.json({ success: true })
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

//   if (!report) {
//     return NextResponse.json(
//       { error: 'Report not found' },
//       { status: 404 }
//     )
//   }

//   // Reject report
//   if (action === 'REJECT') {
//     await prisma.report.update({
//       where: { id },
//       data: { status: 'REJECTED' }
//     })

//     return NextResponse.json({ success: true })
//   }

//   // Approve report
//   if (action === 'APPROVE') {
//     await prisma.report.update({
//       where: { id },
//       data: { status: 'APPROVED' }
//     })

//     const road = report.road

//     let newStatus: 'AT_RISK' | 'BLOCKED' = 'AT_RISK'
//     let newRiskScore = 30

//     if (report.severity === 'BLOCKED') {
//       newStatus = 'BLOCKED'
//       newRiskScore = 100
//     } else if (report.severity === 'MAJOR') {
//       newStatus = 'AT_RISK'
//       newRiskScore = 70
//     } else {
//       newStatus = 'AT_RISK'
//       newRiskScore = 30
//     }

//     // Activate rerouting whenever an alternate route exists
//     const reroutingActive =
//       newStatus === 'BLOCKED' &&
//       road.alternateRouteId !== null

//     // Get alternate route information
//     const alternateRoad = road.alternateRouteId
//       ? await prisma.road.findUnique({
//           where: { id: road.alternateRouteId }
//         })
//       : null

//     // Update road
//     await prisma.road.update({
//       where: { id: road.id },
//       data: {
//         status: newStatus,
//         riskScore: newRiskScore,
//         reroutingActive
//       }
//     })

//     // Find affected district
//     const district = await prisma.district.findFirst({
//       where: {
//         primaryRoadId: road.id
//       }
//     })

//     let daysToStockout: number | null = null

//     if (district) {
//       const drainRate =
//         newStatus === 'BLOCKED'
//           ? 2.5
//           : 1.5

//       daysToStockout =
//         district.supplyDaysRemaining / drainRate

//       await prisma.district.update({
//         where: { id: district.id },
//         data: {
//           drainRate,
//           daysToStockout
//         }
//       })
//     }

//     // --------------------------------------------------
//     // CREATE LIVE ALERT
//     // --------------------------------------------------

//     if (district) {
//       let message = ''

//       if (newStatus === 'BLOCKED') {
//         message = `🔴 ROAD BLOCKED: ${road.name}`

//         if (reroutingActive && alternateRoad) {
//           message += ` — 🔀 Rerouting activated via ${alternateRoad.name}`
//         }

//         if (daysToStockout !== null) {
//           message += ` — ${district.name} stockout estimated in ${daysToStockout.toFixed(1)} days`
//         }
//       } else {
//         message = `⚠️ ROAD AT RISK: ${road.name}`

//         if (alternateRoad) {
//           message += ` — Alternate route available: ${alternateRoad.name}`
//         }
//       }

//       await prisma.alert.create({
//         data: {
//           roadId: road.id,
//           districtId: district.id,
//           message
//         }
//       })
//     }

//     return NextResponse.json({
//       success: true,
//       road: {
//         id: road.id,
//         status: newStatus,
//         riskScore: newRiskScore,
//         reroutingActive
//       },
//       alertCreated: !!district
//     })
//   }

//   return NextResponse.json(
//     { error: 'Invalid action' },
//     { status: 400 }
//   )
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { action } = await req.json()

    const report = await prisma.report.findUnique({
      where: { id },
      include: { road: true }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // -----------------------------
    // REJECT
    // -----------------------------
    if (action === 'REJECT') {
      await prisma.report.update({
        where: { id },
        data: { status: 'REJECTED' }
      })

      return NextResponse.json({
        success: true,
        message: 'Report rejected'
      })
    }

    // -----------------------------
    // APPROVE
    // -----------------------------
    if (action !== 'APPROVE') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Mark report approved
    await prisma.report.update({
      where: { id },
      data: { status: 'APPROVED' }
    })

    const road = report.road

    // -----------------------------
    // DETERMINE ROAD STATE
    // -----------------------------
    let newStatus: 'AT_RISK' | 'BLOCKED'
    let newRiskScore: number

    if (report.severity === 'BLOCKED') {
      newStatus = 'BLOCKED'
      newRiskScore = 100
    } else if (report.severity === 'MAJOR') {
      newStatus = 'AT_RISK'
      newRiskScore = 70
    } else {
      newStatus = 'AT_RISK'
      newRiskScore = 30
    }

    // -----------------------------
    // FIND ALTERNATE ROUTE
    // -----------------------------
    const alternateRoad = road.alternateRouteId
      ? await prisma.road.findUnique({
          where: {
            id: road.alternateRouteId
          }
        })
      : null

    const reroutingActive =
      newStatus === 'BLOCKED' &&
      alternateRoad !== null

    // -----------------------------
    // UPDATE ROAD
    // -----------------------------
    await prisma.road.update({
      where: {
        id: road.id
      },
      data: {
        status: newStatus,
        riskScore: newRiskScore,
        reroutingActive
      }
    })

    // -----------------------------
    // FIND DISTRICT
    // -----------------------------
    const district = await prisma.district.findFirst({
      where: {
        primaryRoadId: road.id
      }
    })

    let daysToStockout: number | null = null

    if (district) {
      const drainRate =
        newStatus === 'BLOCKED'
          ? 2.5
          : 1.5

      daysToStockout =
        district.supplyDaysRemaining / drainRate

      await prisma.district.update({
        where: {
          id: district.id
        },
        data: {
          drainRate,
          daysToStockout
        }
      })
    }

    // -----------------------------
    // CREATE LIVE ALERT
    // -----------------------------
    //
    // IMPORTANT:
    // Only create an Alert when we have
    // a district because Alert.districtId
    // is required by Prisma.
    //
    if (district) {
      let message = ''

      if (newStatus === 'BLOCKED') {

        if (reroutingActive && alternateRoad) {
          message =
            `🔴 ${road.name} is BLOCKED. ` +
            `🔀 LIVE REROUTING ACTIVE via ${alternateRoad.name}.`
        } else {
          message =
            `🔴 ${road.name} is BLOCKED. ` +
            `⚠️ No alternate route available.`
        }

      } else {

        message =
          `⚠️ ${road.name} is AT RISK. ` +
          `Risk score: ${newRiskScore}.`

        if (alternateRoad) {
          message +=
            ` Alternate route: ${alternateRoad.name}.`
        }
      }

      if (daysToStockout !== null) {
        message +=
          ` ${district.name} estimated stockout in ` +
          `${daysToStockout.toFixed(1)} days.`
      }

      await prisma.alert.create({
        data: {
          roadId: road.id,
          districtId: district.id,
          message
        }
      })
    }

    return NextResponse.json({
      success: true,

      road: {
        id: road.id,
        name: road.name,
        status: newStatus,
        riskScore: newRiskScore,
        reroutingActive
      },

      rerouting: {
        active: reroutingActive,
        alternateRoad: alternateRoad
          ? {
              id: alternateRoad.id,
              name: alternateRoad.name
            }
          : null
      },

      alertCreated: Boolean(district)
    })

  } catch (error) {
    console.error('REPORT APPROVAL ERROR:', error)

    return NextResponse.json(
      {
        error: 'Failed to process report',
        details:
          error instanceof Error
            ? error.message
            : 'Unknown error'
      },
      { status: 500 }
    )
  }
}