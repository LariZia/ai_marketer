import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveToHistory } from '../utils/history.ts'
import { postToWebhook } from '../utils/n8n.ts'

export default function Thumbnails() {
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('use_case', 'thumbnails')
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
        <h2 className="text-xl font-semibold text-slate-800">Thumbnails</h2>
        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-slate-600">Video title</span>
            <input name="video_title" placeholder="Ex: How to prune tomato plants" className="input mt-1 w-full" required />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Hook</span>
            <input name="hook" placeholder="Ex: 3 mistakes you're making today" className="input mt-1 w-full" />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Layout</span>
            <select name="layout" className="input mt-1 w-full">
              <option>YouTube</option>
              <option>Instagram</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm text-slate-600">Size</span>
            <input name="size" placeholder="Ex: 20" defaultValue="20" className="input mt-1 w-full" required />
          </label>
          <label className="block md:col-span-2">
            <span className="block text-sm text-slate-600">Avatar image (optional)</span>
            <input name="avatar" type="file" accept="image/*" className="file:mr-3 file:px-3 file:py-2 file:rounded-md file:border file:bg-slate-50 file:text-slate-700 mt-1" onChange={(e) => {
              const file = e.target.files?.[0]
              setAvatarPreview(file ? URL.createObjectURL(file) : null)
            }} />
          </label>
          {avatarPreview && (
            <div className="md:col-start-2">
              <div className="text-sm text-slate-600 mb-1">Avatar preview</div>
              <img src={avatarPreview} className="w-full rounded-md border border-slate-200" />
            </div>
          )}
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


