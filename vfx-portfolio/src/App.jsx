import { useState, useEffect, useCallback } from 'react'
import Nav          from './components/layout/Nav'
import Grain        from './components/ui/Grain'
import ProgressBar  from './components/ui/ProgressBar'
import Cursor       from './components/ui/Cursor'
import Modal        from './components/ui/Modal'
import MainPage     from './pages/MainPage'
import ProjectsPage from './pages/ProjectsPage'
import { useReveal } from './hooks/useReveal'

export default function App() {
  // ── Page routing: 'main' | 'projects'
  const [page, setPage] = useState(
    window.location.hash === '#projects' ? 'projects' : 'main'
  )

  // ── Modal state
  const [modalProject, setModalProject] = useState(null)

  // ── Scroll reveal (re-run when page changes)
  useReveal([page])

  // ── Hash-based navigation
  const showProjects = useCallback(() => {
    history.pushState(null, '', '#projects')
    setPage('projects')
    window.scrollTo(0, 0)
  }, [])

  const showMain = useCallback(() => {
    history.pushState(null, '', '#')
    setPage('main')
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#projects') setPage('projects')
      else setPage('main')
    }
    window.addEventListener('hashchange', onHashChange)
    // Listen to custom event from Nav logo click
    window.addEventListener('show-main', showMain)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('show-main', showMain)
    }
  }, [showMain])

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
      <Nav
        page={page}
        onShowProjects={showProjects}
      />
      <Modal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />

      {/* ── Pages ── */}
      {page === 'main' ? (
        <MainPage
          onOpenModal={setModalProject}
          onShowProjects={showProjects}
        />
      ) : (
        <ProjectsPage
          onBack={showMain}
          onOpenModal={setModalProject}
        />
      )}
    </>
  )
}
