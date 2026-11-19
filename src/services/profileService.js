// Mijoz profili (ism, telefon, avatar). Hozircha brauzer xotirasida;
// 6-bosqichda haqiqiy akkaunt (Supabase Auth) bilan almashtiriladi.
// Telefon raqami bronlarni mijozga bog'lash uchun ishlatiladi.

const PROFILE_KEY = 'aquapool_profile'

export const EMPTY_PROFILE = { name: '', phone: '', avatar: '' }

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed && typeof parsed === 'object' ? { ...EMPTY_PROFILE, ...parsed } : EMPTY_PROFILE
  } catch {
    return EMPTY_PROFILE
  }
}

export function saveProfile(profile) {
  const next = { ...EMPTY_PROFILE, ...profile }
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  } catch {
    throw new Error("Profilni saqlab bo'lmadi. Rasm juda katta bo'lishi yoki brauzer xotirasi bloklangan bo'lishi mumkin.")
  }
  return next
}

export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY)
  } catch {
    // e'tiborsiz qoldiriladi
  }
  return EMPTY_PROFILE
}
