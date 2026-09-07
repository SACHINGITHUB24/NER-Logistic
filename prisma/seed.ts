// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'

// const prisma = new PrismaClient()

// async function main() {
//   // Clear existing data
//   await prisma.alert.deleteMany()
//   await prisma.report.deleteMany()
//   await prisma.road.deleteMany()
//   await prisma.district.deleteMany()
//   await prisma.user.deleteMany()

//   // Create Roads
//   const road1 = await prisma.road.create({ data: { name: 'Guwahati-Shillong Highway', fromDistrict: 'Guwahati', toDistrict: 'Shillong', riskScore: 20, status: 'CLEAR', geometry: { type: 'LineString', coordinates: [[91.73, 26.14], [91.88, 25.57]] } } })
//   const road2 = await prisma.road.create({ data: { name: 'Imphal-Kohima Road', fromDistrict: 'Imphal', toDistrict: 'Kohima', riskScore: 65, status: 'AT_RISK', geometry: { type: 'LineString', coordinates: [[93.95, 24.82], [94.11, 25.67]] } } })
//   const road3 = await prisma.road.create({ data: { name: 'Silchar-Jiribam Road', fromDistrict: 'Silchar', toDistrict: 'Jiribam', riskScore: 80, status: 'BLOCKED', geometry: { type: 'LineString', coordinates: [[92.79, 24.82], [93.12, 24.80]] } } })
//   const road4 = await prisma.road.create({ data: { name: 'Dimapur-Kohima Road', fromDistrict: 'Dimapur', toDistrict: 'Kohima', riskScore: 30, status: 'CLEAR', geometry: { type: 'LineString', coordinates: [[93.72, 25.90], [94.11, 25.67]] } } })
//   const road5 = await prisma.road.create({ data: { name: 'Itanagar-Naharlagun Road', fromDistrict: 'Itanagar', toDistrict: 'Naharlagun', riskScore: 45, status: 'AT_RISK', geometry: { type: 'LineString', coordinates: [[93.62, 27.08], [93.70, 27.10]] } } })
//   const road6 = await prisma.road.create({ data: { name: 'Aizawl-Lunglei Road', fromDistrict: 'Aizawl', toDistrict: 'Lunglei', riskScore: 15, status: 'CLEAR', geometry: { type: 'LineString', coordinates: [[92.71, 23.73], [92.73, 22.88]] } } })

//   // Set alternate routes
//   await prisma.road.update({ where: { id: road3.id }, data: { alternateRouteId: road2.id } })
//   await prisma.road.update({ where: { id: road2.id }, data: { alternateRouteId: road4.id } })

//   // Create Districts
//   const district1 = await prisma.district.create({ data: { name: 'Guwahati', lat: 26.14, lng: 91.73, supplyDaysRemaining: 30, primaryRoadId: road1.id } })
//   const district2 = await prisma.district.create({ data: { name: 'Imphal', lat: 24.82, lng: 93.95, supplyDaysRemaining: 12, primaryRoadId: road2.id } })
//   const district3 = await prisma.district.create({ data: { name: 'Shillong', lat: 25.57, lng: 91.88, supplyDaysRemaining: 28, primaryRoadId: road1.id } })
//   const district4 = await prisma.district.create({ data: { name: 'Kohima', lat: 25.67, lng: 94.11, supplyDaysRemaining: 4, primaryRoadId: road2.id } })
//   const district5 = await prisma.district.create({ data: { name: 'Aizawl', lat: 23.73, lng: 92.71, supplyDaysRemaining: 22, primaryRoadId: road6.id } })

//   // Create test alerts for Kohima (critical)
//   await prisma.alert.create({ data: { roadId: road2.id, districtId: district4.id, message: 'High risk detected on Imphal-Kohima Road — Kohima supply critically low (4 days remaining). Alternate: Dimapur-Kohima Road', createdAt: new Date() } })
//   await prisma.alert.create({ data: { roadId: road3.id, districtId: district2.id, message: 'BLOCKED: Silchar-Jiribam Road — Imphal supply impacted. Alternate route suggested: Imphal-Kohima Road', createdAt: new Date(Date.now() - 300000) } })

//   // Create Users
//   const hashedCitizen = await bcrypt.hash('test1234', 10)
//   const hashedOfficial = await bcrypt.hash('test1234', 10)

//   await prisma.user.create({ data: { email: 'citizen@ner.gov', password: hashedCitizen, role: 'CITIZEN' } })
//   await prisma.user.create({ data: { email: 'official@ner.gov', password: hashedOfficial, role: 'OFFICIAL' } })

//   console.log('✅ Seed complete!')
// }

// main().catch(console.error).finally(() => prisma.$disconnect())



// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'

// const prisma = new PrismaClient()

// async function main() {
//   // Clear existing data
//   await prisma.alert.deleteMany()
//   await prisma.report.deleteMany()
//   await prisma.road.deleteMany()
//   await prisma.district.deleteMany()
//   await prisma.user.deleteMany()

//   // Create Roads WITHOUT alternates first
//   const road1 = await prisma.road.create({
//     data: {
//       name: 'Guwahati-Shillong Highway',
//       fromDistrict: 'Guwahati', toDistrict: 'Shillong',
//       riskScore: 80, status: 'BLOCKED',
//       geometry: { type: 'LineString', coordinates: [[91.73, 26.14], [91.88, 25.57]] }
//     }
//   })

//   const road2 = await prisma.road.create({
//     data: {
//       name: 'Imphal-Kohima Road',
//       fromDistrict: 'Imphal', toDistrict: 'Kohima',
//       riskScore: 75, status: 'BLOCKED',
//       geometry: { type: 'LineString', coordinates: [[93.95, 24.82], [94.11, 25.67]] }
//     }
//   })

//   const road3 = await prisma.road.create({
//     data: {
//       name: 'Silchar-Jiribam Road',
//       fromDistrict: 'Silchar', toDistrict: 'Jiribam',
//       riskScore: 80, status: 'BLOCKED',
//       geometry: { type: 'LineString', coordinates: [[92.79, 24.82], [93.12, 24.80]] }
//     }
//   })

//   const road4 = await prisma.road.create({
//     data: {
//       name: 'Dimapur-Kohima Road',
//       fromDistrict: 'Dimapur', toDistrict: 'Kohima',
//       riskScore: 25, status: 'CLEAR',
//       geometry: { type: 'LineString', coordinates: [[93.72, 25.90], [94.11, 25.67]] }
//     }
//   })

//   const road5 = await prisma.road.create({
//     data: {
//       name: 'Itanagar-Naharlagun Road',
//       fromDistrict: 'Itanagar', toDistrict: 'Naharlagun',
//       riskScore: 45, status: 'AT_RISK',
//       geometry: { type: 'LineString', coordinates: [[93.62, 27.08], [93.70, 27.10]] }
//     }
//   })

//   const road6 = await prisma.road.create({
//     data: {
//       name: 'Aizawl-Lunglei Road',
//       fromDistrict: 'Aizawl', toDistrict: 'Lunglei',
//       riskScore: 15, status: 'CLEAR',
//       geometry: { type: 'LineString', coordinates: [[92.71, 23.73], [92.73, 22.88]] }
//     }
//   })

//   const road7 = await prisma.road.create({
//     data: {
//       name: 'NH-27 Assam-Meghalaya Link',
//       fromDistrict: 'Guwahati', toDistrict: 'Shillong',
//       riskScore: 20, status: 'CLEAR',
//       geometry: { type: 'LineString', coordinates: [[91.73, 26.14], [91.60, 25.90], [91.88, 25.57]] }
//     }
//   })

//   const road8 = await prisma.road.create({
//     data: {
//       name: 'Jiribam-Imphal Alternate',
//       fromDistrict: 'Jiribam', toDistrict: 'Imphal',
//       riskScore: 30, status: 'CLEAR',
//       geometry: { type: 'LineString', coordinates: [[93.12, 24.80], [93.50, 24.81], [93.95, 24.82]] }
//     }
//   })

//   const road9 = await prisma.road.create({
//     data: {
//       name: 'Naharlagun-Itanagar Bypass',
//       fromDistrict: 'Naharlagun', toDistrict: 'Itanagar',
//       riskScore: 20, status: 'CLEAR',
//       geometry: { type: 'LineString', coordinates: [[93.70, 27.10], [93.65, 27.09], [93.62, 27.08]] }
//     }
//   })

//   // Set ALL alternate routes
//   // road1 (Guwahati-Shillong BLOCKED) → road7 (NH-27 alternate, CLEAR)
//   await prisma.road.update({ where: { id: road1.id }, data: { alternateRouteId: road7.id } })

//   // road2 (Imphal-Kohima BLOCKED) → road4 (Dimapur-Kohima, CLEAR)
//   await prisma.road.update({ where: { id: road2.id }, data: { alternateRouteId: road4.id } })

//   // road3 (Silchar-Jiribam BLOCKED) → road8 (Jiribam-Imphal Alternate, CLEAR)
//   await prisma.road.update({ where: { id: road3.id }, data: { alternateRouteId: road8.id } })

//   // road5 (Itanagar-Naharlagun AT_RISK) → road9 (Bypass, CLEAR)
//   await prisma.road.update({ where: { id: road5.id }, data: { alternateRouteId: road9.id } })

//   // Create Districts with realistic drain rates
//   const district1 = await prisma.district.create({
//     data: {
//       name: 'Guwahati', lat: 26.14, lng: 91.73,
//       supplyDaysRemaining: 24,
//       drainRate: 2.5,
//       daysToStockout: 9.6,
//       primaryRoadId: road1.id
//     }
//   })

//   const district2 = await prisma.district.create({
//     data: {
//       name: 'Imphal', lat: 24.82, lng: 93.95,
//       supplyDaysRemaining: 12,
//       drainRate: 2.5,
//       daysToStockout: 4.8,
//       primaryRoadId: road2.id
//     }
//   })

//   const district3 = await prisma.district.create({
//     data: {
//       name: 'Shillong', lat: 25.57, lng: 91.88,
//       supplyDaysRemaining: 28,
//       drainRate: 1,
//       daysToStockout: 28,
//       primaryRoadId: road7.id
//     }
//   })

//   const district4 = await prisma.district.create({
//     data: {
//       name: 'Kohima', lat: 25.67, lng: 94.11,
//       supplyDaysRemaining: 4,
//       drainRate: 2.5,
//       daysToStockout: 1.6,
//       primaryRoadId: road2.id
//     }
//   })

//   const district5 = await prisma.district.create({
//     data: {
//       name: 'Aizawl', lat: 23.73, lng: 92.71,
//       supplyDaysRemaining: 22,
//       drainRate: 1,
//       daysToStockout: 22,
//       primaryRoadId: road6.id
//     }
//   })

//   const district6 = await prisma.district.create({
//     data: {
//       name: 'Itanagar', lat: 27.08, lng: 93.62,
//       supplyDaysRemaining: 18,
//       drainRate: 1.5,
//       daysToStockout: 12,
//       primaryRoadId: road5.id
//     }
//   })

//   // Create alerts matching blocked roads
//   await prisma.alert.create({
//     data: {
//       roadId: road1.id, districtId: district1.id,
//       message: '⚠️ BLOCKED: Guwahati-Shillong Highway — Guwahati stockout in 9.6 days. Alternate: NH-27 Assam-Meghalaya Link',
//       createdAt: new Date()
//     }
//   })

//   await prisma.alert.create({
//     data: {
//       roadId: road2.id, districtId: district4.id,
//       message: '🔴 CRITICAL: Imphal-Kohima Road BLOCKED — Kohima stockout in 1.6 days. Alternate: Dimapur-Kohima Road',
//       createdAt: new Date(Date.now() - 300000)
//     }
//   })

//   await prisma.alert.create({
//     data: {
//       roadId: road3.id, districtId: district2.id,
//       message: '⚠️ BLOCKED: Silchar-Jiribam Road — Imphal supply impacted. Alternate: Jiribam-Imphal Alternate',
//       createdAt: new Date(Date.now() - 600000)
//     }
//   })

//   // Create Users
//   const hashedCitizen = await bcrypt.hash('test1234', 10)
//   const hashedOfficial = await bcrypt.hash('test1234', 10)

//   await prisma.user.create({ data: { email: 'citizen@ner.gov', password: hashedCitizen, role: 'CITIZEN' } })
//   await prisma.user.create({ data: { email: 'official@ner.gov', password: hashedOfficial, role: 'OFFICIAL' } })

//   console.log('✅ Seed complete! Roads, districts, alternates, alerts all set.')
// }

// main().catch(console.error).finally(() => prisma.$disconnect())




import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.alert.deleteMany()
  await prisma.report.deleteMany()
  await prisma.road.deleteMany()
  await prisma.district.deleteMany()
  await prisma.user.deleteMany()

  // ── ROADS ──────────────────────────────────────────
  // Each blocked road's alternate must share the SAME
  // fromDistrict and toDistrict, just via a different path

  // 1. BLOCKED: Guwahati → Shillong (direct)
  const road1 = await prisma.road.create({
    data: {
      name: 'Guwahati-Shillong Highway (NH-6)',
      fromDistrict: 'Guwahati', toDistrict: 'Shillong',
      riskScore: 80, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [
        [91.73, 26.14],
        [91.88, 25.57]
      ]}
    }
  })

  // 1-ALT: Guwahati → Shillong via NH-27 (same start, same end)
  const road1alt = await prisma.road.create({
    data: {
      name: 'Guwahati-Shillong via NH-27 (Alternate)',
      fromDistrict: 'Guwahati', toDistrict: 'Shillong',
      riskScore: 20, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [91.73, 26.14],  // Guwahati (same start)
        [91.60, 25.90],  // via Jorabat
        [91.72, 25.70],  // via Nongpoh
        [91.88, 25.57]   // Shillong (same end)
      ]}
    }
  })

  // 2. BLOCKED: Imphal → Kohima (direct)
  const road2 = await prisma.road.create({
    data: {
      name: 'Imphal-Kohima Road (NH-2)',
      fromDistrict: 'Imphal', toDistrict: 'Kohima',
      riskScore: 75, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [
        [93.95, 24.82],
        [94.11, 25.67]
      ]}
    }
  })

  // 2-ALT: Imphal → Kohima via Dimapur (same start, same end)
  const road2alt = await prisma.road.create({
    data: {
      name: 'Imphal-Dimapur-Kohima Alternate (NH-29)',
      fromDistrict: 'Imphal', toDistrict: 'Kohima',
      riskScore: 28, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [93.95, 24.82],  // Imphal (same start)
        [93.72, 25.90],  // via Dimapur
        [94.11, 25.67]   // Kohima (same end)
      ]}
    }
  })

  // 3. BLOCKED: Silchar → Imphal (direct)
  const road3 = await prisma.road.create({
    data: {
      name: 'Silchar-Jiribam-Imphal Road (NH-37)',
      fromDistrict: 'Silchar', toDistrict: 'Imphal',
      riskScore: 80, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [
        [92.79, 24.82],
        [93.12, 24.80],
        [93.95, 24.82]
      ]}
    }
  })

  // 3-ALT: Silchar → Imphal via Aizawl (same start, same end)
  const road3alt = await prisma.road.create({
    data: {
      name: 'Silchar-Aizawl-Imphal Alternate',
      fromDistrict: 'Silchar', toDistrict: 'Imphal',
      riskScore: 35, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [92.79, 24.82],  // Silchar (same start)
        [92.71, 23.73],  // via Aizawl
        [93.50, 24.20],  // via Champhai
        [93.95, 24.82]   // Imphal (same end)
      ]}
    }
  })

  // 4. AT_RISK: Itanagar → Naharlagun
  const road4 = await prisma.road.create({
    data: {
      name: 'Itanagar-Naharlagun Road',
      fromDistrict: 'Itanagar', toDistrict: 'Naharlagun',
      riskScore: 45, status: 'AT_RISK',
      geometry: { type: 'LineString', coordinates: [
        [93.62, 27.08],
        [93.70, 27.10]
      ]}
    }
  })

  // 4-ALT: Itanagar → Naharlagun bypass
  const road4alt = await prisma.road.create({
    data: {
      name: 'Itanagar-Naharlagun Bypass',
      fromDistrict: 'Itanagar', toDistrict: 'Naharlagun',
      riskScore: 18, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [93.62, 27.08],  // Itanagar (same start)
        [93.65, 27.09],  // bypass loop
        [93.70, 27.10]   // Naharlagun (same end)
      ]}
    }
  })

  // 5. CLEAR: Aizawl → Lunglei
  const road5 = await prisma.road.create({
    data: {
      name: 'Aizawl-Lunglei Road (NH-54)',
      fromDistrict: 'Aizawl', toDistrict: 'Lunglei',
      riskScore: 15, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [92.71, 23.73],
        [92.73, 22.88]
      ]}
    }
  })

  // 6. NEW — AT_RISK: Agartala → Silchar
  const road6 = await prisma.road.create({
    data: {
      name: 'Agartala-Silchar Road (NH-8)',
      fromDistrict: 'Agartala', toDistrict: 'Silchar',
      riskScore: 55, status: 'AT_RISK',
      geometry: { type: 'LineString', coordinates: [
        [91.28, 23.83],
        [91.80, 24.20],
        [92.79, 24.82]
      ]}
    }
  })

  // 6-ALT: Agartala → Silchar via Sabroom
  const road6alt = await prisma.road.create({
    data: {
      name: 'Agartala-Sabroom-Silchar Alternate',
      fromDistrict: 'Agartala', toDistrict: 'Silchar',
      riskScore: 22, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [91.28, 23.83],  // Agartala (same start)
        [91.35, 23.40],  // via Sabroom
        [92.10, 24.00],  // via Dharmanagar
        [92.79, 24.82]   // Silchar (same end)
      ]}
    }
  })

  // 7. NEW — BLOCKED: Dimapur → Kohima
  const road7 = await prisma.road.create({
    data: {
      name: 'Dimapur-Kohima NH-29 (Direct)',
      fromDistrict: 'Dimapur', toDistrict: 'Kohima',
      riskScore: 78, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [
        [93.72, 25.90],
        [94.11, 25.67]
      ]}
    }
  })

  // 7-ALT: Dimapur → Kohima via Medziphema
  const road7alt = await prisma.road.create({
    data: {
      name: 'Dimapur-Medziphema-Kohima Alternate',
      fromDistrict: 'Dimapur', toDistrict: 'Kohima',
      riskScore: 22, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [93.72, 25.90],  // Dimapur (same start)
        [93.85, 25.80],  // via Medziphema
        [94.00, 25.72],  // via Zubza
        [94.11, 25.67]   // Kohima (same end)
      ]}
    }
  })

  // 8. NEW — CLEAR: Shillong → Agartala
  const road8 = await prisma.road.create({
    data: {
      name: 'Shillong-Agartala Road (NH-44)',
      fromDistrict: 'Shillong', toDistrict: 'Agartala',
      riskScore: 18, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [
        [91.88, 25.57],
        [91.60, 24.80],
        [91.28, 23.83]
      ]}
    }
  })

  // ── SET ALTERNATES ──────────────────────────────────
  await prisma.road.update({ where: { id: road1.id }, data: { alternateRouteId: road1alt.id } })
  await prisma.road.update({ where: { id: road2.id }, data: { alternateRouteId: road2alt.id } })
  await prisma.road.update({ where: { id: road3.id }, data: { alternateRouteId: road3alt.id } })
  await prisma.road.update({ where: { id: road4.id }, data: { alternateRouteId: road4alt.id } })
  await prisma.road.update({ where: { id: road6.id }, data: { alternateRouteId: road6alt.id } })
  await prisma.road.update({ where: { id: road7.id }, data: { alternateRouteId: road7alt.id } })

  // ── DISTRICTS ───────────────────────────────────────
  await prisma.district.create({ data: {
    name: 'Guwahati', lat: 26.14, lng: 91.73,
    supplyDaysRemaining: 24, drainRate: 2.5, daysToStockout: 9.6,
    primaryRoadId: road1.id
  }})

  await prisma.district.create({ data: {
    name: 'Imphal', lat: 24.82, lng: 93.95,
    supplyDaysRemaining: 12, drainRate: 2.5, daysToStockout: 4.8,
    primaryRoadId: road2.id
  }})

  await prisma.district.create({ data: {
    name: 'Shillong', lat: 25.57, lng: 91.88,
    supplyDaysRemaining: 28, drainRate: 1.0, daysToStockout: 28,
    primaryRoadId: road1alt.id
  }})

  await prisma.district.create({ data: {
    name: 'Kohima', lat: 25.67, lng: 94.11,
    supplyDaysRemaining: 4, drainRate: 2.5, daysToStockout: 1.6,
    primaryRoadId: road2.id
  }})

  await prisma.district.create({ data: {
    name: 'Aizawl', lat: 23.73, lng: 92.71,
    supplyDaysRemaining: 22, drainRate: 1.0, daysToStockout: 22,
    primaryRoadId: road5.id
  }})

  await prisma.district.create({ data: {
    name: 'Itanagar', lat: 27.08, lng: 93.62,
    supplyDaysRemaining: 18, drainRate: 1.5, daysToStockout: 12,
    primaryRoadId: road4.id
  }})

  // NEW districts
  await prisma.district.create({ data: {
    name: 'Agartala', lat: 23.83, lng: 91.28,
    supplyDaysRemaining: 9, drainRate: 2.0, daysToStockout: 4.5,
    primaryRoadId: road6.id
  }})

  await prisma.district.create({ data: {
    name: 'Dimapur', lat: 25.90, lng: 93.72,
    supplyDaysRemaining: 6, drainRate: 3.0, daysToStockout: 2.0,
    primaryRoadId: road7.id
  }})

  await prisma.district.create({ data: {
    name: 'Silchar', lat: 24.82, lng: 92.79,
    supplyDaysRemaining: 15, drainRate: 1.5, daysToStockout: 10,
    primaryRoadId: road3.id
  }})

  // ── ALERTS ──────────────────────────────────────────
  await prisma.alert.createMany({ data: [
    {
      roadId: road1.id,
      districtId: (await prisma.district.findFirst({ where: { name: 'Guwahati' } }))!.id,
      message: '⚠️ BLOCKED: Guwahati-Shillong NH-6 — Alternate via NH-27 activated',
      createdAt: new Date()
    },
    {
      roadId: road2.id,
      districtId: (await prisma.district.findFirst({ where: { name: 'Kohima' } }))!.id,
      message: '🔴 CRITICAL: Imphal-Kohima NH-2 BLOCKED — Kohima stockout in 1.6 days. Alternate via Dimapur activated',
      createdAt: new Date(Date.now() - 300000)
    },
    {
      roadId: road3.id,
      districtId: (await prisma.district.findFirst({ where: { name: 'Imphal' } }))!.id,
      message: '⚠️ BLOCKED: Silchar-Imphal NH-37 — Alternate via Aizawl activated',
      createdAt: new Date(Date.now() - 600000)
    },
    {
      roadId: road6.id,
      districtId: (await prisma.district.findFirst({ where: { name: 'Agartala' } }))!.id,
      message: '⚠️ AT RISK: Agartala-Silchar NH-8 — Agartala stockout in 4.5 days. Monitor closely',
      createdAt: new Date(Date.now() - 900000)
    },
    {
      roadId: road7.id,
      districtId: (await prisma.district.findFirst({ where: { name: 'Dimapur' } }))!.id,
      message: '🔴 CRITICAL: Dimapur-Kohima NH-29 BLOCKED — Dimapur stockout in 2 days. Alternate via Medziphema activated',
      createdAt: new Date(Date.now() - 1200000)
    },
  ]})

  // ── USERS ────────────────────────────────────────────
  const hashedPw = await bcrypt.hash('test1234', 10)
  await prisma.user.create({ data: { email: 'citizen@ner.gov', password: hashedPw, role: 'CITIZEN' } })
  await prisma.user.create({ data: { email: 'official@ner.gov', password: hashedPw, role: 'OFFICIAL' } })

  console.log('✅ Seed complete — 9 districts, 8 roads with correct rerouting, 5 alerts')
}

main().catch(console.error).finally(() => prisma.$disconnect())