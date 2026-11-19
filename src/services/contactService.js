// Aloqa formalari va "qo'ng'iroq qilib bering" so'rovlari.
// Hozircha brauzer xotirasida (localStorage) saqlanadi; 6-bosqichda Supabase'ga o'tkaziladi.
// Sahifalar faqat shu funksiyalarni chaqiradi, shuning uchun almashtirish oson.

const STORAGE_KEY = 'aquapool_requests'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Xotira to'la yoki bloklangan bo'lsa ham sayt ishlashda davom etadi
  }
}

async function save(kind, payload) {
  const items = readAll()
  const record = { id: Date.now(), kind, createdAt: new Date().toISOString(), ...payload }
  writeAll([record, ...items])
  // Tarmoq kechikishini taqlid qilamiz, 6-bosqichda haqiqiy so'rov bo'ladi
  await new Promise((resolve) => setTimeout(resolve, 400))
  return record
}

// kind: 'callback' (telefon qoldirish) yoki 'message' (aloqa formasi)
export function sendCallbackRequest({ phone, source }) {
  return save('callback', { phone, source })
}

export function sendContactMessage({ name, phone, message }) {
  return save('message', { name, phone, message })
}
