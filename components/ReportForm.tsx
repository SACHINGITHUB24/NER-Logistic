// 'use client'
// import { useEffect, useState } from 'react'

// type Road = {
//   id: string
//   name: string
//   status: string
// }

// export default function ReportForm() {
//   const [roads, setRoads] = useState<Road[]>([])
//   const [roadId, setRoadId] = useState('')
//   const [severity, setSeverity] = useState('MINOR')
//   const [description, setDescription] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//   useEffect(() => {
//     fetch('/api/roads').then(r => r.json()).then(setRoads)
//   }, [])

//   const handleSubmit = async () => {
//     if (!roadId || !description) return
//     setLoading(true)
//     await fetch('/api/reports', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ roadId, severity, description })
//     })
//     setLoading(false)
//     setSuccess(true)
//     setDescription('')
//     setTimeout(() => setSuccess(false), 3000)
//   }

//   return (
//     <div style={{
//       background: '#112240',
//       border: '1px solid #1e3a5f',
//       borderRadius: '12px',
//       padding: '1.5rem',
//       marginTop: '1rem'
//     }}>
//       <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
//         🚨 Report Road Issue
//       </h2>

//       <div style={{ marginBottom: '1rem' }}>
//         <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select Road</label>
//         <select
//           value={roadId}
//           onChange={e => setRoadId(e.target.value)}
//           style={{
//             display: 'block', width: '100%', marginTop: '4px',
//             background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
//             borderRadius: '8px', padding: '8px', fontSize: '0.9rem'
//           }}
//         >
//           <option value="">-- Select a road --</option>
//           {roads.map(r => (
//             <option key={r.id} value={r.id}>{r.name}</option>
//           ))}
//         </select>
//       </div>

//       <div style={{ marginBottom: '1rem' }}>
//         <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Severity</label>
//         <div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
//           {['MINOR', 'MAJOR', 'BLOCKED'].map(s => (
//             <label key={s} style={{ color: severity === s ? '#00B4D8' : '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}>
//               <input
//                 type="radio"
//                 value={s}
//                 checked={severity === s}
//                 onChange={() => setSeverity(s)}
//                 style={{ marginRight: '4px' }}
//               />
//               {s}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div style={{ marginBottom: '1rem' }}>
//         <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Description</label>
//         <textarea
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           placeholder="Describe the issue..."
//           rows={3}
//           style={{
//             display: 'block', width: '100%', marginTop: '4px',
//             background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
//             borderRadius: '8px', padding: '8px', fontSize: '0.9rem',
//             resize: 'none', boxSizing: 'border-box'
//           }}
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={loading || !roadId || !description}
//         style={{
//           background: loading ? '#1e3a5f' : '#00B4D8',
//           color: '#fff', border: 'none', borderRadius: '8px',
//           padding: '10px 24px', cursor: 'pointer', fontSize: '0.9rem',
//           opacity: !roadId || !description ? 0.5 : 1
//         }}
//       >
//         {loading ? 'Submitting...' : 'Submit Report'}
//       </button>

//       {success && (
//         <p style={{ color: '#22c55e', marginTop: '0.75rem', fontSize: '0.85rem' }}>
//           ✅ Report submitted successfully!
//         </p>
//       )}
//     </div>
//   )
// }


// 'use client'
// import { useEffect, useState } from 'react'

// type Road = { id: string; name: string }
// type MyReport = {
//   id: string
//   severity: string
//   description: string
//   status: string
//   createdAt: string
//   road: { name: string }
// }

// export default function ReportForm() {
//   const [roads, setRoads] = useState<Road[]>([])
//   const [roadId, setRoadId] = useState('')
//   const [severity, setSeverity] = useState('MINOR')
//   const [description, setDescription] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [myReports, setMyReports] = useState<MyReport[]>([])

//   useEffect(() => {
//     fetch('/api/roads').then(r => r.json()).then(setRoads)
//     fetchMyReports()
//     const interval = setInterval(fetchMyReports, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const fetchMyReports = async () => {
//     const res = await fetch('/api/reports/my')
//     if (res.ok) setMyReports(await res.json())
//   }

//   const handleSubmit = async () => {
//     if (!roadId || !description) return
//     setLoading(true)
//     await fetch('/api/reports', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ roadId, severity, description })
//     })
//     setLoading(false)
//     setSuccess(true)
//     setDescription('')
//     setRoadId('')
//     fetchMyReports()
//     setTimeout(() => setSuccess(false), 3000)
//   }

//   const getStatusColor = (status: string) => {
//     if (status === 'APPROVED') return '#22c55e'
//     if (status === 'REJECTED') return '#ef4444'
//     return '#f59e0b'
//   }

//   const getStatusIcon = (status: string) => {
//     if (status === 'APPROVED') return '✅'
//     if (status === 'REJECTED') return '❌'
//     return '⏳'
//   }

//   return (
//     <div>
//       {/* Report Form */}
//       <div style={{
//         background: '#112240', border: '1px solid #1e3a5f',
//         borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem'
//       }}>
//         <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
//           🚨 Report Road Issue
//         </h2>

//         <div style={{ marginBottom: '1rem' }}>
//           <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select Road</label>
//           <select
//             value={roadId}
//             onChange={e => setRoadId(e.target.value)}
//             style={{
//               display: 'block', width: '100%', marginTop: '4px',
//               background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
//               borderRadius: '8px', padding: '8px', fontSize: '0.9rem'
//             }}
//           >
//             <option value="">-- Select a road --</option>
//             {roads.map(r => (
//               <option key={r.id} value={r.id}>{r.name}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Severity</label>
//           <div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
//             {['MINOR', 'MAJOR', 'BLOCKED'].map(s => (
//               <label key={s} style={{ color: severity === s ? '#00B4D8' : '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}>
//                 <input type="radio" value={s} checked={severity === s}
//                   onChange={() => setSeverity(s)} style={{ marginRight: '4px' }} />
//                 {s}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Description</label>
//           <textarea
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             placeholder="Describe the issue..."
//             rows={3}
//             style={{
//               display: 'block', width: '100%', marginTop: '4px',
//               background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
//               borderRadius: '8px', padding: '8px', fontSize: '0.9rem',
//               resize: 'none', boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading || !roadId || !description}
//           style={{
//             background: '#00B4D8', color: '#fff', border: 'none',
//             borderRadius: '8px', padding: '10px 24px', cursor: 'pointer',
//             fontSize: '0.9rem', opacity: !roadId || !description ? 0.5 : 1
//           }}
//         >
//           {loading ? 'Submitting...' : 'Submit Report'}
//         </button>

//         {success && (
//           <p style={{ color: '#22c55e', marginTop: '0.75rem', fontSize: '0.85rem' }}>
//             ✅ Report submitted! Waiting for Official approval.
//           </p>
//         )}
//       </div>

//       {/* My Reports */}
//       {myReports.length > 0 && (
//         <div style={{
//           background: '#112240', border: '1px solid #1e3a5f',
//           borderRadius: '12px', padding: '1.25rem'
//         }}>
//           <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
//             📋 My Reports
//           </h2>
//           {myReports.map(report => (
//             <div key={report.id} style={{
//               background: '#0D1B2A', border: '1px solid #1e3a5f',
//               borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem'
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
//                 <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
//                   {report.road.name}
//                 </span>
//                 <span style={{
//                   color: getStatusColor(report.status),
//                   fontSize: '0.8rem', fontWeight: 600
//                 }}>
//                   {getStatusIcon(report.status)} {report.status}
//                 </span>
//               </div>
//               <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
//                 {report.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


'use client'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'

type Road = { id: string; name: string }
type MyReport = {
  id: string
  severity: string
  description: string
  status: string
  createdAt: string
  imageUrl?: string
  road: { name: string }
}

export default function ReportForm() {
  const [roads, setRoads] = useState<Road[]>([])
  const [roadId, setRoadId] = useState('')
  const [severity, setSeverity] = useState('MINOR')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [myReports, setMyReports] = useState<MyReport[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    fetch('/api/roads').then(r => r.json()).then(setRoads)
    fetchMyReports()
    const interval = setInterval(fetchMyReports, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchMyReports = async () => {
    const res = await fetch('/api/reports/my')
    if (res.ok) setMyReports(await res.json())
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async () => {
    if (!roadId || !description) return
    setLoading(true)

    let imageUrl: string | null = null

    // Upload image first if one is selected
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (uploadRes.ok) {
        const data = await uploadRes.json()
        imageUrl = data.url
      }
    }

    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ roadId, severity, description, imageUrl })
      body: JSON.stringify({ roadId, severity, description, imageUrl, userId: (session?.user as any)?.id })
    })

    setLoading(false)
    setSuccess(true)
    setDescription('')
    setRoadId('')
    setSeverity('MINOR')
    removeImage()
    fetchMyReports()
    setTimeout(() => setSuccess(false), 3000)
  }

  const getStatusColor = (status: string) => {
    if (status === 'APPROVED') return '#22c55e'
    if (status === 'REJECTED') return '#ef4444'
    return '#f59e0b'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'APPROVED') return '✅'
    if (status === 'REJECTED') return '❌'
    return '⏳'
  }

  return (
    <div>
      {/* Report Form */}
      <div style={{
        background: '#112240', border: '1px solid #1e3a5f',
        borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem'
      }}>
        <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
          🚨 Report Road Issue
        </h2>

        {/* Road select */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select Road</label>
          <select
            value={roadId}
            onChange={e => setRoadId(e.target.value)}
            style={{
              display: 'block', width: '100%', marginTop: '4px',
              background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
              borderRadius: '8px', padding: '8px', fontSize: '0.9rem'
            }}
          >
            <option value="">-- Select a road --</option>
            {roads.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Severity</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
            {(['MINOR', 'MAJOR', 'BLOCKED'] as const).map(s => (
              <label key={s} style={{
                color: severity === s ? '#00B4D8' : '#94a3b8',
                cursor: 'pointer', fontSize: '0.9rem'
              }}>
                <input type="radio" value={s} checked={severity === s}
                  onChange={() => setSeverity(s)} style={{ marginRight: '4px' }} />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            rows={3}
            style={{
              display: 'block', width: '100%', marginTop: '4px',
              background: '#0D1B2A', color: '#fff', border: '1px solid #1e3a5f',
              borderRadius: '8px', padding: '8px', fontSize: '0.9rem',
              resize: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Image upload */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
            📷 Photo Evidence (optional)
          </label>

          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #1e3a5f', borderRadius: '8px',
                padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
                background: '#0D1B2A', transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#00B4D8')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e3a5f')}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>📸</div>
              <div style={{ color: '#64748b', fontSize: '0.82rem' }}>
                Click to upload or take photo
              </div>
              <div style={{ color: '#334155', fontSize: '0.75rem', marginTop: '4px' }}>
                JPG, PNG, WEBP supported
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%', maxHeight: '200px', objectFit: 'cover',
                  borderRadius: '8px', border: '1px solid #1e3a5f'
                }}
              />
              <button
                onClick={removeImage}
                style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: '#ef4444', color: '#fff', border: 'none',
                  borderRadius: '50%', width: '28px', height: '28px',
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >✕</button>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>
                {imageFile?.name}
              </div>
            </div>
          )}

          {/* Hidden file input — accept images + camera on mobile */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !roadId || !description}
          style={{
            background: '#00B4D8', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '10px 24px', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: 600,
            opacity: !roadId || !description ? 0.5 : 1,
            width: '100%'
          }}
        >
          {loading ? (imageFile ? '📤 Uploading photo...' : 'Submitting...') : 'Submit Report'}
        </button>

        {success && (
          <p style={{ color: '#22c55e', marginTop: '0.75rem', fontSize: '0.85rem', textAlign: 'center' }}>
            ✅ Report submitted! Waiting for Official approval.
          </p>
        )}
      </div>

      {/* My Reports */}
      {myReports.length > 0 && (
        <div style={{
          background: '#112240', border: '1px solid #1e3a5f',
          borderRadius: '12px', padding: '1.25rem'
        }}>
          <h2 style={{ color: '#00B4D8', marginBottom: '1rem', fontSize: '1.1rem' }}>
            📋 My Reports
          </h2>
          {myReports.map(report => (
            <div key={report.id} style={{
              background: '#0D1B2A', border: '1px solid #1e3a5f',
              borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                  {report.road.name}
                </span>
                <span style={{ color: getStatusColor(report.status), fontSize: '0.8rem', fontWeight: 600 }}>
                  {getStatusIcon(report.status)} {report.status}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 6px' }}>
                {report.description}
              </p>
              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Report photo"
                  style={{
                    width: '100%', maxHeight: '120px', objectFit: 'cover',
                    borderRadius: '6px', border: '1px solid #1e3a5f'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}