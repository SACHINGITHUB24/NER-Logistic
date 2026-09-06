// 'use client'
// import { useState } from 'react'
// // import { signIn } from 'next-auth/react'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async () => {
//     setLoading(true)
//     setError('')
//     const res = await signIn('credentials', {
//       email, password, redirect: false
//     })
//     setLoading(false)
//     if (res?.ok) {
//       router.push('/')
//     } else {
//       setError('Invalid email or password')
//     }
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: '#0D1B2A',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       <div style={{
//         background: '#112240',
//         border: '1px solid #1e3a5f',
//         borderRadius: '16px',
//         padding: '2.5rem',
//         width: '100%',
//         maxWidth: '400px'
//       }}>
//         <h1 style={{ color: '#00B4D8', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
//           🗺️ NER Logistics
//         </h1>
//         <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
//           Intelligence Platform — Sign in to continue
//         </p>

//         <div style={{ marginBottom: '1rem' }}>
//           <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             placeholder="you@ner.gov"
//             style={{
//               display: 'block', width: '100%', marginTop: '4px',
//               background: '#0D1B2A', color: '#fff',
//               border: '1px solid #1e3a5f', borderRadius: '8px',
//               padding: '10px', fontSize: '0.9rem', boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '1.5rem' }}>
//           <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             placeholder="••••••••"
//             onKeyDown={e => e.key === 'Enter' && handleLogin()}
//             style={{
//               display: 'block', width: '100%', marginTop: '4px',
//               background: '#0D1B2A', color: '#fff',
//               border: '1px solid #1e3a5f', borderRadius: '8px',
//               padding: '10px', fontSize: '0.9rem', boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         {error && (
//           <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           style={{
//             width: '100%', background: '#00B4D8', color: '#fff',
//             border: 'none', borderRadius: '8px', padding: '12px',
//             fontSize: '1rem', cursor: 'pointer', fontWeight: 600
//           }}
//         >
//           {loading ? 'Signing in...' : 'Sign In'}
//         </button>

//         <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0D1B2A', borderRadius: '8px' }}>
//           <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 4px 0' }}>Test accounts:</p>
//           <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0' }}>👤 citizen@ner.gov / test1234</p>
//           <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0' }}>🛡️ official@ner.gov / test1234</p>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSignIn = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/')
  }

  const handleRegister = async () => {
    if (!email || !password || !name) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.error || 'Registration failed')
    } else {
      setSuccess('Account created! Signing you in...')
      await signIn('credentials', { email, password, redirect: false })
      router.push('/')
    }
  }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', marginTop: '6px',
    background: '#0a0f1a', color: '#f1f5f9',
    border: '1px solid #1e293b', borderRadius: '8px',
    padding: '11px 14px', fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1a',
      display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Top bar */}
      <div style={{
        padding: '1rem 1.25rem', borderBottom: '1px solid #1e293b',
        display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'
      }} onClick={() => router.push('/landing')}>
        <div style={{
          width: '30px', height: '30px',
          background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
          borderRadius: '7px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '0.9rem'
        }}>🗺️</div>
        <span style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.9rem' }}>NER Logistics</span>
        <span style={{ color: '#334155', fontSize: '0.82rem' }}>← Back</span>
      </div>

      {/* Form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '2rem 1.25rem'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f1f5f9', marginBottom: '6px' }}>
              {tab === 'signin' ? 'Welcome back' : 'Create account'}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
              {tab === 'signin'
                ? 'Sign in to access the NER Logistics dashboard'
                : 'Join as a field reporter for NER Logistics'}
            </div>
          </div>

          {/* Tab */}
          <div style={{
            display: 'flex', background: '#0f172a', borderRadius: '10px',
            padding: '4px', marginBottom: '1.25rem', border: '1px solid #1e293b'
          }}>
            {(['signin', 'register'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }} style={{
                flex: 1, padding: '9px', borderRadius: '7px', border: 'none',
                background: tab === t ? '#0ea5e9' : 'transparent',
                color: tab === t ? '#fff' : '#64748b',
                fontSize: '0.85rem', fontWeight: tab === t ? 700 : 400,
                cursor: 'pointer'
              }}>
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Card */}
          <div style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '14px', padding: '1.5rem',
            boxShadow: '0 0 40px #00000066'
          }}>
            {tab === 'register' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600 }}>Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name" style={inputStyle} />
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle}
                onKeyDown={e => e.key === 'Enter' && (tab === 'signin' ? handleSignIn() : handleRegister())} />
            </div>

            {error && (
              <div style={{
                background: '#ef444415', border: '1px solid #ef444433',
                borderRadius: '8px', padding: '10px 14px',
                color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem'
              }}>⚠️ {error}</div>
            )}
            {success && (
              <div style={{
                background: '#22c55e15', border: '1px solid #22c55e33',
                borderRadius: '8px', padding: '10px 14px',
                color: '#22c55e', fontSize: '0.8rem', marginBottom: '1rem'
              }}>✓ {success}</div>
            )}

            <button
              onClick={tab === 'signin' ? handleSignIn : handleRegister}
              disabled={loading || !email || !password || (tab === 'register' && !name)}
              style={{
                width: '100%', padding: '12px',
                background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                border: 'none', borderRadius: '8px', color: '#fff',
                fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                opacity: loading || !email || !password ? 0.6 : 1,
                boxShadow: '0 0 20px #0ea5e933'
              }}>
              {loading ? '...' : tab === 'signin' ? 'Sign In →' : 'Create Account →'}
            </button>
          </div>

          {/* Official note */}
          <div style={{
            background: '#FF993311', border: '1px solid #FF993322',
            borderRadius: '10px', padding: '0.875rem', marginTop: '0.875rem',
            textAlign: 'center'
          }}>
            <div style={{ color: '#FF9933', fontSize: '0.75rem', fontWeight: 600, marginBottom: '3px' }}>
              🛡️ Official Access
            </div>
            <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
              Official accounts are pre-authorized. Contact your district administrator for credentials.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
