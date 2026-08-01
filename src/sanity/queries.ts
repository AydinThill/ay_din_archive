export const homeQuery = `{
  "settings": *[_type == "archiveSettings"][0]{name, tagline, bio, contactEmail},
  "links": *[_type == "link" && isVisible == true] | order(order asc){_id, title, eyebrow, url, accent},
  "releases": *[
    _type == "release" &&
    defined(releaseAt) &&
    (visibility == "public" || (visibility == "scheduled" && releaseAt <= now()))
  ] | order(releaseAt desc)[0...6]{
    _id,
    title,
    artist,
    releaseType,
    releaseAt,
    description,
    "slug": slug.current,
    "coverUrl": cover.asset->url,
    "streamingLinks": [
      {"service": "spotify", "url": spotifyUrl},
      {"service": "appleMusic", "url": appleMusicUrl},
      {"service": "bandcamp", "url": bandcampUrl},
      {"service": "soundcloud", "url": soundcloudUrl},
      {"service": "deezer", "url": deezerUrl},
      {"service": "tidal", "url": tidalUrl}
    ][defined(url)],
    tracks[]->{_id, title, version, durationSeconds, "audioUrl": audio.asset->url}
  }
}`
