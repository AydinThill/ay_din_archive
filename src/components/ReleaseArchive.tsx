import type {Release} from '../types/content'
import {PlatformSelector} from './PlatformSelector'

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatReleaseType(releaseType: Release['releaseType']) {
  return releaseType === 'ep' ? 'EP' : releaseType[0].toUpperCase() + releaseType.slice(1)
}

export function ReleaseArchive({releases}: {releases: Release[]}) {
  if (releases.length === 0) return null

  return (
    <section className="release-archive" id="releases" aria-labelledby="release-heading">
      <div className="release-heading-row">
        <div>
          <p className="section-index">A–01 / Music</p>
          <h2 id="release-heading">Releases</h2>
        </div>
        <span className="release-count">
          {String(releases.length).padStart(2, '0')} entr{releases.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      <div className="release-grid">
        {releases.map((release, index) => (
          <article className="release-card" key={release._id}>
            <div className="release-artwork">
              {release.coverUrl ? (
                <img
                  src={release.coverUrl}
                  alt={`${release.title} cover artwork`}
                  width="900"
                  height="900"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="artwork-placeholder" aria-label="No cover artwork">
                  AY DIN
                </div>
              )}
              <span className="release-number">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="release-information">
              <p className="release-meta">
                <span>{formatReleaseType(release.releaseType)}</span>
                {release.releaseAt ? (
                  <time dateTime={release.releaseAt}>
                    {dateFormatter.format(new Date(release.releaseAt))}
                  </time>
                ) : (
                  <span>Public</span>
                )}
              </p>
              <h3>{release.title}</h3>
              <p className="release-artist">{release.artist}</p>
              {release.description ? (
                <p className="release-description">{release.description}</p>
              ) : null}

              <PlatformSelector release={release} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
