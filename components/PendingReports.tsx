// 'use client'
// import { useEffect, useState } from 'react'

// type Report = {
//   id: string
//   severity: string
//   description: string
//   status: string
//   createdAt: string
//   road: { name: string }
// }

// function timeAgo(dateStr: string) {
//   const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
//   if (diff < 60) return `${diff}s ago`
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
//   return `${Math.floor(diff / 3600)}h ago`
// }

// export default function PendingReports() {
//   const [reports, setReports] = useState<Report[]>([])
//   const [loading, setLoading] = useState<string | null>(null)

//   const fetchReports = async () => {
//     const res = await fetch('/api/reports/pending')
//     setReports(await res.json())
//   }

//   useEffect(() => {
//     fetchReports()
//     const interval = setInterval(fetchReports, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const handleAction = async (id: string, action: 'APPROVE' | 'REJECT') => {
//     setLoading(id + action)
//     await fetch(`/api/reports/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ action })
//     })
//     setLoading(null)
//     fetchReports()
//   }

//   const getSeverityColor = (severity: string) => {
//     if (severity === 'MINOR') return '#22c55e'
//     if (severity === 'MAJOR') return '#f59e0b'
//     return '#ef4444'
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
//         📋 Pending Reports
//         {reports.length > 0 && (
//           <span style={{
//             background: '#ef4444', color: '#fff',
//             borderRadius: '99px', fontSize: '0.75rem',
//             padding: '2px 8px', marginLeft: '8px'
//           }}>
//             {reports.length}
//           </span>
//         )}
//       </h2>

//       {reports.length === 0 && (
//         <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
//           No pending reports right now.
//         </p>
//       )}

//       {reports.map(report => (
//         <div key={report.id} style={{
//           background: '#0D1B2A',
//           border: '1px solid #1e3a5f',
//           borderRadius: '8px',
//           padding: '0.75rem',
//           marginBottom: '0.75rem'
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
//             <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>
//               {report.road.name}
//             </span>
//             <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
//               {timeAgo(report.createdAt)}
//             </span>
//           </div>

//           <span style={{
//             background: getSeverityColor(report.severity) + '22',
//             color: getSeverityColor(report.severity),
//             fontSize: '0.75rem', padding: '2px 8px',
//             borderRadius: '99px', marginBottom: '6px',
//             display: 'inline-block'
//           }}>
//             {report.severity}
//           </span>

//           <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '6px 0' }}>
//             {report.description}
//           </p>

//           <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
//             <button
//               onClick={() => handleAction(report.id, 'APPROVE')}
//               disabled={loading === report.id + 'APPROVE'}
//               style={{
//                 background: '#22c55e22', color: '#22c55e',
//                 border: '1px solid #22c55e', borderRadius: '6px',
//                 padding: '4px 14px', cursor: 'pointer', fontSize: '0.8rem'
//               }}
//             >
//               {loading === report.id + 'APPROVE' ? '...' : '✅ Approve'}
//             </button>
//             <button
//               onClick={() => handleAction(report.id, 'REJECT')}
//               disabled={loading === report.id + 'REJECT'}
//               style={{
//                 background: '#ef444422', color: '#ef4444',
//                 border: '1px solid #ef4444', borderRadius: '6px',
//                 padding: '4px 14px', cursor: 'pointer', fontSize: '0.8rem'
//               }}
//             >
//               {loading === report.id + 'REJECT' ? '...' : '❌ Reject'}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


'use client'
import { useEffect, useState } from 'react'

type Report = {
  id: string
  severity: string
  description: string
  status: string
  createdAt: string
  road: { name: string }
  imageUrl?: string
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

const severityColor: Record<string, string> = {
  MINOR: '#22c55e', MAJOR: '#f59e0b', BLOCKED: '#ef4444'
}

export default function PendingReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const fetchReports = async () => {
    const res = await fetch('/api/reports/pending')
    setReports(await res.json())
  }

  useEffect(() => {
    fetchReports()
    const interval = setInterval(fetchReports, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleAction = async (id: string, action: 'APPROVE' | 'REJECT') => {
    setLoading(id + action)
    await fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
    await fetchReports()
setLoading(null)
  }

  return (
    <div style={{ borderBottom: '1px solid #1e293b', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pending reports
        </span>
        {reports.length > 0 && (
          <span style={{
            background: '#ef4444', color: '#fff',
            borderRadius: '99px', fontSize: '0.7rem',
            padding: '1px 7px', fontWeight: 700
          }}>{reports.length}</span>
        )}
      </div>

      {reports.length === 0 ? (
        <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>No pending reports</p>
      ) : reports.map(report => (
        <div key={report.id} style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#f1f5f9', fontSize: '0.85rem', fontWeight: 600 }}>
              {report.road.name}
            </span>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>{timeAgo(report.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{
              background: severityColor[report.severity] + '22',
              color: severityColor[report.severity],
              fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', fontWeight: 600
            }}>{report.severity}</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 8px' }}>{report.description}</p>
          {report.imageUrl && (
  <img
    src={report.imageUrl}
    alt="Evidence"
    style={{
      width: '100%', maxHeight: '140px', objectFit: 'cover',
      borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '8px'
    }}
  />
)}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => handleAction(report.id, 'APPROVE')}
              disabled={loading === report.id + 'APPROVE'}
              style={{
                background: '#16a34a22', color: '#22c55e', border: '1px solid #16a34a44',
                borderRadius: '6px', padding: '4px 14px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600
              }}>
              {loading === report.id + 'APPROVE' ? '...' : '✓ Approve'}
            </button>
            <button onClick={() => handleAction(report.id, 'REJECT')}
              disabled={loading === report.id + 'REJECT'}
              style={{
                background: '#dc262622', color: '#ef4444', border: '1px solid #dc262644',
                borderRadius: '6px', padding: '4px 14px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600
              }}>
              {loading === report.id + 'REJECT' ? '...' : '✕ Reject'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}