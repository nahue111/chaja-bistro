import { useState } from 'react'
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react'

const steps = [
  { n: '1', title: 'Elegí tu Chajá', desc: 'Seleccioná la variedad y el tamaño que querés.' },
  { n: '2', title: 'Nos contactás', desc: 'Mandanos tu pedido por WhatsApp o en el formulario.' },
  { n: '3', title: 'Coordinamos entrega', desc: 'Te confirmamos fecha, hora y lugar de retiro o envío.' },
  { n: '4', title: 'Lo disfrutás', desc: 'Llega en caja isotérmica, listo para servir.' },
]

const INITIAL = { name: '', email: '', producto: '', mensaje: '' }

export default function Order() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Tu nombre es requerido'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.producto) e.producto = 'Elegí un producto'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setError(errs); return }
    setError({})
    setSubmitted(true)
  }

  const Field = ({ id, label, error: fieldError, children }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-espresso-700 text-xs font-medium tracking-wide uppercase">{label}</label>
      {children}
      {fieldError && <p className="text-red-500 text-xs mt-0.5">{fieldError}</p>}
    </div>
  )

  return (
    <section id="pedidos" className="bg-cream-50 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-amber" />
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Pedidos</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight mb-10">
              ¿Cómo hacés<br /><span className="italic text-amber-dark">tu pedido?</span>
            </h2>

            <div className="space-y-7 mb-14">
              {steps.map((s) => (
                <div key={s.n} className="flex items-start gap-5">
                  <span className="font-mono text-xs text-amber bg-amber/10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">{s.n}</span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-espresso-800 mb-1">{s.title}</h4>
                    <p className="text-espresso-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-cream-200 pt-10">
              {[
                { icon: Phone, text: '+598 99 283 417', sub: 'WhatsApp disponible' },
                { icon: MapPin, text: 'Paysandú, Uruguay', sub: 'Envíos a todo el país' },
                { icon: Clock, text: 'Lun – Sáb, 9:00 – 18:00', sub: 'Pedidos con 48 hs de anticipación' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-start gap-4">
                  <Icon size={18} strokeWidth={1.5} className="text-amber mt-0.5 shrink-0" />
                  <div>
                    <p className="text-espresso-700 text-sm font-medium">{text}</p>
                    <p className="text-espresso-400 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-16 px-8 bg-cream-100 rounded-2xl border border-cream-200">
                <CheckCircle size={40} strokeWidth={1.5} className="text-amber" />
                <h3 className="font-display text-2xl text-espresso-800">Pedido recibido</h3>
                <p className="text-espresso-500 text-sm leading-relaxed max-w-[40ch]">Te contactamos en menos de 24 horas para coordinar los detalles.</p>
                <button className="mt-4 text-sm text-amber underline underline-offset-2" onClick={() => { setForm(INITIAL); setSubmitted(false) }}>Hacer otro pedido</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-cream-100 rounded-2xl border border-cream-200 p-8 md:p-10 flex flex-col gap-5">
                <h3 className="font-display text-2xl text-espresso-800 mb-1">Envianos tu pedido</h3>
                <p className="text-espresso-400 text-sm -mt-3 mb-2">Respondemos en menos de 24 horas hábiles.</p>

                <Field id="name" label="Nombre completo" error={error.name}>
                  <input id="name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tu nombre"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-espresso-800 text-sm placeholder-espresso-300 focus:outline-none focus:ring-2 focus:ring-amber/40 transition-all ${error.name ? 'border-red-400' : 'border-cream-200'}`} />
                </Field>

                <Field id="email" label="Email" error={error.email}>
                  <input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@email.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-espresso-800 text-sm placeholder-espresso-300 focus:outline-none focus:ring-2 focus:ring-amber/40 transition-all ${error.email ? 'border-red-400' : 'border-cream-200'}`} />
                </Field>

                <Field id="producto" label="Producto" error={error.producto}>
                  <select id="producto" value={form.producto} onChange={e => setForm(f => ({ ...f, producto: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-espresso-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 transition-all appearance-none ${error.producto ? 'border-red-400' : 'border-cream-200'}`}>
                    <option value="" disabled>Elegí tu Chajá</option>
                    <optgroup label="── Tortas ──">
                      <option value="clasico-600">Torta Chajá 600 gr — $625</option>
                      <option value="especial-1200">Torta Chajá Especial Clásico 1200 gr — $1150</option>
                      <option value="gold-1200">Torta Chajá Gold 1200 gr — $1150</option>
                      <option value="fragil-1500">Torta Chajá Frágil 1500 gr — $1590</option>
                    </optgroup>
                    <optgroup label="── Petit & Packs ──">
                      <option value="petit-durazno">Petit Helado con Durazno — $113</option>
                      <option value="petit-ddl">Petit Helado con Dulce de Leche — $113</option>
                      <option value="pack-durazno">Chajá con Durazno Pack x3 — $396</option>
                      <option value="triple-sabor">Chajá Triple Sabor — $152</option>
                      <option value="frutilla">Chajá con Frutilla 120 gr — $152</option>
                      <option value="frutos-bosque">Chajá con Frutos del Bosque 120 gr — $152</option>
                    </optgroup>
                  </select>
                </Field>

                <Field id="mensaje" label="Mensaje adicional (opcional)">
                  <textarea id="mensaje" rows={3} value={form.mensaje} onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))} placeholder="Cantidad, fecha de entrega, dedicatoria..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-cream-200 text-espresso-800 text-sm placeholder-espresso-300 focus:outline-none focus:ring-2 focus:ring-amber/40 transition-all resize-none" />
                </Field>

                <button type="submit" className="mt-2 w-full py-4 rounded-full bg-espresso-800 text-cream-50 font-medium text-sm tracking-wide hover:bg-espresso-700 transition-all duration-300 active:scale-[0.98]">
                  Enviar pedido
                </button>

                <p className="text-center text-espresso-400 text-xs">
                  O escribinos por{' '}
                  <a href="https://wa.me/59899283417" className="text-amber underline underline-offset-2" target="_blank" rel="noreferrer">WhatsApp</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
