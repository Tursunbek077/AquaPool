const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

// O'zbekiston raqami: +998 va 9 ta raqam
export function isValidUzPhone(value) {
  const digits = String(value).replace(/\D/g, '')
  return digits.length === 12 && digits.startsWith('998')
}

export function isFilled(value, minLength = 1) {
  return String(value).trim().length >= minLength
}
