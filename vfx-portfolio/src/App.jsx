import { useState, useEffect } from 'react'
import Nav               from './components/layout/Nav'
import Grain             from './components/ui/Grain'
import ProgressBar       from './components/ui/ProgressBar'
import Cursor            from './components/ui/Cursor'
import Modal             from './components/ui/Modal'
import AllProjectsModal  from './components/ui/AllProjectsModal'
import MainPage          from './pages/MainPage'
import { useReveal }     from './hooks/useReveal'

export default function App() {
  // ── Modal state
  const [allOpen,      setAllOpen]      = useState(false)
  const [modalProject, setModalProject] = useState(null)

  // ── Reveal — re-run when either modal opens (new .reveal nodes appear)
  useReveal([allOpen, !!modalProject])

  // ── Nav scroll effect
  useEffect(() => {
    const handler = () => {
      const nav = document.querySelector('.nav')
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* ── Persistent UI ── */}
      <Grain />
      <ProgressBar />
      <Cursor />

      <Nav onShowProjects={() => setAllOpen(true)} />

      {/* All-projects modal — z 7500, sits below project-detail modal */}
      <AllProjectsModal
        open={allOpen}
        onClose={() => setAllOpen(false)}
        onOpenProject={(p) => setModalProject(p)}
      />

      {/* Project-detail modal — z 8200, sits above everything */}
      <Modal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />

      {/* Single main page — always mounted, never swapped */}
      <MainPage
        onOpenModal={setModalProject}
        onShowProjects={() => setAllOpen(true)}
      />
    </>
  )
}
