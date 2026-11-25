// Text-to-speech using Google Translate's TTS endpoint (unofficial, no API key).
// Plays inline with an <audio> element; if the browser blocks it, opens the
// same URL in a new tab, which is known to play.

var TTS_ENDPOINT = 'https://translate.google.com/translate_tts'
var MAX_CHARS = 200

export function ttsUrl(text, lang) {
  var q = String(text || '').slice(0, MAX_CHARS)
  return TTS_ENDPOINT + '?ie=UTF-8&tl=' + (lang || 'en') + '&client=gtx&q=' + encodeURIComponent(q)
}

export function speak(text, options) {
  var opts = options || {}
  var clean = String(text || '').trim()
  if (!clean) {
    if (opts.onEnd) opts.onEnd()
    return
  }

  var url = ttsUrl(clean, opts.lang)
  var done = false
  function finish() {
    if (done) return
    done = true
    if (opts.onEnd) opts.onEnd()
  }

  function fallbackTab() {
    window.open(url, '_blank')
    finish()
  }

  var audio = new Audio(url)
  audio.onended = finish
  audio.onerror = fallbackTab

  var playing = audio.play()
  if (playing && typeof playing.catch === 'function') {
    playing.catch(fallbackTab)
  }

  // Safety net so the button never stays disabled.
  var words = clean.split(/\s+/).length
  setTimeout(finish, Math.max(3000, words * 800))
}
