// Text-to-speech using VoiceRSS (free tier, personal use).
// The key is injected at build time from VOICERSS_KEY in .env.local or Vercel.

var TTS_ENDPOINT = 'https://api.voicerss.org/'
var MAX_CHARS = 500
var VOICE_LANG = 'en-us'

function apiKey() {
  return typeof __VOICERSS_KEY__ !== 'undefined' ? __VOICERSS_KEY__ : ''
}

export function ttsUrl(text, lang) {
  var q = String(text || '').slice(0, MAX_CHARS)
  return TTS_ENDPOINT +
    '?key=' + encodeURIComponent(apiKey()) +
    '&hl=' + (lang || VOICE_LANG) +
    '&c=MP3' +
    '&src=' + encodeURIComponent(q)
}

export function speak(text, options) {
  var opts = options || {}
  var clean = String(text || '').trim()
  var done = false

  function finish() {
    if (done) return
    done = true
    if (opts.onEnd) opts.onEnd()
  }

  if (!clean || !apiKey()) {
    finish()
    return
  }

  var audio = new Audio(ttsUrl(clean, opts.lang))
  audio.onended = finish
  audio.onerror = finish

  var playing = audio.play()
  if (playing && typeof playing.catch === 'function') {
    playing.catch(finish)
  }

  // Safety net so the button never stays disabled.
  var words = clean.split(/\s+/).length
  setTimeout(finish, Math.max(3000, words * 800))
}
