import './admin.css'
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin • ShipTrak</h2>
          <div>Profile</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
