// 'use client'
// import { useEffect, useState } from 'react'

// type Alert = {
//   id: string
//   message: string
//   createdAt: string
//   road: { name: string }
//   district: { name: string }
// }

// function timeAgo(dateStr: string) {
//   const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
//   if (diff < 60) return `${diff}s ago`
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
//   return `${Math.floor(diff / 3600)}h ago`
// }

// export default function AlertPanel() {
//   const [alerts, setAlerts] = useState<Alert[]>([])

//   const fetchAlerts = async () => {
//     const res = await fetch('/api/alerts')
//     setAlerts(await res.json())
//   }

//   useEffect(() => {
//     fetchAlerts()
//     const interval = setInterval(fetchAlerts, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div style={{
//       background: '#112240',
//       border: '1px solid #1e3a5f',
//       borderRadius: '12px',
//       padding: '1.25rem',
//       height: '100%',
//       overflowY: 'auto'
//     }}>
//       <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
//         🔔 Live Alerts
//       </h2>

//       {alerts.length === 0 && (
//         <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No alerts right now.</p>
//       )}

//       {alerts.map(alert => {
//         const isNew = (Date.now() - new Date(alert.createdAt).getTime()) < 600000
//         return (
//           <div key={alert.id} style={{
//             background: '#0D1B2A',
//             border: `1px solid ${isNew ? '#ef4444' : '#1e3a5f'}`,
//             borderRadius: '8px',
//             padding: '0.75rem',
//             marginBottom: '0.75rem'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
//               <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
//                 {isNew && <span style={{ color: '#ef4444', marginRight: '6px' }}>●</span>}
//                 {alert.road.name}
//               </span>
//               <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
//                 {timeAgo(alert.createdAt)}
//               </span>
//             </div>
//             <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
//               {alert.message}
//             </p>
//             <p style={{ color: '#00B4D8', fontSize: '0.75rem', marginTop: '4px', marginBottom: 0 }}>
//               📍 {alert.district.name}
//             </p>
//           </div>
//         )
//       })}
//     </div>
//   )
// }


'use client'
import { useEffect, useState } from 'react'

type Alert = {
  id: string
  message: string
  createdAt: string
  road: { name: string; status: string }
  district: { name: string }
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

export default function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const fetch_ = async () => {
      const res = await fetch('/api/alerts')
      setAlerts(await res.json())
    }
    fetch_()
    const interval = setInterval(fetch_, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ borderBottom: '1px solid #1e293b', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Live alerts
        </span>
        <span style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
      </div>

      {alerts.length === 0 ? (
        <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>No active alerts</p>
      ) : alerts.map(alert => {
        const isNew = (Date.now() - new Date(alert.createdAt).getTime()) < 600000
        return (
          <div key={alert.id} style={{
            padding: '0.6rem 0',
            borderBottom: '1px solid #1e293b'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ color: '#f1f5f9', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isNew && <span style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>}
                {alert.road.name}
              </span>
              <span style={{ color: '#475569', fontSize: '0.72rem' }}>{timeAgo(alert.createdAt)}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0 0 2px' }}>{alert.message}</p>
            <span style={{ color: '#0ea5e9', fontSize: '0.72rem' }}>📍 {alert.district.name}</span>
          </div>
        )
      })}
    </div>
  )
}