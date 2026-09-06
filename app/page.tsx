
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
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'map' | 'panels'>('map')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/landing')
  }, [status])

  if (status === 'loading') return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        width: '44px', height: '44px',
        background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
        borderRadius: '10px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.4rem'
      }}>🗺️</div>
      <p style={{ color: '#0ea5e9', fontSize: '0.9rem' }}>Loading dashboard...</p>
    </div>
  )

  if (!session) return null

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1a', color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#0f172a', borderBottom: '1px solid #1e293b',
        padding: '0 1.25rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '52px', position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px',
            background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
            borderRadius: '6px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.85rem'
          }}>🗺️</div>
          <span style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.9rem' }}>NER Logistics</span>
          <div style={{
            background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44',
            fontSize: '0.58rem', padding: '2px 6px', borderRadius: '99px', fontWeight: 700
          }}>● LIVE</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: role === 'OFFICIAL' ? '#0ea5e922' : '#1e293b',
            color: role === 'OFFICIAL' ? '#0ea5e9' : '#64748b',
            border: `1px solid ${role === 'OFFICIAL' ? '#0ea5e933' : '#1e293b'}`,
            padding: '3px 10px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 700
          }}>
            {role === 'OFFICIAL' ? '🛡️ Official' : '👤 Citizen'}
          </div>
          {!isMobile && (
            <span style={{ color: '#334155', fontSize: '0.75rem' }}>{session.user?.email}</span>
          )}
          <button onClick={() => signOut({ callbackUrl: '/landing' })} style={{
            background: 'transparent', border: '1px solid #1e293b',
            color: '#475569', borderRadius: '6px', padding: '4px 12px',
            cursor: 'pointer', fontSize: '0.75rem'
          }}>Sign out</button>
        </div>
      </div>

      {/* Mobile tab switcher for Official */}
      {isMobile && role === 'OFFICIAL' && (
        <div style={{
          display: 'flex', background: '#0f172a',
          borderBottom: '1px solid #1e293b'
        }}>
          {(['map', 'panels'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flex: 1, padding: '10px', border: 'none',
              background: activeTab === t ? '#0ea5e922' : 'transparent',
              color: activeTab === t ? '#0ea5e9' : '#64748b',
              fontSize: '0.82rem', fontWeight: activeTab === t ? 700 : 400,
              cursor: 'pointer', borderBottom: activeTab === t ? '2px solid #0ea5e9' : '2px solid transparent'
            }}>
              {t === 'map' ? '🗺️ Map' : '📋 Controls'}
            </button>
          ))}
        </div>
      )}

      {role === 'OFFICIAL' ? (
        isMobile ? (
          // Mobile Official — tabbed
          <div style={{ height: 'calc(100vh - 100px)' }}>
            {activeTab === 'map' ? (
              <div style={{ height: '100%', padding: '0.75rem' }}>
                <div style={{
                  height: '100%', borderRadius: '10px', overflow: 'hidden',
                  border: '1px solid #1e293b'
                }}>
                  <MapView />
                </div>
              </div>
            ) : (
              <div style={{ height: '100%', overflowY: 'auto' }}>
                <PendingReports />
                <ActiveIssues />
                <AlertPanel />
                <SupplyPanel />
              </div>
            )}
          </div>
        ) : (
          // Desktop Official — side by side
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 360px',
            height: 'calc(100vh - 52px)'
          }}>
            <div style={{ padding: '1rem', height: '100%', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '12px', overflow: 'hidden',
                border: '1px solid #1e293b', boxShadow: '0 0 30px #00000033'
              }}>
                <MapView />
              </div>
            </div>
            <div style={{
              borderLeft: '1px solid #1e293b',
              overflowY: 'auto', background: '#0a0f1a'
            }}>
              <PendingReports />
              <ActiveIssues />
              <AlertPanel />
              <SupplyPanel />
            </div>
          </div>
        )
      ) : (
        // Citizen view
        <div style={{
          padding: isMobile ? '0.875rem' : '1.5rem',
          maxWidth: '860px', margin: '0 auto'
        }}>
          <div style={{
            height: isMobile ? '280px' : '420px',
            borderRadius: '12px', overflow: 'hidden',
            border: '1px solid #1e293b', marginBottom: '1rem',
            boxShadow: '0 0 30px #00000033'
          }}>
            <MapView />
          </div>
          <ReportForm />
        </div>
      )}
    </div>
  )
}