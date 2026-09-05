'use client'
import { useEffect, useState } from 'react'

type Road = {
  id: string
  name: string
  status: string
  riskScore: number
  reroutingActive: boolean
  alternateRouteId: string | null
}

const statusColor: Record<string, string> = {
  AT_RISK: '#f59e0b',
  BLOCKED: '#ef4444',
}

export default function ActiveIssues() {
  const [roads, setRoads] = useState<Road[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const fetchRoads = async () => {
    const res = await fetch('/api/roads')
    const all: Road[] = await res.json()
    setRoads(all.filter(r => r.status !== 'CLEAR'))
  }

  useEffect(() => {
    fetchRoads()
    const interval = setInterval(fetchRoads, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleAction = async (roadId: string, action: 'RESOLVE' | 'REMOVE_REROUTING') => {
    setLoading(roadId + action)
    await fetch(`/api/roads/${roadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
    await fetchRoads()
    setLoading(null)
  }

  if (roads.length === 0) return (
    <div style={{ borderBottom: '1px solid #1e293b', padding: '1rem' }}>
      <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Active Issues
      </span>
      <p style={{ color: '#334155', fontSize: '0.82rem', margin: '0.75rem 0 0' }}>All roads clear</p>
    </div>
  )

  return (
    <div style={{ borderBottom: '1px solid #1e293b', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Active Issues
        </span>
        <span style={{
          background: '#ef444422', color: '#ef4444',
          borderRadius: '99px', fontSize: '0.7rem',
          padding: '1px 7px', fontWeight: 700
        }}>{roads.length}</span>
      </div>

      {roads.map(road => (
        <div key={road.id} style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ color: '#f1f5f9', fontSize: '0.85rem', fontWeight: 600 }}>
              {road.name}
            </span>
            <span style={{
              background: (statusColor[road.status] ?? '#64748b') + '22',
              color: statusColor[road.status] ?? '#64748b',
              fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', fontWeight: 600
            }}>
              {road.status}
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '8px' }}>
            Risk score: {road.riskScore}/100
            {road.reroutingActive && (
              <span style={{ color: '#38bdf8', marginLeft: '10px' }}>⚡ Rerouting active</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleAction(road.id, 'RESOLVE')}
              disabled={loading === road.id + 'RESOLVE'}
              style={{
                background: '#16a34a22', color: '#22c55e',
                border: '1px solid #16a34a44',
                borderRadius: '6px', padding: '4px 12px',
                cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600
              }}
            >
              {loading === road.id + 'RESOLVE' ? '...' : '✓ Mark Resolved'}
            </button>

            {road.reroutingActive && (
              <button
                onClick={() => handleAction(road.id, 'REMOVE_REROUTING')}
                disabled={loading === road.id + 'REMOVE_REROUTING'}
                style={{
                  background: '#38bdf822', color: '#38bdf8',
                  border: '1px solid #38bdf844',
                  borderRadius: '6px', padding: '4px 12px',
                  cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600
                }}
              >
                {loading === road.id + 'REMOVE_REROUTING' ? '...' : '╌ Remove Rerouting'}
              </button>
            )}

            {!road.reroutingActive && road.alternateRouteId && road.status === 'BLOCKED' && (
              <button
                onClick={async () => {
                  setLoading(road.id + 'ACTIVATE')
                  await fetch(`/api/roads/${road.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'ACTIVATE_REROUTING' })
                  })
                  await fetchRoads()
                  setLoading(null)
                }}
                disabled={loading === road.id + 'ACTIVATE'}
                style={{
                  background: '#f59e0b22', color: '#f59e0b',
                  border: '1px solid #f59e0b44',
                  borderRadius: '6px', padding: '4px 12px',
                  cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600
                }}
              >
                {loading === road.id + 'ACTIVATE' ? '...' : '⚡ Activate Rerouting'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}