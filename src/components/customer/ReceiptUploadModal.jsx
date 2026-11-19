import { useState } from 'react'
import { ImageUp } from 'lucide-react'
import { saveReceiptData } from '../../services/receiptService'
import { readImageAsDataURL } from '../../utils/image'
import { Button, Modal } from '../common'

// Karta o'tkazmasi cheki (skrinshot) yuklash oynasi. item - paymentService.buildPaymentItems elementi.
export default function ReceiptUploadModal({ item, onClose, onSaved }) {
  const [picked, setPicked] = useState(null) // { dataUrl, name }
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const preview = picked?.dataUrl ?? item.receipt?.dataUrl ?? null

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const dataUrl = await readImageAsDataURL(file, { maxSize: 1000, quality: 0.72 })
      setPicked({ dataUrl, name: file.name })
    } catch (err) {
      setPicked(null)
      setError(err.message)
    } finally {
      setBusy(false)
      event.target.value = ''
    }
  }

  function handleSave() {
    try {
      saveReceiptData(item.key, picked.dataUrl, picked.name)
      onSaved()
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Chek yuklash"
      size="sm"
      footer={
        <>
          <Button variant="soft" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button onClick={handleSave} disabled={!picked || busy}>
            Saqlash
          </Button>
        </>
      }
    >
      <p className="text-sm text-navy-700">
        <strong>{item.title}</strong> uchun karta o'tkazmasi chekining rasmini (skrinshot) yuklang. Administrator
        tekshirib, to'lovni tasdiqlaydi.
      </p>

      <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-aqua-400 bg-aqua-100 p-5 text-center transition-colors hover:border-ocean-300">
        <ImageUp className="size-7 text-ocean-600" aria-hidden="true" />
        <span className="text-sm font-bold">{busy ? 'Yuklanmoqda...' : preview ? 'Boshqa rasm tanlash' : 'Rasm tanlash'}</span>
        <span className="text-xs text-navy-500">JPG, PNG yoki WEBP, 8 MB gacha</span>
        <input type="file" accept="image/*" onChange={handleFile} className="sr-only" aria-label="Chek rasmini tanlash" />
      </label>

      {preview && (
        <figure className="mt-4">
          <img src={preview} alt="Chek rasmi" className="max-h-72 w-full rounded-xl border border-aqua-300 object-contain" />
          <figcaption className="mt-1 text-center text-xs text-navy-500">
            {picked ? `Yangi rasm: ${picked.name}` : `Yuklangan chek: ${item.receipt.name}`}
          </figcaption>
        </figure>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-danger-600">
          {error}
        </p>
      )}
    </Modal>
  )
}
