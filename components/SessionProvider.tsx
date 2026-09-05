// import type { Metadata } from 'next'
// import { Geist } from 'next/font/google'
// import './globals.css'
// import { SessionProvider } from '@/components/SessionProvider'

// const geist = Geist({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'NER Logistics Intelligence Platform',
//   description: 'AI-Based Smart Logistics and Accessibility Intelligence Platform for North Eastern Region',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={geist.className} style={{ margin: 0, padding: 0 }}>
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }

// 'use client'
// import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

// export function SessionProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <NextAuthSessionProvider>
//       {children}
//     </NextAuthSessionProvider>
//   )
// }

'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}