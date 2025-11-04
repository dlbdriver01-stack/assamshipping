import './globals.css'

export const metadata = {
  title: 'ShipTrak India',
  description: 'Track your parcel across India in real time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  )
}
