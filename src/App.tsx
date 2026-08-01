import {lazy, Suspense, useEffect, useState} from 'react'
import {ReleaseArchive} from './components/ReleaseArchive'
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
    <main className="experience-shell" id="top">
      <header className="site-header">
        <a href="#top" className="wordmark">
          {content.settings?.name || 'Ay Din Archive'}
        </a>
        <span>{content.settings?.tagline}</span>
      </header>

      {content.links.length > 0 ? (
        <section className="scene" aria-label="Interactive links">
          <Suspense fallback={<div className="loading">Loading space…</div>}>
            <Experience links={content.links} />
          </Suspense>
        </section>
      ) : null}

      <ReleaseArchive releases={content.releases} />

      <footer className="site-footer">
        <p>Ay Din · Independent music archive</p>
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
