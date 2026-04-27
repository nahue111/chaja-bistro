import { useRef, useState } from 'react'
import { ShoppingBag } from 'lucide-react'

const categories = {
  tortas: {
    label: 'Tortas',
    products: [
      {
        id: 'clasico-600',
        name: 'Torta Chajá 600 gr',
        tag: 'El clásico',
        price: '$625',
        weight: '600 gr',
        description:
          'Postre cilíndrico cubierto de merengue característico, sabor a bizcochuelo, durazno o chocolate o dulce de leche y crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg',
      },
      {
        id: 'especial-1200',
        name: 'Torta Chajá Especial Clásico 1200 gr',
        tag: 'Especial',
        price: '$1150',
        weight: '1200 gr',
        description:
          'Chajá® con durazno ó frutilla, cubierto de merengue característico sobre bizcochuelo con chantilly.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://www.196flavors.com/wp-content/uploads/2019/01/chaja-3.jpg',
      },
      {
        id: 'gold-1200',
        name: 'Torta Chajá Gold 1200 gr',
        tag: 'Gold',
        price: '$1150',
        weight: '1200 gr',
        description:
          'Chajá® con durazno y ananá, merengue característico sobre bizcochuelo con crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://cdn.blog.paulinacocina.net/wp-content/uploads/2022/03/postre-chaja.jpg',
      },
      {
        id: 'fragil-1500',
        name: 'Torta Chajá Frágil 1500 gr',
        tag: 'Premium',
        price: '$1590',
        weight: '1500 gr',
        description:
          'El Chajá en su versión más generosa. Durazno, chocolate o dulce de leche, merengue y crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://bsstatic.mrjack.es/wp-content/uploads/2021/07/torta_chaja_cab2.jpg',
      },
    ],
  },
  petit: {
    label: 'Petit & Packs',
    products: [
      {
        id: 'petit-durazno',
        name: 'Petit Chajá Helado con Durazno',
        tag: 'Helado',
        price: '$113',
        weight: '100 gr',
        description:
          'Postre Chajá® clásico sabor a bizcochuelo, durazno y crema vainilla. Recubierto en merengue característico.',
        note: 'Freezer −18 °C · hasta 6 meses',
        img: 'https://www.tastingtable.com/img/gallery/chaja-the-peachy-uruguayan-cake-you-should-know-about/what-does-postre-chaja-taste-like-1660841974.jpg',
      },
      {
        id: 'petit-ddl',
        name: 'Petit Chajá Helado con Dulce de Leche',
        tag: 'Helado',
        price: '$113',
        weight: '100 gr',
        description:
          'Postre Chajá® sabor bizcochuelo, dulce de leche natural y crema vainilla. Recubierto en merengue característico.',
        note: 'Freezer −18 °C · hasta 6 meses',
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Chaj%C3%A1_bistr%C3%B3.jpg',
      },
      {
        id: 'pack-durazno',
        name: 'Chajá con Durazno — Pack x3',
        tag: 'Pack x3',
        price: '$396',
        weight: '95 gr c/u',
        description:
          'Chajá® clásico con durazno en pack de 3 unidades. Merengue característico, bizcochuelo, durazno y crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://www.laylita.com/recetas/wp-content/uploads/2023/08/Como-hacer-la-Torta-Chaja.jpg',
      },
      {
        id: 'triple-sabor',
        name: 'Chajá Triple Sabor',
        tag: 'Pack x3',
        price: '$152',
        weight: '50 gr c/u',
        description:
          'Pack de 3: Chajá® vainilla sin fruta + dulce de leche + chocolate. Bizcochuelo y merengue en cada uno.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://saboresatlanta.com/wp-content/uploads/2023/08/02-Chaja-Cake.png',
      },
      {
        id: 'frutilla',
        name: 'Chajá con Frutilla',
        tag: 'Individual',
        price: '$152',
        weight: '120 gr',
        description:
          'Chajá® clásico con frutilla, en caja x12 o por unidad. Merengue, bizcochuelo, frutilla y crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Postres_uruguayos.jpg',
      },
      {
        id: 'frutos-bosque',
        name: 'Chajá con Frutos del Bosque',
        tag: 'Individual',
        price: '$152',
        weight: '120 gr',
        description:
          'Chajá® clásico con frutos del bosque, en caja x12 o por unidad. Merengue, bizcochuelo y crema vainilla.',
        note: 'Heladera 4–7 °C · hasta 45 días',
        img: 'https://blog.amigofoods.com/wp-content/uploads/2021/01/chaja-dessert.jpg',
      },
    ],
  },
}

function ProductCard({ product, index }) {
  return (
    <div
      className="group flex flex-col bg-white border border-cream-200/60 rounded-2xl overflow-hidden hover:shadow-[0_16px_40px_-12px_rgba(44,26,14,0.14)] transition-all duration-500"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Torta_chaj%C3%A1.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/30 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-amber/90 text-espresso-900">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-base md:text-lg text-espresso-800 leading-snug tracking-tight">
            {product.name}
          </h3>
          <div className="text-right shrink-0">
            <p className="font-mono text-xl font-semibold text-espresso-800">{product.price}</p>
            <p className="text-espresso-400 text-xs">{product.weight}</p>
          </div>
        </div>

        <p className="text-espresso-500 text-sm leading-relaxed mb-3 flex-1">{product.description}</p>

        <p className="text-amber-dark text-xs italic mb-4">{product.note}</p>

        <a
          href="#pedidos"
          className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full bg-espresso-800 text-cream-50 text-xs font-medium hover:bg-espresso-700 transition-all duration-300 active:scale-[0.98]"
        >
          <ShoppingBag size={12} strokeWidth={1.5} />
          Pedir este
        </a>
      </div>
    </div>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('tortas')
  const gridRef = useRef(null)

  const handleTab = (key) => {
    if (key === activeTab) return
    setActiveTab(key)
  }

  const current = categories[activeTab]

  return (
    <section id="variedades" className="bg-cream-100 py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-amber" />
            <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">Carta</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-espresso-800 tracking-tightest leading-tight">
              Nuestros productos
            </h2>
            <p className="text-espresso-500 text-sm leading-relaxed max-w-[44ch] md:text-right">
              Diez variedades elaboradas con la receta original Chajá®.
              Desde tortas familiares hasta porciones individuales.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-10 border-b border-cream-200">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleTab(key)}
              className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                activeTab === key
                  ? 'text-espresso-800'
                  : 'text-espresso-400 hover:text-espresso-600'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-xs font-mono text-amber opacity-70">
                {cat.products.length}
              </span>
              {activeTab === key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-espresso-800 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Grid — always visible, no opacity:0 tricks */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${
            activeTab === 'tortas' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
          }`}
        >
          {current.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
