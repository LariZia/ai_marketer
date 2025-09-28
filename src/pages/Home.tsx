import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-800">AI Marketing Creator Engine</h1>
        <p className="text-slate-600 mt-2">Quickly create services, product creatives, thumbnails, and avatars.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickCard title="Services" href="/services" />
        <QuickCard title="Products" href="/products" />
        <QuickCard title="Thumbnails" href="/thumbnails" />
        <QuickCard title="Avatars" href="/avatars" />
      </div>
    </div>
  )
}

function QuickCard({ title, href }: { title: string; href: string }) {
  return (
    <Link to={href} className="rounded-xl bg-white shadow-sm p-5 hover:shadow-md transition-shadow border border-slate-100">
      <div className="text-slate-700 font-medium">{title}</div>
      <div className="text-slate-500 text-sm mt-1">Open {title} generator</div>
    </Link>
  )
}


