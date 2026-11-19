// Ichki sahifalar tepasidagi sarlavha bloki: yorliq, katta sarlavha, izoh va o'ng tomondagi qo'shimcha blok.
export default function PageHeader({ eyebrow, title, description, aside, children }) {
  return (
    <header className="bg-gradient-to-b from-aqua-100 to-aqua-50">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-8 sm:pt-14">
        {eyebrow && <div className="mb-5">{eyebrow}</div>}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">{description}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </header>
  )
}
