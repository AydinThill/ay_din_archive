import {useEffect, useMemo, useRef, useState} from 'react'
import type {IconType} from 'react-icons'
import {SiApplemusic, SiBandcamp, SiDeezer, SiSoundcloud, SiSpotify, SiTidal} from 'react-icons/si'
import type {Release} from '../types/content'

type ScoreKey = 'popularity' | 'ux' | 'morality'

type Platform = {
  service: string
  name: string
  icon: IconType
  scores: Record<ScoreKey, number>
}

const platforms: Platform[] = [
  {
    service: 'spotify',
    name: 'Spotify',
    icon: SiSpotify,
    scores: {popularity: 96, ux: 88, morality: 18},
  },
  {
    service: 'appleMusic',
    name: 'Apple Music',
    icon: SiApplemusic,
    scores: {popularity: 86, ux: 89, morality: 55},
  },
  {
    service: 'bandcamp',
    name: 'Bandcamp',
    icon: SiBandcamp,
    scores: {popularity: 52, ux: 73, morality: 94},
  },
  {
    service: 'soundcloud',
    name: 'SoundCloud',
    icon: SiSoundcloud,
    scores: {popularity: 73, ux: 70, morality: 58},
  },
  {
    service: 'deezer',
    name: 'Deezer',
    icon: SiDeezer,
    scores: {popularity: 49, ux: 77, morality: 65},
  },
  {
    service: 'tidal',
    name: 'Tidal',
    icon: SiTidal,
    scores: {popularity: 45, ux: 82, morality: 76},
  },
]

const scoreLabels: Record<ScoreKey, string> = {
  popularity: 'Service reach',
  ux: 'App experience',
  morality: 'Artist fairness',
}

function interpolateScore(key: ScoreKey, position: number) {
  const safePosition = Math.max(0, Math.min(platforms.length - 1, position))
  const lowerIndex = Math.floor(safePosition)
  const upperIndex = Math.min(Math.ceil(safePosition), platforms.length - 1)
  const progress = safePosition - lowerIndex
  const lower = platforms[lowerIndex].scores[key]
  const upper = platforms[upperIndex].scores[key]

  return lower + (upper - lower) * progress
}

function scoreZone(score: number) {
  if (score < 35) return 'critical'
  if (score < 70) return 'mixed'
  return 'positive'
}

export function PlatformSelector({release}: {release: Release}) {
  const links = useMemo(
    () =>
      Object.fromEntries((release.streamingLinks || []).map((link) => [link.service, link.url])),
    [release.streamingLinks],
  )
  const firstAvailableIndex = Math.max(
    0,
    platforms.findIndex((platform) => links[platform.service]),
  )
  const [position, setPosition] = useState(firstAvailableIndex)
  const positionRef = useRef(firstAvailableIndex)
  const animationFrame = useRef<number | null>(null)
  const selectedIndex = Math.max(0, Math.min(platforms.length - 1, Math.round(position)))
  const selectedPlatform = platforms[selectedIndex]
  const selectedUrl = links[selectedPlatform.service]

  function updatePosition(nextPosition: number) {
    const safePosition = Number.isFinite(nextPosition)
      ? Math.max(0, Math.min(platforms.length - 1, nextPosition))
      : 0
    positionRef.current = safePosition
    setPosition(safePosition)
  }

  function moveTo(targetPosition: number) {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
    const safeTarget = Math.max(0, Math.min(platforms.length - 1, targetPosition))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updatePosition(safeTarget)
      return
    }

    const startPosition = positionRef.current
    const startedAt = performance.now()
    const duration = 420

    function animate(now: number) {
      const elapsed = Math.max(0, Math.min((now - startedAt) / duration, 1))
      const eased = 1 - Math.pow(1 - elapsed, 3)
      updatePosition(startPosition + (safeTarget - startPosition) * eased)

      if (elapsed < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        animationFrame.current = null
      }
    }

    animationFrame.current = requestAnimationFrame(animate)
  }

  useEffect(
    () => () => {
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
    },
    [],
  )

  return (
    <div className="platform-selector">
      <div className="platform-context">
        <p>Listening service guide</p>
        <span>Compare the platforms themselves—not this release’s performance.</span>
      </div>

      <div className="platform-logos" role="group" aria-label="Choose a streaming platform">
        {platforms.map((platform, index) => {
          const Icon = platform.icon
          const isAvailable = Boolean(links[platform.service])

          return (
            <button
              className={index === selectedIndex ? 'platform-logo is-active' : 'platform-logo'}
              type="button"
              key={platform.service}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                moveTo(index)
              }}
              onDragStart={(event) => event.preventDefault()}
              aria-label={`${platform.name}${isAvailable ? '' : ' — link unavailable'}`}
              aria-pressed={index === selectedIndex}
            >
              <Icon aria-hidden="true" />
              {!isAvailable ? <span className="availability-dot" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>

      <div className="platform-range-wrap">
        <input
          className="platform-range"
          type="range"
          min="0"
          max={platforms.length - 1}
          step="0.01"
          value={position}
          aria-label="Streaming platform"
          aria-valuetext={selectedPlatform.name}
          onChange={(event) => {
            if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
            updatePosition(Number(event.target.value))
          }}
          onPointerUp={() => moveTo(Math.round(positionRef.current))}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
            event.preventDefault()
            const direction = event.key === 'ArrowRight' ? 1 : -1
            moveTo(Math.max(0, Math.min(platforms.length - 1, selectedIndex + direction)))
          }}
        />
      </div>

      <div className="platform-readout">
        <div className="platform-readout-heading">
          <div>
            <p>General service profile</p>
            <h4>{selectedPlatform.name}</h4>
          </div>
          <span>Ay Din editorial rating</span>
        </div>

        <dl className="platform-scores">
          {(Object.keys(scoreLabels) as ScoreKey[]).map((key) => {
            const score = interpolateScore(key, position)

            return (
              <div className="platform-score" key={key}>
                <dt>{scoreLabels[key]}</dt>
                <dd>
                  <span>{Math.round(score)}</span>
                  <span aria-hidden="true">/100</span>
                </dd>
                <div className="score-track" aria-hidden="true">
                  <span className={scoreZone(score)} style={{width: `${score}%`}} />
                </div>
              </div>
            )
          })}
        </dl>

        <p className="score-disclaimer">
          About {selectedPlatform.name} as a platform. Not plays, listener data or analytics for{' '}
          {release.title}.
        </p>

        {selectedUrl ? (
          <a className="platform-open" href={selectedUrl} target="_blank" rel="noreferrer">
            <span>Open on {selectedPlatform.name}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="platform-open is-unavailable">No link available yet</span>
        )}
      </div>
    </div>
  )
}
