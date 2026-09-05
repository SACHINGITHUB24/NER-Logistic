// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData()
//     const file = formData.get('file') as File
//     if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: 'ner-logistics', resource_type: 'image' },
//         (error, result) => {
//           if (error || !result) reject(error)
//           else resolve(result as { secure_url: string })
//         }
//       ).end(buffer)
//     })

//     return NextResponse.json({ url: result.secure_url })
//   } catch (err) {
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
//   }
// }

// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req: Request) {
//   try {
//     // Check env vars are loaded
//     console.log('Cloudinary config:', {
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       has_secret: !!process.env.CLOUDINARY_API_SECRET
//     })

//     const formData = await req.formData()
//     const file = formData.get('file') as File
//     if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: 'ner-logistics', resource_type: 'image' },
//         (error, result) => {
//           if (error || !result) {
//             console.error('Cloudinary error:', error)
//             reject(error)
//           } else {
//             resolve(result as { secure_url: string })
//           }
//         }
//       ).end(buffer)
//     })

//     return NextResponse.json({ url: result.secure_url })
//   } catch (err) {
//     console.error('Upload route error:', err)
//     return NextResponse.json({ error: String(err) }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    // Use Cloudinary unsigned upload — no API secret needed
    const cloudinaryForm = new FormData()
    cloudinaryForm.append('file', file)
    cloudinaryForm.append('upload_preset', 'ner_logistics')
    cloudinaryForm.append('folder', 'ner-logistics')

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: cloudinaryForm }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Cloudinary response:', err)
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ url: data.secure_url })

  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}