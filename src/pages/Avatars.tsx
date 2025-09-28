import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveToHistory } from '../utils/history.ts'
import { postToWebhook } from '../utils/n8n.ts'

export default function Avatars() {
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('use_case', 'avatar_generation')
    try {
      setLoading(true)
      setResultUrl(null)
      const { type, outputUrl } = await postToWebhook(data)
      setResultUrl(outputUrl)
      saveToHistory({ type, date: new Date().toISOString(), inputs: Object.fromEntries(data), output: outputUrl })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800">Avatar Builder</h2>
        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-600">Mascot type</span>
            <input name="mascot" placeholder="Ex: Robot, animal, person" className="input mt-1 w-full" required />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Hair</span>
            <input name="hair" placeholder="Ex: Short brown hair" className="input mt-1 w-full" />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Skin</span>
            <input name="skin" placeholder="Ex: Warm tan" className="input mt-1 w-full" />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Clothing</span>
            <input name="clothing" placeholder="Ex: Blue hoodie, jeans" className="input mt-1 w-full" />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Emblem</span>
            <input name="emblem" placeholder="Ex: Lightning bolt badge" className="input mt-1 w-full" />
          </label>
          <div className="md:col-span-2">
            <button disabled={loading} className="btn-primary w-full md:w-auto">{loading ? 'Generating…' : 'Generate'}</button>
          </div>
        </form>
      </div>

      {resultUrl && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Result</h3>
          <img src={resultUrl} className="w-full rounded-md" />
        </motion.div>
      )}
    </div>
  )
}


