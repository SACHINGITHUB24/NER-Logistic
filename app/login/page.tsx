'use client'
import { useState } from 'react'
// import { signIn } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email, password, redirect: false
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#112240',
        border: '1px solid #1e3a5f',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#00B4D8', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          🗺️ NER Logistics
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Intelligence Platform — Sign in to continue
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@ner.gov"
            style={{
              display: 'block', width: '100%', marginTop: '4px',
              background: '#0D1B2A', color: '#fff',
              border: '1px solid #1e3a5f', borderRadius: '8px',
              padding: '10px', fontSize: '0.9rem', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              display: 'block', width: '100%', marginTop: '4px',
              background: '#0D1B2A', color: '#fff',
              border: '1px solid #1e3a5f', borderRadius: '8px',
              padding: '10px', fontSize: '0.9rem', boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', background: '#00B4D8', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '12px',
            fontSize: '1rem', cursor: 'pointer', fontWeight: 600
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0D1B2A', borderRadius: '8px' }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 4px 0' }}>Test accounts:</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0' }}>👤 citizen@ner.gov / test1234</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0' }}>🛡️ official@ner.gov / test1234</p>
        </div>
      </div>
    </div>
  )
}