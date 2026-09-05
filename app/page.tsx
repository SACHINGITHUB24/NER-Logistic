// 'use client'
// // import { useSession, signOut } from 'next-auth/react'
// import PendingReports from '@/components/PendingReports'
// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import dynamic from 'next/dynamic'
// import ReportForm from '@/components/ReportForm'
// import AlertPanel from '@/components/AlertPanel'
// import SupplyPanel from '@/components/SupplyPanel'

// const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

// export default function Home() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const role = (session?.user as any)?.role

//   useEffect(() => {
//     if (status === 'unauthenticated') router.push('/login')
//   }, [status])

//   if (status === 'loading') return (
//     <div style={{
//       minHeight: '100vh', background: '#0D1B2A',
//       display: 'flex', alignItems: 'center', justifyContent: 'center'
//     }}>
//       <p style={{ color: '#00B4D8' }}>Loading...</p>
//     </div>
//   )

//   if (!session) return null

//   return (
//     <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#fff' }}>

//       {/* Header */}
//       <div style={{
//         background: '#112240', borderBottom: '1px solid #1e3a5f',
//         padding: '0.75rem 1.5rem',
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center'
//       }}>
//         <div>
//           <h1 style={{ color: '#00B4D8', margin: 0, fontSize: '1.2rem' }}>
//             🗺️ NER Logistics Intelligence Platform
//           </h1>
//           <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>
//             North Eastern Region — Real-time Road & Supply Monitor
//           </p>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//           <span style={{
//             background: role === 'OFFICIAL' ? '#00B4D8' : '#1e3a5f',
//             color: '#fff', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem'
//           }}>
//             {role === 'OFFICIAL' ? '🛡️ Official' : '👤 Citizen'}
//           </span>
//           <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{session.user?.email}</span>
//           <button
//             onClick={() => signOut({ callbackUrl: '/login' })}
//             style={{
//               background: 'transparent', border: '1px solid #1e3a5f',
//               color: '#94a3b8', borderRadius: '8px', padding: '6px 14px',
//               cursor: 'pointer', fontSize: '0.85rem'
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       {role === 'OFFICIAL' ? (
//         // Official Dashboard - split layout
//         <div style={{
//           display: 'flex', height: 'calc(100vh - 60px)', gap: '1rem', padding: '1rem'
//         }}>
//           {/* Map - 60% */}
//           <div style={{ flex: '0 0 60%', borderRadius: '12px', overflow: 'hidden' }}>
//             <MapView />
//           </div>

//           {/* Right panels - 40% */}
//           <div style={{
//             flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto'
//           }}>
//             <PendingReports />
//             <AlertPanel />
//             <SupplyPanel />
//           </div>
//         </div>
//       ) : (
//         // Citizen View
//         <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
//           <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
//             <MapView />
//           </div>
//           <ReportForm />
//         </div>
//       )}
//     </div>
//   )
// }


// 'use client'
// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import dynamic from 'next/dynamic'
// import ReportForm from '@/components/ReportForm'
// import AlertPanel from '@/components/AlertPanel'
// import SupplyPanel from '@/components/SupplyPanel'
// import PendingReports from '@/components/PendingReports'

// const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

// export default function Home() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const role = (session?.user as any)?.role

//   useEffect(() => {
//     if (status === 'unauthenticated') router.push('/login')
//   }, [status])

//   if (status === 'loading') return (
//     <div style={{
//       minHeight: '100vh', background: '#0D1B2A',
//       display: 'flex', alignItems: 'center', justifyContent: 'center'
//     }}>
//       <p style={{ color: '#00B4D8', fontSize: '1.2rem' }}>Loading...</p>
//     </div>
//   )

//   if (!session) return null

//   return (
//     <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#fff' }}>

//       {/* Header */}
//       <div style={{
//         background: '#112240', borderBottom: '1px solid #1e3a5f',
//         padding: '0.75rem 1.5rem',
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center'
//       }}>
//         <div>
//           <h1 style={{ color: '#00B4D8', margin: 0, fontSize: '1.2rem' }}>
//             🗺️ NER Logistics Intelligence Platform
//           </h1>
//           <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>
//             North Eastern Region — Real-time Road & Supply Monitor
//           </p>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//           <span style={{
//             background: role === 'OFFICIAL' ? '#00B4D8' : '#1e3a5f',
//             color: '#fff', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem'
//           }}>
//             {role === 'OFFICIAL' ? '🛡️ Official' : '👤 Citizen'}
//           </span>
//           <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{session.user?.email}</span>
//           <button
//             onClick={() => signOut({ callbackUrl: '/login' })}
//             style={{
//               background: 'transparent', border: '1px solid #1e3a5f',
//               color: '#94a3b8', borderRadius: '8px', padding: '6px 14px',
//               cursor: 'pointer', fontSize: '0.85rem'
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>

//       {role === 'OFFICIAL' ? (
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '60% 40%',
//           height: 'calc(100vh - 60px)',
//           gap: '0',
//         }}>
//           {/* Map */}
//           <div style={{ padding: '1rem', height: '100%' }}>
//             <div style={{ height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
//               <MapView />
//             </div>
//           </div>

//           {/* Right side panels */}
//           <div style={{
//             display: 'grid',
//             gridTemplateRows: 'auto auto auto',
//             gap: '0.75rem',
//             padding: '1rem 1rem 1rem 0',
//             overflowY: 'auto',
//             height: '100%'
//           }}>
//             <PendingReports />
//             <AlertPanel />
//             <SupplyPanel />
//           </div>
//         </div>
//       ) : (
//         // Citizen View
//         <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
//           <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
//             <MapView />
//           </div>
//           <ReportForm />
//         </div>
//       )}
//     </div>
//   )
// }

'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ReportForm from '@/components/ReportForm'
import AlertPanel from '@/components/AlertPanel'
import SupplyPanel from '@/components/SupplyPanel'
import PendingReports from '@/components/PendingReports'
import ActiveIssues from '@/components/ActiveIssues'

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const role = (session?.user as any)?.role

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/landing')
  }, [status])

  if (status === 'loading') return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem'
    }}>
      <div style={{ fontSize: '2rem' }}>🗺️</div>
      <p style={{ color: '#0ea5e9', fontSize: '1rem' }}>Loading dashboard...</p>
    </div>
  )

  if (!session) return null

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1a', color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#0f172a', borderBottom: '1px solid #1e293b',
        padding: '0 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '56px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>🗺️</span>
          <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>NER Logistics</span>
          <span style={{
            background: '#0ea5e922', color: '#0ea5e9',
            fontSize: '0.65rem', padding: '2px 8px', borderRadius: '99px',
            fontWeight: 700, letterSpacing: '0.08em'
          }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            background: role === 'OFFICIAL' ? '#0ea5e922' : '#1e293b',
            color: role === 'OFFICIAL' ? '#0ea5e9' : '#64748b',
            padding: '4px 12px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 600
          }}>
            {role === 'OFFICIAL' ? '🛡️ Official' : '👤 Citizen'}
          </span>
          <span style={{ color: '#475569', fontSize: '0.82rem' }}>{session.user?.email}</span>
          <button onClick={() => signOut({ callbackUrl: '/landing' })} style={{
            background: 'transparent', border: '1px solid #1e293b',
            color: '#64748b', borderRadius: '6px', padding: '5px 14px',
            cursor: 'pointer', fontSize: '0.82rem'
          }}>Sign out</button>
        </div>
      </div>

      {role === 'OFFICIAL' ? (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 380px',
          height: 'calc(100vh - 56px)'
        }}>
          {/* Map */}
          <div style={{ padding: '1rem', height: '100%' }}>
            <div style={{ height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <MapView />
            </div>
          </div>

          {/* Right panels */}
          <div style={{
            borderLeft: '1px solid #1e293b',
            overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '0'
          }}>
            <PendingReports />
            <ActiveIssues />  
            <AlertPanel />
            <SupplyPanel />
          </div>
        </div>
      ) : (
        <div style={{ padding: '1.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ height: '420px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '1.25rem' }}>
            <MapView />
          </div>
          <ReportForm />
        </div>
      )}
    </div>
  )
}