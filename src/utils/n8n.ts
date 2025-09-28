import axios from 'axios'

const WEBHOOK_URL = (import.meta as any).env?.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook/861bcf17-78b0-4a82-82d2-1c560ae1d926'

export async function postToWebhook(formData: FormData): Promise<{ type: 'image' | 'video'; outputUrl: string }> {
  const response = await axios.post(WEBHOOK_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'arraybuffer',
    validateStatus: () => true,
  })

  const contentType = response.headers['content-type'] || ''
  if (contentType.includes('application/json')) {
    const decoder = new TextDecoder('utf-8')
    const jsonText = decoder.decode(response.data)
    const json = JSON.parse(jsonText)
    return { type: 'video', outputUrl: json.videoURL || json.url || json.output }
  }

  const blob = new Blob([response.data], { type: 'image/png' })
  const url = URL.createObjectURL(blob)
  return { type: 'image', outputUrl: url }
}


