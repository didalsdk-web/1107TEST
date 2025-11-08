import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Visual from "@/components/visual"
import Portfolio from "@/components/portfolio"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Visual />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
