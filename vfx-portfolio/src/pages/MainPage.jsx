import Hero          from '../components/sections/Hero'
import Work          from '../components/sections/Work'
import CreditsTicker from '../components/ui/CreditsTicker'
import Reel          from '../components/sections/Reel'
import Tools         from '../components/sections/Tools'
import Stats         from '../components/sections/Stats'
import Credits       from '../components/sections/Credits'
import Process       from '../components/sections/Process'
import About         from '../components/sections/About'
import Contact       from '../components/sections/Contact'
import Footer        from '../components/layout/Footer'

export default function MainPage({ onOpenModal, onShowProjects }) {
  return (
    <main id="main-page">
      <Hero    onShowProjects={onShowProjects} />
      <Work    onOpenModal={onOpenModal} onShowProjects={onShowProjects} />

      {/* Ticker strip 1 — before Reel, scrolls left, seed 1 */}
      <CreditsTicker direction="left"  seed={1} speed={44} />

      <Reel />

      {/* Ticker strip 2 — after Reel, scrolls right, seed 7 (different shuffle) */}
      <CreditsTicker direction="right" seed={7} speed={38} />

      <Tools />
      <Stats />
      <Credits onOpenModal={onOpenModal} />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
