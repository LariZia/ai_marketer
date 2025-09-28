// import axios from 'axios'

// const WEBHOOK_URL = (import.meta as any).env?.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook/861bcf17-78b0-4a82-82d2-1c560ae1d926'

// export async function postToWebhook(formData: FormData): Promise<{ type: 'image' | 'video'; outputUrl: string }> {
//   const response = await axios.post(WEBHOOK_URL, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//     responseType: 'arraybuffer',
//     validateStatus: () => true,
//   })

//   const contentType = response.headers['content-type'] || ''
//   if (contentType.includes('application/json')) {
//     const decoder = new TextDecoder('utf-8')
//     const jsonText = decoder.decode(response.data)
//     const json = JSON.parse(jsonText)
//     return { type: 'video', outputUrl: json.videoURL || json.url || json.output }
//   }

//   const blob = new Blob([response.data], { type: 'image/png' })
//   const url = URL.createObjectURL(blob)
//   return { type: 'image', outputUrl: url }
// }

import axios from 'axios'

const WEBHOOK_URL =
  (import.meta as any).env?.VITE_WEBHOOK_URL ||
  'http://localhost:5678/webhook/861bcf17-78b0-4a82-82d2-1c560ae1d926'

export async function postToWebhook(formData: FormData): Promise<{ type: 'image' | 'video'; outputUrl: string }> {
  // --- Normalize use_case before sending ---
  const useCase = formData.get('use_case')
  if (Array.isArray(useCase)) {
    // If somehow n8n/browser turns it into an array, keep only the first element
    formData.set('use_case', useCase[0])
  } else if (useCase instanceof File) {
    // Defensive: shouldn't happen, but make sure it's not a File
    formData.set('use_case', (useCase as unknown as string) || '')
  } else if (useCase !== null) {
    // Ensure it's stringified
    formData.set('use_case', String(useCase))
  }

  // --- Send to webhook ---
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

