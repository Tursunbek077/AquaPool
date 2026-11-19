// To'lov cheklari (karta o'tkazmasi skrinshoti). Kalit: "booking:<id>" yoki "membership:<id>".
// Hozircha localStorage; 6-bosqichda Supabase Storage'ga o'tadi.

import { readImageAsDataURL } from '../utils/image'

const RECEIPTS_KEY = 'aquapool_receipts'

export function loadReceipts() {
  try {
    const raw = localStorage.getItem(RECEIPTS_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export function saveReceiptData(key, dataUrl, name = 'chek.jpg') {
  const receipts = loadReceipts()
  receipts[key] = { dataUrl, name, uploadedAt: new Date().toISOString() }
  try {
    localStorage.setItem(RECEIPTS_KEY, JSON.stringify(receipts))
  } catch {
    throw new Error("Chekni saqlab bo'lmadi: brauzer xotirasi to'lgan. Kichikroq rasm tanlang.")
  }
  return receipts[key]
}

// Faylni kichraytirib saqlaydi
export async function uploadReceipt(key, file) {
  const dataUrl = await readImageAsDataURL(file, { maxSize: 1000, quality: 0.72 })
  return saveReceiptData(key, dataUrl, file.name)
}

export function removeReceipt(key) {
  const receipts = loadReceipts()
  delete receipts[key]
  try {
    localStorage.setItem(RECEIPTS_KEY, JSON.stringify(receipts))
  } catch {
    // e'tiborsiz qoldiriladi
  }
}
