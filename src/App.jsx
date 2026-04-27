import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import Order from './components/Order'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Testimonials />
        <Order />
      </main>
      <Footer />
    </>
  )
}
