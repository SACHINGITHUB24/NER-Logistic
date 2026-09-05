// 'use client'
// import { useEffect, useState } from 'react'
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'

// // Fix leaflet marker icons
// delete (L.Icon.Default.prototype as any)._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// })

// type Road = {
//   id: string
//   name: string
//   status: string
//   riskScore: number
//   geometry: { coordinates: [number, number][] }
//   alternateRouteId: string | null
// }

// type District = {
//   id: string
//   name: string
//   lat: number
//   lng: number
//   supplyDaysRemaining: number
// }

// export default function MapView() {
//   const [roads, setRoads] = useState<Road[]>([])
//   const [districts, setDistricts] = useState<District[]>([])

//   const fetchData = async () => {
//     const [roadsRes, districtsRes] = await Promise.all([
//       fetch('/api/roads'),
//       fetch('/api/districts')
//     ])
//     setRoads(await roadsRes.json())
//     setDistricts(await districtsRes.json())
//   }

//   useEffect(() => {
//     fetchData()
//     const interval = setInterval(fetchData, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const getColor = (status: string) => {
//     if (status === 'CLEAR') return '#22c55e'
//     if (status === 'AT_RISK') return '#f59e0b'
//     return '#ef4444'
//   }

//   const getSupplyColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#22c55e'
//   }

//   const blockedRoads = roads.filter(r => r.status === 'BLOCKED')
//   const alternateIds = blockedRoads.map(r => r.alternateRouteId)

//   return (
//     <MapContainer
//       center={[25.0, 93.0]}
//       zoom={7}
//       style={{ height: '100%', width: '100%', borderRadius: '12px' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="© OpenStreetMap"
//       />

//       {roads.map(road => {
//         const coords = road.geometry.coordinates.map(
//           ([lng, lat]) => [lat, lng] as [number, number]
//         )
//         const isAlternate = alternateIds.includes(road.id)
//         return (
//           <Polyline
//             key={road.id}
//             positions={coords}
//             pathOptions={{
//               color: isAlternate ? '#38bdf8' : getColor(road.status),
//               weight: 4,
//               dashArray: isAlternate ? '8 6' : undefined
//             }}
//           >
//             <Popup>
//               <strong>{road.name}</strong><br />
//               Status: {road.status}<br />
//               Risk Score: {road.riskScore}/100
//               {isAlternate && <><br /><span style={{color:'#38bdf8'}}>⚡ Alternate Route</span></>}
//             </Popup>
//           </Polyline>
//         )
//       })}

//       {districts.map(district => (
//         <Marker key={district.id} position={[district.lat, district.lng]}>
//           <Popup>
//             <strong>{district.name}</strong><br />
//             <span style={{ color: getSupplyColor(district.supplyDaysRemaining) }}>
//               Supply: {district.supplyDaysRemaining.toFixed(1)} days remaining
//             </span>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   )
// }


// 'use client'
// import { useEffect, useState } from 'react'
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'

// delete (L.Icon.Default.prototype as any)._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// })

// type Road = {
//   id: string
//   name: string
//   status: string
//   riskScore: number
//   alternateRouteId: string | null
//   geometry: { coordinates: [number, number][] }
// }

// type District = {
//   id: string
//   name: string
//   lat: number
//   lng: number
//   supplyDaysRemaining: number
//   daysToStockout: number
// }

// export default function MapView() {
//   const [roads, setRoads] = useState<Road[]>([])
//   const [districts, setDistricts] = useState<District[]>([])

//   const fetchData = async () => {
//     const [roadsRes, districtsRes] = await Promise.all([
//       fetch('/api/roads'),
//       fetch('/api/districts')
//     ])
//     setRoads(await roadsRes.json())
//     setDistricts(await districtsRes.json())
//   }

//   useEffect(() => {
//     fetchData()
//     const interval = setInterval(fetchData, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const getColor = (status: string) => {
//     if (status === 'CLEAR') return '#22c55e'
//     if (status === 'AT_RISK') return '#f59e0b'
//     return '#ef4444'
//   }

//   const getSupplyColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#22c55e'
//   }

//   // Find all roads that are alternates for blocked/at-risk roads
//   const blockedRoads = roads.filter(r => r.status === 'BLOCKED' || r.status === 'AT_RISK')
//   const alternateRouteIds = blockedRoads
//     .map(r => r.alternateRouteId)
//     .filter(Boolean) as string[]

//   return (
//     <MapContainer
//       center={[25.0, 93.0]}
//       zoom={7}
//       style={{ height: '100%', width: '100%', borderRadius: '12px' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="© OpenStreetMap"
//       />

//       {roads.map(road => {
//         const coords = road.geometry.coordinates.map(
//           ([lng, lat]) => [lat, lng] as [number, number]
//         )
//         const isAlternate = alternateRouteIds.includes(road.id)

//         // Determine line style
//         let color = getColor(road.status)
//         let dashArray: string | undefined = undefined
//         let weight = 4

//         if (isAlternate) {
//           color = '#38bdf8' // blue for alternate
//           dashArray = '8 5'
//           weight = 5
//         }

//         return (
//           <Polyline
//             key={road.id}
//             positions={coords}
//             pathOptions={{ color, weight, dashArray }}
//           >
//             <Popup>
//               <div style={{ minWidth: '160px' }}>
//                 <strong>{road.name}</strong><br />
//                 <span style={{ color: getColor(road.status) }}>
//                   ● {road.status}
//                 </span><br />
//                 Risk Score: {road.riskScore}/100
//                 {isAlternate && (
//                   <><br /><span style={{ color: '#38bdf8' }}>⚡ Active Alternate Route</span></>
//                 )}
//               </div>
//             </Popup>
//           </Polyline>
//         )
//       })}

//       {/* Legend */}
//       <div style={{
//         position: 'absolute', bottom: '30px', left: '10px',
//         background: 'rgba(13,27,42,0.9)', borderRadius: '8px',
//         padding: '8px 12px', zIndex: 1000, fontSize: '12px', color: '#fff'
//       }}>
//         <div>🟢 Clear</div>
//         <div>🟡 At Risk</div>
//         <div>🔴 Blocked</div>
//         <div style={{ color: '#38bdf8' }}>━ ━ Alternate Route</div>
//       </div>

//       {districts.map(district => (
//         <Marker key={district.id} position={[district.lat, district.lng]}>
//           <Popup>
//             <div style={{ minWidth: '160px' }}>
//               <strong>{district.name}</strong><br />
//               <span style={{ color: getSupplyColor(district.supplyDaysRemaining) }}>
//                 📦 Supply: {district.supplyDaysRemaining.toFixed(1)} days
//               </span><br />
//               <span style={{ color: getSupplyColor(district.daysToStockout) }}>
//                 🔮 Stockout: {district.daysToStockout.toFixed(1)} days
//               </span>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type Road = {
  id: string
  name: string
  status: string
  riskScore: number
  alternateRouteId: string | null
  reroutingActive: boolean
  geometry: { coordinates: [number, number][] }
}

type District = {
  id: string
  name: string
  lat: number
  lng: number
  supplyDaysRemaining: number
  daysToStockout: number
  drainRate: number
}

export default function MapView() {
  const [roads, setRoads] = useState<Road[]>([])
  const [districts, setDistricts] = useState<District[]>([])

  const fetchData = async () => {
    const [roadsRes, districtsRes] = await Promise.all([
      fetch('/api/roads'),
      fetch('/api/districts')
    ])
    setRoads(await roadsRes.json())
    setDistricts(await districtsRes.json())
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    if (status === 'CLEAR') return '#22c55e'
    if (status === 'AT_RISK') return '#f59e0b'
    return '#ef4444'
  }

  const getSupplyColor = (days: number) => {
    if (days <= 3) return '#ef4444'
    if (days <= 7) return '#f59e0b'
    return '#22c55e'
  }

  // Only roads where the primary road has reroutingActive=true
  const activeAlternateIds = new Set(
    roads
      .filter(r => r.reroutingActive && r.alternateRouteId)
      .map(r => r.alternateRouteId as string)
  )

  return (
    <MapContainer
      center={[25.0, 93.0]}
      zoom={7}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {roads.map(road => {
        const coords = road.geometry.coordinates.map(
          ([lng, lat]) => [lat, lng] as [number, number]
        )
        const isActiveAlternate = activeAlternateIds.has(road.id)

        // Alternate route styling takes priority over own status color
        const color = isActiveAlternate ? '#38bdf8' : getStatusColor(road.status)
        const dashArray = isActiveAlternate ? '10 6' : undefined
        const weight = isActiveAlternate ? 5 : 4

        return (
          <Polyline
            key={road.id}
            positions={coords}
            pathOptions={{ color, weight, dashArray }}
          >
            <Popup>
              <div style={{ minWidth: '170px', fontFamily: 'system-ui' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{road.name}</div>
                <div style={{ color: getStatusColor(road.status), fontSize: '0.85rem' }}>
                  ● {road.status}
                </div>
                <div style={{ color: '#666', fontSize: '0.8rem' }}>
                  Risk: {road.riskScore}/100
                </div>
                {isActiveAlternate && (
                  <div style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '4px' }}>
                    ⚡ Active alternate route
                  </div>
                )}
                {road.reroutingActive && (
                  <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '4px' }}>
                    🔀 Rerouting active
                  </div>
                )}
              </div>
            </Popup>
          </Polyline>
        )
      })}

      {districts.map(district => (
        <Marker key={district.id} position={[district.lat, district.lng]}>
          <Popup>
            <div style={{ minWidth: '170px', fontFamily: 'system-ui' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>{district.name}</div>
              <div style={{ color: getSupplyColor(district.supplyDaysRemaining), fontSize: '0.85rem' }}>
                📦 Supply: {district.supplyDaysRemaining.toFixed(1)} days
              </div>
              <div style={{ color: getSupplyColor(district.daysToStockout), fontSize: '0.85rem' }}>
                🔮 Stockout in: {district.daysToStockout.toFixed(1)} days
              </div>
              <div style={{ color: '#999', fontSize: '0.78rem', marginTop: '4px' }}>
                Drain rate: {district.drainRate}x
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: '30px', left: '10px',
        background: 'rgba(10,15,26,0.92)', borderRadius: '8px',
        padding: '10px 14px', zIndex: 1000, fontSize: '12px', color: '#fff',
        border: '1px solid #1e293b'
      }}>
        <div style={{ color: '#22c55e', marginBottom: '3px' }}>● Clear</div>
        <div style={{ color: '#f59e0b', marginBottom: '3px' }}>● At Risk</div>
        <div style={{ color: '#ef4444', marginBottom: '3px' }}>● Blocked</div>
        <div style={{ color: '#38bdf8' }}>╌ Alternate route</div>
      </div>
    </MapContainer>
  )
}