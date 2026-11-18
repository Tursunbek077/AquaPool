// Sinflarni birlashtiruvchi yordamchi: cn("a", false, "b") => "a b"
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
