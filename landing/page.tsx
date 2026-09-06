'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f1a',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '1rem 1.25rem' : '1.25rem 2.5rem',
        borderBottom: '1px solid #1e293b',
        background: 'rgba(10,15,26,0.97)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem', flexShrink: 0
          }}>🗺️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f1f5f9' }}>NER Logistics</div>
            {!isMobile && <div style={{ fontSize: '0.6rem', color: '#475569', letterSpacing: '0.05em' }}>INTELLIGENCE PLATFORM</div>}
          </div>
          <div style={{
            background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44',
            fontSize: '0.6rem', padding: '2px 7px', borderRadius: '99px', fontWeight: 700
          }}>● LIVE</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!isMobile && (
            <div style={{ color: '#475569', fontSize: '0.75rem', marginRight: '4px' }}>
              SIH 2026 — PS SIH26002
            </div>
          )}
          <button onClick={() => router.push('/login')} style={{
            background: 'transparent', border: '1px solid #1e293b',
            color: '#94a3b8', borderRadius: '8px',
            padding: isMobile ? '7px 14px' : '8px 18px',
            cursor: 'pointer', fontSize: '0.82rem'
          }}>Sign in</button>
          <button onClick={() => router.push('/login')} style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
            border: 'none', color: '#fff', borderRadius: '8px',
            padding: isMobile ? '7px 14px' : '8px 18px',
            cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
            boxShadow: '0 0 16px #0ea5e933'
          }}>Get access →</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: '960px', margin: '0 auto',
        padding: isMobile ? '3.5rem 1.25rem 2.5rem' : '6rem 2rem 4rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#FF993311', border: '1px solid #FF993333',
          borderRadius: '99px', padding: '5px 14px', marginBottom: '1.75rem',
          fontSize: '0.75rem', color: '#FF9933'
        }}>
          <span>🇮🇳</span>
          {isMobile ? 'Built for NER — MDoNER' : 'Built for India\'s North Eastern Region — Ministry of Development of NE Region'}
        </div>

        <h1 style={{
          fontSize: isMobile ? '2.2rem' : '3.75rem',
          fontWeight: 900, lineHeight: 1.05,
          marginBottom: '1.25rem', letterSpacing: '-0.03em', color: '#f1f5f9'
        }}>
          Real-time logistics<br />
          <span style={{
            background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>intelligence for NER</span>
        </h1>

        <p style={{
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          color: '#64748b', maxWidth: '560px',
          margin: '0 auto 2rem', lineHeight: 1.75
        }}>
          Live road risk monitoring, intelligent rerouting, and predictive supply analysis
          across 8 North Eastern states. Know which district runs out of supply — before it happens.
        </p>

        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'center',
          marginBottom: '3rem', flexWrap: 'wrap'
        }}>
          <button onClick={() => router.push('/login')} style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
            border: 'none', color: '#fff', borderRadius: '10px',
            padding: isMobile ? '12px 24px' : '14px 32px',
            cursor: 'pointer', fontSize: isMobile ? '0.9rem' : '1rem',
            fontWeight: 700, boxShadow: '0 0 24px #0ea5e944'
          }}>Open Dashboard →</button>
          <button onClick={() => router.push('/login')} style={{
            background: '#0f172a', border: '1px solid #1e293b',
            color: '#94a3b8', borderRadius: '10px',
            padding: isMobile ? '12px 24px' : '14px 32px',
            cursor: 'pointer', fontSize: isMobile ? '0.9rem' : '1rem'
          }}>Create Account</button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1px', background: '#1e293b', borderRadius: '14px',
          overflow: 'hidden', border: '1px solid #1e293b',
          boxShadow: '0 0 40px #0ea5e911'
        }}>
          {[
            { num: '8', label: 'States Covered', icon: '🗺️' },
            { num: '6+', label: 'Road Corridors', icon: '🛣️' },
            { num: '5s', label: 'Update Interval', icon: '⚡' },
            { num: '2', label: 'User Roles', icon: '🛡️' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#0f172a', padding: '1.5rem 1rem', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '5px' }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0ea5e9', letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: isMobile ? '0 1.25rem 2.5rem' : '0 2rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ color: '#f1f5f9', fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 700 }}>
            Everything officials need. Nothing they don't.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '0.875rem'
        }}>
          {[
            { icon: '🗺️', title: 'Live Road Risk Map', desc: 'Color-coded corridors updated every 5 seconds. Green, amber, red — see NER\'s entire road network at a glance.', accent: '#0ea5e9' },
            { icon: '🔮', title: 'Predictive Stockout', desc: 'Know which district runs out of essential supply first — not just which road is broken. Days-to-stockout for every district.', accent: '#FF9933' },
            { icon: '⚡', title: 'Smart Rerouting', desc: 'When a road is blocked, alternate corridors activate automatically. Blue dashed lines guide supply vehicles instantly.', accent: '#38bdf8' },
            { icon: '📋', title: 'Field Reports', desc: 'Citizens submit reports with photo evidence. Officials approve or reject before map updates.', accent: '#22c55e' },
            { icon: '🔔', title: 'Live Alerts', desc: 'Automated alerts when roads are blocked or districts hit critical supply levels.', accent: '#f59e0b' },
            { icon: '🛡️', title: 'Role-Based Access', desc: 'Citizens see the map and submit reports. Officials get the full decision dashboard.', accent: '#a855f7' },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#0f172a', border: '1px solid #1e293b',
              borderRadius: '12px', padding: '1.25rem'
            }}>
              <div style={{
                width: '38px', height: '38px',
                background: f.accent + '15', border: '1px solid ' + f.accent + '33',
                borderRadius: '9px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.1rem', marginBottom: '0.875rem'
              }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '5px', fontSize: '0.9rem' }}>{f.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: isMobile ? '0 1.25rem 4rem' : '0 2rem 5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e912, #0369a112)',
          border: '1px solid #0ea5e933', borderRadius: '14px',
          padding: isMobile ? '2rem 1.25rem' : '2.5rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
            Ready to see it live?
          </div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
            Sign in as an Official to see the full decision dashboard, or create a Citizen account to submit field reports.
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/login')} style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
              border: 'none', color: '#fff', borderRadius: '8px',
              padding: '11px 26px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700
            }}>Sign in →</button>
            <button onClick={() => router.push('/login')} style={{
              background: 'transparent', border: '1px solid #1e293b',
              color: '#94a3b8', borderRadius: '8px',
              padding: '11px 26px', cursor: 'pointer', fontSize: '0.875rem'
            }}>Create account</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #1e293b',
        padding: isMobile ? '1.25rem' : '1.5rem 2.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center', gap: '8px', textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🗺️</span>
          <span style={{ color: '#334155', fontSize: '0.8rem', fontWeight: 600 }}>NER Logistics Intelligence Platform</span>
        </div>
        <span style={{ color: '#1e293b', fontSize: '0.78rem' }}>
          SIH 2026 · Problem Statement SIH26002 · MDoNER
        </span>
      </div>
    </div>
  )
}
