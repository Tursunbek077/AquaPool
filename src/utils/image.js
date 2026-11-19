// Rasm faylini kichraytirib, "data:image/jpeg;base64,..." ko'rinishiga o'tkazadi.
// localStorage hajmi cheklangan (~5 MB), shuning uchun rasm albatta kichraytiriladi.

export const MAX_IMAGE_FILE_MB = 8

export function readImageAsDataURL(file, { maxSize = 1000, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Faqat rasm faylini (JPG, PNG, WEBP) tanlang'))
      return
    }
    if (file.size > MAX_IMAGE_FILE_MB * 1024 * 1024) {
      reject(new Error(`Rasm hajmi ${MAX_IMAGE_FILE_MB} MB dan oshmasligi kerak`))
      return
    }

    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const context = canvas.getContext('2d')
      // JPEG shaffoflikni qoraga aylantirmasligi uchun oq fon
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Rasmni o'qib bo'lmadi, boshqa fayl tanlang"))
    }
    image.src = url
  })
}
