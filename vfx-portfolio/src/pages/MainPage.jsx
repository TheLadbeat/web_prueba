import Hero    from "../components/sections/Hero"
import Work    from "../components/sections/Work"
import Reel    from "../components/sections/Reel"
import Stats   from "../components/sections/Stats"
import Credits from "../components/sections/Credits"
import Process from "../components/sections/Process"
import About   from "../components/sections/About"
import Contact from "../components/sections/Contact"
import Footer  from "../components/layout/Footer"

export default function MainPage({ onOpenModal, onShowProjects }) {
  return (
    <main id="main-page">
      <Hero    onShowProjects={onShowProjects} />
      <Work    onOpenModal={onOpenModal} onShowProjects={onShowProjects} />
      <Reel />
      <Stats />
      <Credits />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
