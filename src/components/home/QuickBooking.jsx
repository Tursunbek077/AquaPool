import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CalendarDays, Clock, Droplets } from 'lucide-react'
import { TIME_BANDS } from '../../data/initialSchedule'
import { getScheduleDates, getScheduleServices } from '../../services/scheduleService'
import { todayISO } from '../../utils/formatters'
import { Button, Card, Input, Select } from '../common'

const TIME_OPTIONS = TIME_BANDS

// Jadvalda mashg'uloti bor xizmatlar (boshqalari bo'yicha slot topilmasdi)
const SERVICE_OPTIONS = getScheduleServices().map((service) => ({ value: service.id, label: service.title }))

// Tezkor bron paneli: tanlovni Jadval sahifasiga query orqali uzatadi (4-bosqichda o'qiladi).
export default function QuickBooking() {
  const navigate = useNavigate()
  const [service, setService] = useState(SERVICE_OPTIONS[0].value)
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState(TIME_OPTIONS[2].value)

  function handleSubmit(event) {
    event.preventDefault()
    const params = new URLSearchParams({ xizmat: service, sana: date, vaqt: time })
    navigate(`/jadval?${params.toString()}`)
  }

  return (
    <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-8">
      <Card padding="md" className="shadow-pop">
        <form onSubmit={handleSubmit} className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <Select
            label="Xizmat turini tanlang"
            icon={<Droplets className="size-4" />}
            options={SERVICE_OPTIONS}
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quick-date" className="text-xs font-semibold text-navy-500">
              Tashrif sanasi
            </label>
            <Input
              id="quick-date"
              type="date"
              min={todayISO()}
              max={getScheduleDates().at(-1)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={<CalendarDays className="size-4 text-ocean-600" />}
              required
            />
          </div>
          <Select
            label="Qulay vaqt oralig'i"
            icon={<Clock className="size-4" />}
            options={TIME_OPTIONS}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button type="submit" size="md" className="md:col-span-2 lg:col-span-1 lg:h-11">
            Joy band qilish
          </Button>
        </form>
      </Card>
    </div>
  )
}
