// 'use client'
// import { useEffect, useState } from 'react'

// type District = {
//   id: string
//   name: string
//   supplyDaysRemaining: number
//   primaryRoadId: string
// }

// type Road = {
//   id: string
//   name: string
//   status: string
// }

// export default function SupplyPanel() {
//   const [districts, setDistricts] = useState<District[]>([])
//   const [roads, setRoads] = useState<Road[]>([])

//   const fetchData = async () => {
//     const [d, r] = await Promise.all([
//       fetch('/api/districts').then(r => r.json()),
//       fetch('/api/roads').then(r => r.json())
//     ])
//     setDistricts(d)
//     setRoads(r)
//   }

//   useEffect(() => {
//     fetchData()
//     const interval = setInterval(fetchData, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const getRoad = (id: string) => roads.find(r => r.id === id)

//   const getBorderColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#1e3a5f'
//   }

//   const getBarColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#22c55e'
//   }

//   return (
//     <div style={{
//       background: '#112240',
//       border: '1px solid #1e3a5f',
//       borderRadius: '12px',
//       padding: '1.25rem',
//       overflowY: 'auto'
//     }}>
//       <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
//         📦 Supply Prediction
//       </h2>

//       {districts.map(district => {
//         const road = getRoad(district.primaryRoadId)
//         const pct = Math.min((district.supplyDaysRemaining / 30) * 100, 100)
//         const borderColor = getBorderColor(district.supplyDaysRemaining)
//         const barColor = getBarColor(district.supplyDaysRemaining)

//         return (
//           <div key={district.id} style={{
//             background: '#0D1B2A',
//             border: `1px solid ${borderColor}`,
//             borderRadius: '8px',
//             padding: '0.75rem',
//             marginBottom: '0.75rem'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//               <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
//                 {district.name}
//               </span>
//               <span style={{ color: borderColor, fontSize: '0.85rem', fontWeight: 600 }}>
//                 {district.supplyDaysRemaining.toFixed(1)} days
//               </span>
//             </div>

//             <div style={{
//               background: '#1e3a5f',
//               borderRadius: '99px',
//               height: '6px',
//               marginBottom: '6px'
//             }}>
//               <div style={{
//                 background: barColor,
//                 width: `${pct}%`,
//                 height: '100%',
//                 borderRadius: '99px',
//                 transition: 'width 0.5s ease'
//               }} />
//             </div>

//             {road && (
//               <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>
//                 Primary road: {road.name} —{' '}
//                 <span style={{
//                   color: road.status === 'CLEAR' ? '#22c55e' :
//                     road.status === 'AT_RISK' ? '#f59e0b' : '#ef4444'
//                 }}>
//                   {road.status}
//                 </span>
//               </p>
//             )}

//             {district.supplyDaysRemaining <= 5 && (
//               <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', marginBottom: 0 }}>
//                 ⚠️ Critical — immediate action needed
//               </p>
//             )}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// 'use client'
// import { useEffect, useState } from 'react'

// type District = {
//   id: string
//   name: string
//   supplyDaysRemaining: number
//   drainRate: number
//   daysToStockout: number
//   primaryRoadId: string
// }

// type Road = {
//   id: string
//   name: string
//   status: string
// }

// export default function SupplyPanel() {
//   const [districts, setDistricts] = useState<District[]>([])
//   const [roads, setRoads] = useState<Road[]>([])

//   const fetchData = async () => {
//     const [d, r] = await Promise.all([
//       fetch('/api/districts').then(r => r.json()),
//       fetch('/api/roads').then(r => r.json())
//     ])
//     setDistricts(d)
//     setRoads(r)
//   }

//   useEffect(() => {
//     fetchData()
//     const interval = setInterval(fetchData, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const getRoad = (id: string) => roads.find(r => r.id === id)

//   const getBorderColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#1e3a5f'
//   }

//   const getBarColor = (days: number) => {
//     if (days <= 5) return '#ef4444'
//     if (days <= 10) return '#f59e0b'
//     return '#22c55e'
//   }

//   const getDrainLabel = (rate: number) => {
//     if (rate >= 2.5) return { label: '🔴 High Drain', color: '#ef4444' }
//     if (rate >= 1.5) return { label: '🟡 Elevated Drain', color: '#f59e0b' }
//     return { label: '🟢 Normal', color: '#22c55e' }
//   }

//   // Sort by most critical first
//   const sorted = [...districts].sort((a, b) => a.daysToStockout - b.daysToStockout)

//   return (
//     <div style={{
//       background: '#112240',
//       border: '1px solid #1e3a5f',
//       borderRadius: '12px',
//       padding: '1.25rem',
//       overflowY: 'auto'
//     }}>
//       <h2 style={{ color: '#00B4D8', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
//         📦 Supply Prediction
//       </h2>
//       <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '1rem' }}>
//         Sorted by most critical first — updates every 5s
//       </p>

//       {sorted.map(district => {
//         const road = getRoad(district.primaryRoadId)
//         const pct = Math.min((district.supplyDaysRemaining / 30) * 100, 100)
//         const borderColor = getBorderColor(district.daysToStockout)
//         const barColor = getBarColor(district.daysToStockout)
//         const drain = getDrainLabel(district.drainRate)

//         return (
//           <div key={district.id} style={{
//             background: '#0D1B2A',
//             border: `1px solid ${borderColor}`,
//             borderRadius: '8px',
//             padding: '0.75rem',
//             marginBottom: '0.75rem'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//               <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
//                 {district.name}
//               </span>
//               <span style={{ color: borderColor, fontSize: '0.85rem', fontWeight: 700 }}>
//                 {district.supplyDaysRemaining.toFixed(1)} days left
//               </span>
//             </div>

//             {/* Supply bar */}
//             <div style={{
//               background: '#1e3a5f',
//               borderRadius: '99px',
//               height: '6px',
//               marginBottom: '8px'
//             }}>
//               <div style={{
//                 background: barColor,
//                 width: `${pct}%`,
//                 height: '100%',
//                 borderRadius: '99px',
//                 transition: 'width 0.5s ease'
//               }} />
//             </div>

//             {/* Predictive stockout */}
//             <div style={{
//               background: '#112240',
//               borderRadius: '6px',
//               padding: '6px 10px',
//               marginBottom: '6px',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}>
//               <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
//                 🔮 Predicted stockout
//               </span>
//               <span style={{ color: borderColor, fontSize: '0.8rem', fontWeight: 700 }}>
//                 {district.daysToStockout.toFixed(1)} days
//               </span>
//             </div>

//             {/* Drain rate */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span style={{ color: drain.color, fontSize: '0.75rem' }}>
//                 {drain.label}
//               </span>
//               {road && (
//                 <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
//                   {road.name.split('-')[0]} road:{' '}
//                   <span style={{
//                     color: road.status === 'CLEAR' ? '#22c55e' :
//                       road.status === 'AT_RISK' ? '#f59e0b' : '#ef4444'
//                   }}>
//                     {road.status}
//                   </span>
//                 </span>
//               )}
//             </div>

//             {district.daysToStockout <= 5 && (
//               <div style={{
//                 background: '#ef444422',
//                 border: '1px solid #ef4444',
//                 borderRadius: '6px',
//                 padding: '4px 10px',
//                 marginTop: '8px',
//                 fontSize: '0.75rem',
//                 color: '#ef4444',
//                 textAlign: 'center'
//               }}>
//                 ⚠️ CRITICAL — Immediate intervention required
//               </div>
//             )}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

'use client'
import { useEffect, useState } from 'react'

type District = {
  id: string
  name: string
  supplyDaysRemaining: number
  drainRate: number
  daysToStockout: number
  primaryRoadId: string
}

type Road = { id: string; name: string; status: string }

export default function SupplyPanel() {
  const [districts, setDistricts] = useState<District[]>([])
  const [roads, setRoads] = useState<Road[]>([])

  // useEffect(() => {
  //   const fetch_ = async () => {
  //     const [d, r] = await Promise.all([
  //       fetch('/api/districts').then(r => r.json()),
  //       fetch('/api/roads').then(r => r.json())
  //     ])
  //     setDistricts(d)
  //     setRoads(r)
  //   }
  //   fetch_()
  //   const interval = setInterval(fetch_, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
  const fetch_ = async () => {
    const [d, r] = await Promise.all([
      fetch('/api/districts').then(r => r.json()),
      fetch('/api/roads').then(r => r.json())
    ])
    setDistricts(d)
    setRoads(r)
  }
  fetch_()
  const interval = setInterval(fetch_, 5000)
  const drainInterval = setInterval(() => {
    fetch('/api/drain', { method: 'POST' })
  }, 30000)
  return () => { clearInterval(interval); clearInterval(drainInterval) }
}, [])

  const getRoad = (id: string) => roads.find(r => r.id === id)

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return '#ef4444'
    if (days <= 7) return '#f59e0b'
    return '#22c55e'
  }

  const sorted = [...districts].sort((a, b) => a.daysToStockout - b.daysToStockout)
  const mostCritical = sorted[0]

  return (
    <div style={{ padding: '1rem' }}>
      <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Supply prediction
      </span>

      {/* Priority call */}
      {mostCritical && mostCritical.daysToStockout <= 10 && (
        <div style={{
          background: '#ef444411', border: '1px solid #ef444433',
          borderRadius: '8px', padding: '0.75rem', margin: '0.75rem 0'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '4px' }}>⚠️ Priority — closest to stockout</div>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem' }}>{mostCritical.name}</div>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.5rem' }}>{mostCritical.daysToStockout.toFixed(1)}d</div>
        </div>
      )}

      {/* District list */}
      <div style={{ marginTop: '0.5rem' }}>
        {sorted.map(district => {
          const road = getRoad(district.primaryRoadId)
          const color = getUrgencyColor(district.daysToStockout)
          const pct = Math.min((district.supplyDaysRemaining / 30) * 100, 100)

          return (
            <div key={district.id} style={{
              padding: '0.6rem 0', borderBottom: '1px solid #1e293b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#f1f5f9', fontSize: '0.85rem', fontWeight: 600 }}>{district.name}</span>
                <span style={{ color, fontSize: '0.82rem', fontWeight: 700 }}>
                  {district.daysToStockout.toFixed(1)}d
                </span>
              </div>
              <div style={{ background: '#1e293b', borderRadius: '99px', height: '4px', marginBottom: '4px' }}>
                <div style={{
                  background: color, width: `${pct}%`, height: '100%',
                  borderRadius: '99px', transition: 'width 0.5s ease'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#334155', fontSize: '0.72rem' }}>
                  {district.supplyDaysRemaining.toFixed(1)} days supply · {district.drainRate}x drain
                </span>
                {road && (
                  <span style={{
                    color: road.status === 'CLEAR' ? '#22c55e' : road.status === 'AT_RISK' ? '#f59e0b' : '#ef4444',
                    fontSize: '0.72rem'
                  }}>● {road.status}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}