import Hero          from '../components/sections/Hero'
import Work          from '../components/sections/Work'
import CreditsTicker from '../components/ui/CreditsTicker'
import Reel          from '../components/sections/Reel'
import Tools         from '../components/sections/Tools'
import Stats         from '../components/sections/Stats'
import About         from '../components/sections/About'
import Contact       from '../components/sections/Contact'
import Footer        from '../components/layout/Footer'

export default function MainPage({ onOpenModal, onShowProjects }) {
  return (
    <main id="main-page">
      <Hero    onShowProjects={onShowProjects} />
      <Stats />
      <Work    onOpenModal={onOpenModal} onShowProjects={onShowProjects} />
      <div id="ticker-1"><CreditsTicker direction="left"  seed={1} speed={100} /></div>
      <Reel />
      <CreditsTicker direction="right" seed={7} speed={100} />
      <Tools />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
