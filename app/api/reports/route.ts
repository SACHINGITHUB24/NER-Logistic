// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function POST(req: Request) {
//   const { roadId, severity, description } = await req.json()

//   const road = await prisma.road.findUnique({ where: { id: roadId } })
//   if (!road) return NextResponse.json({ error: 'Road not found' }, { status: 404 })

//   // Calculate new risk score
//   let newRiskScore = road.riskScore
//   if (severity === 'MINOR') newRiskScore += 10
//   if (severity === 'MAJOR') newRiskScore += 25
//   if (severity === 'BLOCKED') newRiskScore = 100
//   if (newRiskScore > 100) newRiskScore = 100

//   // Calculate new status
//   let newStatus: 'CLEAR' | 'AT_RISK' | 'BLOCKED' = 'CLEAR'
//   if (newRiskScore >= 40 && newRiskScore < 70) newStatus = 'AT_RISK'
//   if (newRiskScore >= 70) newStatus = 'BLOCKED'

//   // Update road
//   await prisma.road.update({
//     where: { id: roadId },
//     data: { riskScore: newRiskScore, status: newStatus }
//   })

//   // Save report
//   await prisma.report.create({
//     data: { roadId, severity, description }
//   })

//   // If high risk — fire alert and drain supply
//   if (newRiskScore >= 70 && road.riskScore < 70) {
//     const district = await prisma.district.findFirst({
//       where: { primaryRoadId: roadId }
//     })

//     if (district) {
//       const newSupply = district.supplyDaysRemaining * 0.8

//       await prisma.district.update({
//         where: { id: district.id },
//         data: { supplyDaysRemaining: newSupply }
//       })

//       await prisma.alert.create({
//         data: {
//           roadId,
//           districtId: district.id,
//           message: `High risk detected on ${road.name} — ${district.name} supply impacted. ${newSupply.toFixed(1)} days remaining.`
//         }
//       })
//     }
//   }

//   return NextResponse.json({ success: true })
// }

// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function POST(req: Request) {
//   const { roadId, severity, description } = await req.json()

//   const road = await prisma.road.findUnique({ where: { id: roadId } })
//   if (!road) return NextResponse.json({ error: 'Road not found' }, { status: 404 })

//   const report = await prisma.report.create({
//     data: { roadId, severity, description, status: 'PENDING' }
//   })

//   return NextResponse.json({ success: true, report })
// }

// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// // import { authOptions } from '@/lib/auth'
// import { auth as authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions)
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { roadId, severity, description, imageUrl } = await req.json()

//   const report = await prisma.report.create({
//     data: {
//       roadId,
//       severity,
//       description,
//       imageUrl: imageUrl || null,
//       status: 'PENDING'
//     }
//   })

//   return NextResponse.json(report)
// }

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { roadId, severity, description, imageUrl } = await req.json()

  const report = await prisma.report.create({
    data: {
      roadId,
      severity,
      description,
      imageUrl: imageUrl || null,
      status: 'PENDING'
    }
  })

  return NextResponse.json(report)
}