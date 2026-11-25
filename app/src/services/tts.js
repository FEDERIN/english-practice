// Text-to-speech using VoiceRSS (free tier, personal use).
// The key is injected at build time from VOICERSS_KEY in .env.local or Vercel.

var TTS_ENDPOINT = 'https://api.voicerss.org/'
var MAX_CHARS = 500
// en-gb = British English, en-us = American English.
var VOICE_LANG = 'en-gb'
// Speech rate from -10 (slowest) to 10 (fastest). 0 is normal.
var VOICE_RATE = 0
// Voice name for VoiceRSS. Harry = British male.
var VOICE_NAME = 'Harry'

function apiKey() {
  return typeof __VOICERSS_KEY__ !== 'undefined' ? __VOICERSS_KEY__ : ''
}

// VoiceRSS needs full codes such as en-us; a bare "en" is rejected.
function voiceLang(lang) {
  if (!lang) return VOICE_LANG
  return lang.indexOf('-') === -1 ? lang + '-us' : lang
}

export function ttsUrl(text, lang) {
  var q = String(text || '').slice(0, MAX_CHARS)
  return TTS_ENDPOINT +
    '?key=' + encodeURIComponent(apiKey()) +
    '&hl=' + voiceLang(lang) +
    '&v=' + VOICE_NAME +
    '&r=' + VOICE_RATE +
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
