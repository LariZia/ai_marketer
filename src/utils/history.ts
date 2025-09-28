type HistoryEntry = {
  id: number
  type: 'image' | 'video'
  date: string
  inputs: Record<string, any>
  output: string
}

const KEY = 'history'

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
  } catch {
    return []
  }
}

export function saveToHistory(entry: { type: 'image' | 'video'; date: string; inputs: Record<string, any>; output: string }) {
  const history = getHistory()
  const newEntry: HistoryEntry = { id: Date.now(), ...entry }
  const updated = [newEntry, ...history]
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function deleteFromHistory(id: number) {
  const history = getHistory().filter((x) => x.id !== id)
  localStorage.setItem(KEY, JSON.stringify(history))
}

export function downloadEntry(entry: HistoryEntry) {
  const a = document.createElement('a')
  a.href = entry.output
  a.download = `${entry.inputs?.use_case || 'output'}-${entry.id}.${entry.type === 'video' ? 'mp4' : 'png'}`
  a.click()
}

const WEBHOOK_URL = (import.meta as any).env?.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook/861bcf17-78b0-4a82-82d2-1c560ae1d926'

export async function rerunEntry(entry: HistoryEntry) {
  try {
    const data = new FormData()
    Object.entries(entry.inputs || {}).forEach(([k, v]) => {
      if (typeof v === 'string') data.set(k, v)
    })
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: data,
    })
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const json = await res.json()
      saveToHistory({ type: 'video', date: new Date().toISOString(), inputs: entry.inputs, output: json.videoURL || json.url || json.output })
    } else {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      saveToHistory({ type: 'image', date: new Date().toISOString(), inputs: entry.inputs, output: url })
    }
  } catch (e) {
    console.error('Failed to rerun', e)
    alert('Re-run failed. Please try again.')
  }
}


