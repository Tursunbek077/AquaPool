import React, { useState } from 'react';
import { 
  Waves, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  ThermometerSun, 
  Award,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [poolSize, setPoolSize] = useState(25); // square meters
  const [poolType, setPoolType] = useState('overflow'); // skimmer, overflow, infinity

  const calculateEstimate = () => {
    let basePricePerSqm = 450;
    if (poolType === 'overflow') basePricePerSqm = 600;
    if (poolType === 'infinity') basePricePerSqm = 850;
    return poolSize * basePricePerSqm;
  };

  const services = [
    {
      icon: <Waves className="w-8 h-8 text-cyan-600" />,
      title: "Premium Hovuzlar Qurish",
      desc: "Kottej, mehmonxona va hovlilar uchun zamonaviy dizayndagi skimmer va toshma (overflow) hovuzlar barpo etish."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Filtratsiya va Suv Tozalash",
      desc: "Yevropa standartidagi avtomatlashgan qumli filtrlar, xlor generatorlari va ultrabinafsha tozalash tizimlari."
    },
    {
      icon: <ThermometerSun className="w-8 h-8 text-amber-500" />,
      title: "Suvni Isitish Tizimlari",
      desc: "Yil davomida 28-32°C haroratni ta'minlovchi issiqlik nasoslari va invertorli tejamkor isitgichlar."
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-600" />,
      title: "24/7 Servis va Kimyoviy Xizmat",
      desc: "Hovuz suvi balansi (pH, CL), tubini changyutgich bilan tozalash va mavsumiy konservatsiya xizmati."
    }
  ];

  const features = [
    "10 yillik rasmiy gidroizolyatsiya kafolati",
    "Germaniya va Ispaniya nasos-uskunalari",
    "3D loyihalash va bepul smeta hisoblash",
    "Energiya tejamkor intellektual boshqaruv"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Aqua<span className="text-cyan-600">Pool</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Premium Pool Systems
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#services" className="hover:text-cyan-600 transition-colors">Xizmatlar</a>
            <a href="#calculator" className="hover:text-cyan-600 transition-colors">Kalkulyator</a>
            <a href="#advantages" className="hover:text-cyan-600 transition-colors">Afzalliklar</a>
            <a href="#contact" className="hover:text-cyan-600 transition-colors">Aloqa</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+998901234567" 
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-cyan-600" />
              <span>+998 (90) 123-45-67</span>
            </a>
            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-cyan-600/20 transition-all hover:shadow-cyan-600/30">
              Smeta Olish
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Xizmatlar</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Kalkulyator</a>
            <a href="#advantages" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Afzalliklar</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-slate-700">Aloqa</a>
            <div className="pt-2">
              <button className="w-full bg-cyan-600 text-white py-2.5 rounded-xl font-semibold">
                Smeta Olish
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-cyan-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold tracking-wide uppercase mb-6">
              <Award className="w-4 h-4 text-cyan-700" />
              O'zbekistonda 1-raqamli Hovuz Qurilishi
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Mukammal Hovuz — Sizning <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Hovlingiz Gavhari</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              3D dizayndan boshlab kalit topshirishgacha bo‘lgan premium hovuzlar. Eng so‘nggi Yevropa texnologiyalari va 10 yillik kafolat.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#calculator" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-cyan-600/25 transition-all hover:scale-[1.02]"
              >
                Narxni Hisoblash
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#services" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-8 py-4 rounded-2xl font-bold text-base shadow-sm transition-all"
              >
                Xizmatlarimiz
              </a>
            </div>

            {/* Quick Badges */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white/70 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-cyan-600 mb-3">Bizning Yo‘nalishlar</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Barcha Bosqichlarda Professional Yondashuv
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200 hover:border-cyan-200 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-cyan-700 group-hover:text-cyan-800">
                  Batafsil ma'lumot <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Price Calculator */}
      <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5" />
              Onlayn Kalkulyator
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Hovuzingiz Taxminiy Qiymatini Hisoblang
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              O‘lchami va turini tanlang, biz sizga mos byudjetni taqdim etamiz.
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                    <span>Hovuz maydoni:</span>
                    <span className="text-cyan-400 font-bold text-base">{poolSize} m²</span>
                  </label>
                  <input 
                    type="range" 
                    min="15" 
                    max="100" 
                    step="5"
                    value={poolSize}
                    onChange={(e) => setPoolSize(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>15 m² (Kichik)</span>
                    <span>50 m² (O'rta)</span>
                    <span>100 m² (Katta)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Hovuz turi:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'skimmer', label: 'Skimmer' },
                      { id: 'overflow', label: 'Toshma (Lotin)' },
                      { id: 'infinity', label: 'Infinity (Premium)' }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setPoolType(type.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          poolType === type.id 
                            ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                            : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-gradient-to-br from-cyan-950/70 to-slate-900 p-6 rounded-2xl border border-cyan-800/40 text-center flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
                    Taxminiy Umumiy Qiymat:
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
                    ~${calculateEstimate().toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    * Qazish, gidroizolyatsiya, kafel, filtratsiya va montaj xizmatlari ichida
                  </p>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/25">
                    Aniq Bepul Smeta Buyurtma Qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
              <Waves className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">AquaPool</span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AquaPool. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-cyan-400 transition-colors">Telegram</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
            <a href="tel:+998901234567" className="text-cyan-400 font-bold hover:underline">+998 90 123 45 67</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
