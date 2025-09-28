import { useEffect, useState } from 'react'
import { getHistory, deleteFromHistory, rerunEntry, downloadEntry } from '../utils/history.ts'

export default function HistoryPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setItems(getHistory())
  }, [])

  function onDelete(id: number) {
    deleteFromHistory(id)
    setItems(getHistory())
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800">History</h2>
        {items.length === 0 ? (
          <p className="text-slate-600 mt-2">No history yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {items.map((e) => (
              <div key={e.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="aspect-video bg-slate-50 flex items-center justify-center">
                  {e.type === 'video' ? (
                    <video src={e.output} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={e.output} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4 text-sm">
                  <div className="font-medium text-slate-700">{e.inputs?.use_case}</div>
                  <div className="text-slate-500">{new Date(e.date).toLocaleString()}</div>
                  <div className="flex gap-2 mt-3">
                    <button className="btn-secondary" onClick={() => downloadEntry(e)}>Download</button>
                    <button className="btn-secondary" onClick={() => rerunEntry(e)}>Re-run</button>
                    <button className="btn-danger ml-auto" onClick={() => onDelete(e.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


