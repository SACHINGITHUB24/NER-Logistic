'use client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f1a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.25rem 2rem', borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🗺️</span>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>NER Logistics</span>
          <span style={{
            background: '#0ea5e933', color: '#0ea5e9',
            fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px',
            fontWeight: 600, letterSpacing: '0.05em'
          }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/login')} style={{
            background: 'transparent', border: '1px solid #334155',
            color: '#94a3b8', borderRadius: '8px', padding: '8px 20px',
            cursor: 'pointer', fontSize: '0.9rem'
          }}>Sign in</button>
          <button onClick={() => router.push('/login')} style={{
            background: '#0ea5e9', border: 'none',
            color: '#fff', borderRadius: '8px', padding: '8px 20px',
            cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600
          }}>Get access</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '5rem 2rem 3rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#0ea5e911', border: '1px solid #0ea5e933',
          borderRadius: '99px', padding: '6px 16px', marginBottom: '2rem',
          fontSize: '0.8rem', color: '#0ea5e9'
        }}>
          <span style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', display: 'inline-block' }}></span>
          Real-time monitoring across 8 NER states
        </div>

        <h1 style={{
          fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1,
          marginBottom: '1.5rem', color: '#f1f5f9'
        }}>
          Resilient movement<br />
          <span style={{ color: '#0ea5e9' }}>network intelligence</span>
        </h1>

        <p style={{
          fontSize: '1.15rem', color: '#64748b', maxWidth: '600px',
          margin: '0 auto 2.5rem', lineHeight: 1.7
        }}>
          Real-time road risk, intelligent rerouting, and predicted supply impact
          for the North Eastern Region. Built for citizens, field teams, and officials.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '4rem' }}>
          <button onClick={() => router.push('/login')} style={{
            background: '#0ea5e9', border: 'none', color: '#fff',
            borderRadius: '10px', padding: '14px 32px',
            cursor: 'pointer', fontSize: '1rem', fontWeight: 700
          }}>
            Sign in to dashboard →
          </button>
          <button onClick={() => router.push('/login')} style={{
            background: '#1e293b', border: '1px solid #334155', color: '#94a3b8',
            borderRadius: '10px', padding: '14px 32px',
            cursor: 'pointer', fontSize: '1rem'
          }}>
            Create account
          </button>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: '#1e293b', borderRadius: '12px',
          overflow: 'hidden', border: '1px solid #1e293b'
        }}>
          {[
            { num: '8', label: 'States covered' },
            { num: '6', label: 'Live road corridors' },
            { num: '5s', label: 'Refresh interval' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#0f172a', padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0ea5e9' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '2rem 2rem 5rem',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'
      }}>
        {[
          { icon: '🗺️', title: 'Live road risk map', desc: 'Color-coded corridors updated every 5 seconds. Green, amber, red — know at a glance.' },
          { icon: '🔮', title: 'Predictive stockout', desc: 'Know which district runs out of essential supply first — not just which road is broken.' },
          { icon: '⚡', title: 'Smart rerouting', desc: 'When a road is blocked, alternate corridors activate automatically on the map.' },
          { icon: '📋', title: 'Field reports', desc: 'Citizens submit geo-tagged reports. Officials approve or reject before map updates.' },
          { icon: '🔔', title: 'Live alerts', desc: 'Instant alerts when risk crosses critical threshold. No manual refresh needed.' },
          { icon: '🛡️', title: 'Role-based access', desc: 'Citizens see the map. Officials get the full decision dashboard.' },
        ].map((f, i) => (
          <div key={i} style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '12px', padding: '1.5rem'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
            <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.title}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #1e293b', padding: '1.5rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ color: '#334155', fontSize: '0.85rem' }}>
          🗺️ NER Logistics Intelligence Platform
        </span>
        <span style={{ color: '#334155', fontSize: '0.85rem' }}>
          Built for SIH 2026 — Problem Statement SIH26002
        </span>
      </div>
    </div>
  )
}