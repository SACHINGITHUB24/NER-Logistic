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



import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.alert.deleteMany()
  await prisma.report.deleteMany()
  await prisma.road.deleteMany()
  await prisma.district.deleteMany()
  await prisma.user.deleteMany()

  // Create Roads WITHOUT alternates first
  const road1 = await prisma.road.create({
    data: {
      name: 'Guwahati-Shillong Highway',
      fromDistrict: 'Guwahati', toDistrict: 'Shillong',
      riskScore: 80, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [[91.73, 26.14], [91.88, 25.57]] }
    }
  })

  const road2 = await prisma.road.create({
    data: {
      name: 'Imphal-Kohima Road',
      fromDistrict: 'Imphal', toDistrict: 'Kohima',
      riskScore: 75, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [[93.95, 24.82], [94.11, 25.67]] }
    }
  })

  const road3 = await prisma.road.create({
    data: {
      name: 'Silchar-Jiribam Road',
      fromDistrict: 'Silchar', toDistrict: 'Jiribam',
      riskScore: 80, status: 'BLOCKED',
      geometry: { type: 'LineString', coordinates: [[92.79, 24.82], [93.12, 24.80]] }
    }
  })

  const road4 = await prisma.road.create({
    data: {
      name: 'Dimapur-Kohima Road',
      fromDistrict: 'Dimapur', toDistrict: 'Kohima',
      riskScore: 25, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [[93.72, 25.90], [94.11, 25.67]] }
    }
  })

  const road5 = await prisma.road.create({
    data: {
      name: 'Itanagar-Naharlagun Road',
      fromDistrict: 'Itanagar', toDistrict: 'Naharlagun',
      riskScore: 45, status: 'AT_RISK',
      geometry: { type: 'LineString', coordinates: [[93.62, 27.08], [93.70, 27.10]] }
    }
  })

  const road6 = await prisma.road.create({
    data: {
      name: 'Aizawl-Lunglei Road',
      fromDistrict: 'Aizawl', toDistrict: 'Lunglei',
      riskScore: 15, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [[92.71, 23.73], [92.73, 22.88]] }
    }
  })

  const road7 = await prisma.road.create({
    data: {
      name: 'NH-27 Assam-Meghalaya Link',
      fromDistrict: 'Guwahati', toDistrict: 'Shillong',
      riskScore: 20, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [[91.73, 26.14], [91.60, 25.90], [91.88, 25.57]] }
    }
  })

  const road8 = await prisma.road.create({
    data: {
      name: 'Jiribam-Imphal Alternate',
      fromDistrict: 'Jiribam', toDistrict: 'Imphal',
      riskScore: 30, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [[93.12, 24.80], [93.50, 24.81], [93.95, 24.82]] }
    }
  })

  const road9 = await prisma.road.create({
    data: {
      name: 'Naharlagun-Itanagar Bypass',
      fromDistrict: 'Naharlagun', toDistrict: 'Itanagar',
      riskScore: 20, status: 'CLEAR',
      geometry: { type: 'LineString', coordinates: [[93.70, 27.10], [93.65, 27.09], [93.62, 27.08]] }
    }
  })

  // Set ALL alternate routes
  // road1 (Guwahati-Shillong BLOCKED) → road7 (NH-27 alternate, CLEAR)
  await prisma.road.update({ where: { id: road1.id }, data: { alternateRouteId: road7.id } })

  // road2 (Imphal-Kohima BLOCKED) → road4 (Dimapur-Kohima, CLEAR)
  await prisma.road.update({ where: { id: road2.id }, data: { alternateRouteId: road4.id } })

  // road3 (Silchar-Jiribam BLOCKED) → road8 (Jiribam-Imphal Alternate, CLEAR)
  await prisma.road.update({ where: { id: road3.id }, data: { alternateRouteId: road8.id } })

  // road5 (Itanagar-Naharlagun AT_RISK) → road9 (Bypass, CLEAR)
  await prisma.road.update({ where: { id: road5.id }, data: { alternateRouteId: road9.id } })

  // Create Districts with realistic drain rates
  const district1 = await prisma.district.create({
    data: {
      name: 'Guwahati', lat: 26.14, lng: 91.73,
      supplyDaysRemaining: 24,
      drainRate: 2.5,
      daysToStockout: 9.6,
      primaryRoadId: road1.id
    }
  })

  const district2 = await prisma.district.create({
    data: {
      name: 'Imphal', lat: 24.82, lng: 93.95,
      supplyDaysRemaining: 12,
      drainRate: 2.5,
      daysToStockout: 4.8,
      primaryRoadId: road2.id
    }
  })

  const district3 = await prisma.district.create({
    data: {
      name: 'Shillong', lat: 25.57, lng: 91.88,
      supplyDaysRemaining: 28,
      drainRate: 1,
      daysToStockout: 28,
      primaryRoadId: road7.id
    }
  })

  const district4 = await prisma.district.create({
    data: {
      name: 'Kohima', lat: 25.67, lng: 94.11,
      supplyDaysRemaining: 4,
      drainRate: 2.5,
      daysToStockout: 1.6,
      primaryRoadId: road2.id
    }
  })

  const district5 = await prisma.district.create({
    data: {
      name: 'Aizawl', lat: 23.73, lng: 92.71,
      supplyDaysRemaining: 22,
      drainRate: 1,
      daysToStockout: 22,
      primaryRoadId: road6.id
    }
  })

  const district6 = await prisma.district.create({
    data: {
      name: 'Itanagar', lat: 27.08, lng: 93.62,
      supplyDaysRemaining: 18,
      drainRate: 1.5,
      daysToStockout: 12,
      primaryRoadId: road5.id
    }
  })

  // Create alerts matching blocked roads
  await prisma.alert.create({
    data: {
      roadId: road1.id, districtId: district1.id,
      message: '⚠️ BLOCKED: Guwahati-Shillong Highway — Guwahati stockout in 9.6 days. Alternate: NH-27 Assam-Meghalaya Link',
      createdAt: new Date()
    }
  })

  await prisma.alert.create({
    data: {
      roadId: road2.id, districtId: district4.id,
      message: '🔴 CRITICAL: Imphal-Kohima Road BLOCKED — Kohima stockout in 1.6 days. Alternate: Dimapur-Kohima Road',
      createdAt: new Date(Date.now() - 300000)
    }
  })

  await prisma.alert.create({
    data: {
      roadId: road3.id, districtId: district2.id,
      message: '⚠️ BLOCKED: Silchar-Jiribam Road — Imphal supply impacted. Alternate: Jiribam-Imphal Alternate',
      createdAt: new Date(Date.now() - 600000)
    }
  })

  // Create Users
  const hashedCitizen = await bcrypt.hash('test1234', 10)
  const hashedOfficial = await bcrypt.hash('test1234', 10)

  await prisma.user.create({ data: { email: 'citizen@ner.gov', password: hashedCitizen, role: 'CITIZEN' } })
  await prisma.user.create({ data: { email: 'official@ner.gov', password: hashedOfficial, role: 'OFFICIAL' } })

  console.log('✅ Seed complete! Roads, districts, alternates, alerts all set.')
}

main().catch(console.error).finally(() => prisma.$disconnect())