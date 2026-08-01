import {lazy, Suspense, useEffect, useState} from 'react'
import {fallbackContent, getHomeContent} from './sanity/content'
import {isSanityConfigured} from './sanity/client'
import type {HomeContent} from './types/content'
import './App.css'

const Experience = lazy(() =>
  import('./components/scene/Experience').then((module) => ({default: module.Experience})),
)

function App() {
  const [content, setContent] = useState<HomeContent>(fallbackContent)

  useEffect(() => {
    void getHomeContent().then(setContent)
  }, [])

  return (
    <main className="experience-shell">
      <header className="site-header">
        <a href="#top" className="wordmark">
          {content.settings?.name || 'Ay Din Archive'}
        </a>
        <span>{content.settings?.tagline}</span>
      </header>

      <section className="scene" id="top" aria-label="Interactive links">
        <Suspense fallback={<div className="loading">Loading space…</div>}>
          <Experience links={content.links} />
        </Suspense>
      </section>

      <footer className="site-footer">
        <p>Drag the idea further. This is the 3D foundation.</p>
        {!isSanityConfigured && (
          <p className="setup-note">
            Demo content · connect a new Sanity project in <code>.env</code>
          </p>
        )}
      </footer>
    </main>
  )
}

export default App
