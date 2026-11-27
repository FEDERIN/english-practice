import { useState, useEffect } from 'react'
import { speak } from '../services/tts.js'
import {
  subjects,
  verbs,
  timeExpressions,
  tenses,
  complements,
  getSubject,
  getVerb,
  getTime,
  getComplement,
  buildSentence,
  evaluateSentence,
  randomCombination,
  verbsForTime,
  timesForVerb,
} from '../data/sentenceBuilder.js'

function keyFor(tenseId, combination, sentence) {
  return [
    tenseId,
    combination.subjectId,
    combination.verbId,
    combination.timeId,
    String(sentence || '').trim().toLowerCase(),
  ].join('|')
}

function shuffleVerbs(list, selectedId) {
  // Deduplicate by id first
  var seen = {}
  var unique = []
  for (var u = 0; u < list.length; u++) {
    if (!seen[list[u].id]) {
      seen[list[u].id] = true
      unique.push(list[u])
    }
  }
  var arr = unique.slice()
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  if (selectedId && arr.slice(0, 9).indexOf(selectedId) === -1) {
    var sel = unique.filter(function (v) { return v.id === selectedId })[0]
    if (sel) arr[8] = sel
  }
  // Final dedup pass to be safe
  var finalSeen = {}
  var final = []
  for (var f = 0; f < arr.length && final.length < 9; f++) {
    if (!finalSeen[arr[f].id]) {
      finalSeen[arr[f].id] = true
      final.push(arr[f])
    }
  }
  return final
}

function shuffleTimes(list, selectedId, selectedText) {
  var seen = {}
  var unique = []
  for (var u = 0; u < list.length; u++) {
    var key = list[u].id + '|' + (Array.isArray(list[u].text) ? list[u].text.join(',') : list[u].text)
    if (!seen[key]) {
      seen[key] = true
      unique.push(list[u])
    }
  }
  var arr = unique.slice()
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  if (selectedId) {
    var selInArr = arr.slice(0, 14).some(function (x) { return x.id === selectedId })
    if (!selInArr) {
      var sel = unique.filter(function (x) { return x.id === selectedId })[0]
      if (sel) arr[13] = sel
    }
  }
  var final = []
  var finalSeen = {}
  for (var f = 0; f < arr.length && final.length < 14; f++) {
    var k = arr[f].id + '|' + (Array.isArray(arr[f].text) ? arr[f].text.join(',') : arr[f].text)
    if (!finalSeen[k]) {
      finalSeen[k] = true
      final.push(arr[f])
    }
  }
  return final
}

export default function Builder({ onExit, recordAnswer }) {
  var [tenseId, setTenseId] = useState('future_continuous')
  var [polarity, setPolarity] = useState('affirmative')
  var [combination, setCombination] = useState(function () {
    var combo = randomCombination('future_continuous')
    combo.timeId = null
    combo.timeText = ''
    combo.infinitiveVerbId = null
    return combo
  })
  var [sentence, setSentence] = useState('')
  var [result, setResult] = useState(null)
  var [lastKey, setLastKey] = useState('')
  var [copied, setCopied] = useState(false)
  var [piecesCopied, setPiecesCopied] = useState(false)
  var [isPlaying, setIsPlaying] = useState(false)
  var [verbSearch, setVerbSearch] = useState('')
  var [infinitiveVerbSearch, setInfinitiveVerbSearch] = useState('')
  var [displayedVerbs, setDisplayedVerbs] = useState(function () {
    return shuffleVerbs(verbs, (combination && combination.verbId) || 'study')
  })
  var [displayedInfinitiveVerbs, setDisplayedInfinitiveVerbs] = useState(function () {
    return shuffleVerbs(verbs, (combination && combination.infinitiveVerbId) || 'study')
  })
  var [displayedTimes, setDisplayedTimes] = useState(function () {
    return shuffleTimes(timeExpressions, combination && combination.timeId, combination && combination.timeText)
  })

  useEffect(function () {
    setDisplayedTimes(shuffleTimes(availableTimes, combination && combination.timeId, combination && combination.timeText))
  }, [tenseId, (combination && combination.verbId)])

  useEffect(function () {
    var v = verbs.filter(function (item) { return item.id === combination.verbId })[0]
    if (v && v.takesInfinitive) {
      if (!combination.infinitiveVerbId) {
        setCombination(function (prev) {
          return {
            subjectId: prev.subjectId,
            verbId: prev.verbId,
            timeId: prev.timeId,
            complementId: prev.complementId || 'none',
            timeText: prev.timeText,
            infinitiveVerbId: verbs[0].id,
          }
        })
      }
      setDisplayedInfinitiveVerbs(shuffleVerbs(verbs, combination.infinitiveVerbId || verbs[0].id))
    } else {
      if (combination.infinitiveVerbId) {
        setCombination(function (prev) {
          return {
            subjectId: prev.subjectId,
            verbId: prev.verbId,
            timeId: prev.timeId,
            complementId: prev.complementId || 'none',
            timeText: prev.timeText,
            infinitiveVerbId: null,
          }
        })
      }
    }
  }, [combination.verbId])

  var tense = tenses.filter(function (item) { return item.id === tenseId })[0]
  var subject = getSubject(combination.subjectId)
  var verb = getVerb(combination.verbId)
  var time = getTime(combination.timeId)
  var complement = getComplement(combination.complementId || 'none')
  var infinitiveVerb = combination.infinitiveVerbId ? getVerb(combination.infinitiveVerbId) : null
  var selectedTimeText = combination.timeText || (time && Array.isArray(time.text) ? time.text[0] : (time ? time.text : ''))

  // Complements apply to the verb that takes the object: the infinitive verb
  // when present (e.g. "want to study English"), otherwise the main verb.
  var complementVerb = infinitiveVerb || verb
  var availableComplements = complements.filter(function (item) {
    return item.verbs.indexOf(complementVerb.id) !== -1
  })

  if (!availableComplements.some(function (item) { return item.id === (combination.complementId || 'none') })) {
    combination.complementId = 'none'
    complement = getComplement('none')
  }
  var availableVerbs = verbsForTime(time, tenseId)

  // Stative verbs do not take continuous forms; hide them for continuous tenses.
  var continuousTenses = ['presente_continuo', 'past_continuous', 'future_continuous', 'present_perfect_continuous', 'past_perfect_continuous', 'future_perfect_continuous']
  if (continuousTenses.indexOf(tenseId) !== -1) {
    var nonStative = availableVerbs.filter(function (item) { return !item.stative })
    if (nonStative.length) availableVerbs = nonStative
  }


  if (availableVerbs.length && !availableVerbs.some(function (item) { return item.id === combination.verbId })) {
    combination.verbId = availableVerbs[0].id
    verb = getVerb(combination.verbId)
  }
  var built = buildSentence(tenseId, subject, verb, time, polarity, complement, selectedTimeText, infinitiveVerb)
  var isQuestion = polarity === 'question' || polarity === 'question_negative'
  var piecesText = built.parts.join(' ') + (isQuestion ? '?' : '')

  // Only show time expressions that actually apply to the selected verb and
  // tense. verbExamples is a whitelist; excludedVerbs removes expressions.
  var availableTimes = timesForVerb(verb.id, tenseId)

  if (time && !availableTimes.some(function (item) { return item.id === time.id })) {
    combination.timeId = availableTimes[Math.floor(Math.random() * availableTimes.length)].id
    time = getTime(combination.timeId)
    combination.timeText = time && Array.isArray(time.text) ? time.text[0] : (time ? time.text : '')
    selectedTimeText = combination.timeText
    complement = getComplement(combination.complementId || 'none')
    built = buildSentence(tenseId, subject, verb, time, polarity, complement, selectedTimeText, infinitiveVerb)
  }

  function findVerb(term) {
    var q = String(term || '').trim().toLowerCase()
    if (!q) return null
    var pool = availableVerbs.length ? availableVerbs : verbs
    var exact = pool.filter(function (v) { return v.id.toLowerCase() === q })[0]
    if (exact) return exact
    var startsId = pool.filter(function (v) { return v.id.toLowerCase().indexOf(q) === 0 })[0]
    if (startsId) return startsId
    var startsBase = pool.filter(function (v) { return v.base.toLowerCase().indexOf(q) === 0 })[0]
    if (startsBase) return startsBase
    return pool.filter(function (v) { return v.id.toLowerCase().indexOf(q) !== -1 || v.base.toLowerCase().indexOf(q) !== -1 })[0] || null
  }

  function handleVerbSearch(term) {
    setVerbSearch(term)
    var match = findVerb(term)
    if (!match) return
    setCombination(function (prev) {
      var sel = verbs.filter(function (v) { return v.id === match.id })[0]
      return {
        subjectId: prev.subjectId,
        verbId: match.id,
        timeId: prev.timeId,
        complementId: prev.complementId || 'none',
        timeText: prev.timeText,
        infinitiveVerbId: (sel && sel.takesInfinitive) ? (prev.infinitiveVerbId || verbs[0].id) : null,
      }
    })
    setDisplayedVerbs(function (prev) {
      var without = prev.filter(function (v) { return v.id !== match.id })
      var next = without.slice(0, 8)
      next.push(match)
      return next
    })
  }

  function handleInfinitiveVerbSearch(term) {
    setInfinitiveVerbSearch(term)
    var q = String(term || '').trim().toLowerCase()
    if (!q) return
    var pool = verbs
    var match =
      pool.filter(function (v) { return v.id.toLowerCase() === q })[0] ||
      pool.filter(function (v) { return v.id.toLowerCase().indexOf(q) === 0 })[0] ||
      pool.filter(function (v) { return v.base.toLowerCase().indexOf(q) === 0 })[0] ||
      pool.filter(function (v) { return v.id.toLowerCase().indexOf(q) !== -1 || v.base.toLowerCase().indexOf(q) !== -1 })[0] ||
      null
    if (!match) return
    setPart('infinitiveVerbId', match.id)
  }

  function reset(tenseToUse) {
    setTenseId(tenseToUse)
    var combo = randomCombination(tenseToUse)
    combo.timeId = null
    combo.timeText = ''
    setCombination(combo)
    setDisplayedTimes(shuffleTimes(timeExpressions, null, ''))
    setSentence('')
    setResult(null)
    setLastKey('')
    setCopied(false)
    setPiecesCopied(false)
  }

  function setPart(part, id) {
    var next = {
      subjectId: combination.subjectId,
      verbId: combination.verbId,
      timeId: combination.timeId,
      complementId: combination.complementId || 'none',
      timeText: combination.timeText || selectedTimeText,
      infinitiveVerbId: combination.infinitiveVerbId,
    }
    next[part] = id
    if (part === 'verbId') {
      var sel = verbs.filter(function (v) { return v.id === id })[0]
      if (sel && displayedVerbs.indexOf(sel) === -1) {
        var deduped = displayedVerbs.slice()
        // remove last to make room, then add sel
        if (deduped.length >= 9) deduped.pop()
        deduped.push(sel)
        setDisplayedVerbs(deduped)
      }
      var selVerb = verbs.filter(function (v) { return v.id === id })[0]
      if (selVerb && selVerb.takesInfinitive) {
        next.infinitiveVerbId = verbs[0].id
        setDisplayedInfinitiveVerbs(shuffleVerbs(verbs, verbs[0].id))
      } else {
        next.infinitiveVerbId = null
      }
    }
    if (part === 'infinitiveVerbId') {
      var selInf = verbs.filter(function (v) { return v.id === id })[0]
      if (selInf && displayedInfinitiveVerbs.indexOf(selInf) === -1) {
        var dedupedInf = displayedInfinitiveVerbs.slice()
        if (dedupedInf.length >= 9) dedupedInf.pop()
        dedupedInf.push(selInf)
        setDisplayedInfinitiveVerbs(dedupedInf)
      }
    }
    setCombination(next)
    setResult(null)
    setLastKey('')
    setCopied(false)
    setPiecesCopied(false)
  }

  function check(event) {
    event.preventDefault()
    if (!sentence.trim()) {
      return
    }

    var evaluation = evaluateSentence(tenseId, subject, verb, time, sentence, polarity, complement, selectedTimeText, infinitiveVerb)
    setResult(evaluation)

    var key = keyFor(tenseId, combination, sentence)
    if (key !== lastKey) {
      recordAnswer(tenseId, evaluation.grammatical)
      setLastKey(key)
    }
  }

  function copyAiPrompt() {
    if (!result) {
      return
    }

    var text = result.aiPrompt

    function fallback() {
      var area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', 'readonly')
      area.style.position = 'fixed'
      area.style.top = '-1000px'
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
      } catch (error) {
        // Clipboard can be blocked; the prompt stays visible below.
      }
      document.body.removeChild(area)
      setCopied(true)
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        setCopied(true)
      }).catch(fallback)
    } else {
      fallback()
    }
  }

  return (
    <section className="screen builder-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Sentence Builder</p>
          <h2>Combine the pieces</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onExit}>
          Back
        </button>
      </div>

      <div className="builder-toolbar">
        <label className="search-label" htmlFor="builder-tense">Target tense</label>
        <select
          id="builder-tense"
          className="select-input"
          value={tenseId}
          onChange={function (event) { reset(event.target.value) }}
        >
          {tenses.map(function (item) {
            return <option key={item.id} value={item.id}>{item.title}</option>
          })}
        </select>
        <label className="search-label" htmlFor="builder-polarity">Polarity</label>
        <select
          id="builder-polarity"
          className="select-input"
          value={polarity}
          onChange={function (event) { setPolarity(event.target.value); setResult(null) }}
        >
          <option value="affirmative">Affirmative</option>
          <option value="negative">Negative</option>
          <option value="question">Question</option>
          <option value="question_negative">Question (negative)</option>
        </select>
        <button type="button" className="secondary-button" onClick={function () { reset(tenseId) }}>
          New combination
        </button>
      </div>

      <div className="rule-strip">
        <strong>{tense.title}</strong>
        <span>{tense.form[polarity] || tense.form.affirmative}</span>
        <span>{tense.use}</span>
      </div>

      <div className="builder-grid">
        <fieldset className="builder-panel">
          <legend className="legend-empty"></legend>
          <div className="divider">
            <span className="divider-title">Subject</span>
          </div>
          <div className="option-list">
            {subjects.map(function (item) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={'option-button' + (item.id === subject.id ? ' is-active' : '')}
                  onClick={function () { setPart('subjectId', item.id) }}
                >
                  {item.text}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="builder-panel">
          <legend className="legend-empty"></legend>
          <div className="divider">
            <span className="divider-title">Verb</span>
            <input
              type="search"
              className="verb-search"
              placeholder="Search verb..."
              value={verbSearch}
              onChange={function (event) { handleVerbSearch(event.target.value) }}
            />
            <button type="button" className="legend-refresh" aria-label="Refresh verbs" title="Refresh verbs" onClick={function () { setDisplayedVerbs(shuffleVerbs(verbs, combination.verbId)) }}>
              ↻
            </button>
          </div>
          <div className="option-list">
            {displayedVerbs
              .filter(function (item) {
                if (continuousTenses.indexOf(tenseId) === -1) return true
                return !item.stative
              })
              .map(function (item) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={'option-button' + (item.id === verb.id ? ' is-active' : '')}
                  onClick={function () { setPart('verbId', item.id) }}
                >
                  {item.base}
                  <small>{item.ing}</small>
                </button>
              )
            })}
          </div>
        </fieldset>

        {verb && verb.takesInfinitive ? (
          <fieldset className="builder-panel">
            <legend className="legend-empty"></legend>
            <div className="divider">
              <span className="divider-title">Inf verb</span>
              <input
                type="search"
                className="verb-search"
                placeholder="Search verb..."
                value={infinitiveVerbSearch}
                onChange={function (event) { handleInfinitiveVerbSearch(event.target.value) }}
              />
              <button type="button" className="legend-refresh" aria-label="Refresh infinitive verbs" title="Refresh infinitive verbs" onClick={function () { setDisplayedInfinitiveVerbs(shuffleVerbs(verbs, combination.infinitiveVerbId || verbs[0].id)) }}>
                ↻
              </button>
            </div>
            <div className="option-list">
              <button
                type="button"
                className={'option-button' + (!combination.infinitiveVerbId ? ' is-active' : '')}
                onClick={function () {
                  setCombination(function (prev) {
                    return {
                      subjectId: prev.subjectId,
                      verbId: prev.verbId,
                      timeId: prev.timeId,
                      complementId: prev.complementId || 'none',
                      timeText: prev.timeText,
                      infinitiveVerbId: null,
                    }
                  })
                }}
              >
                none
              </button>
              {displayedInfinitiveVerbs.map(function (item) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={'option-button' + (item.id === (combination.infinitiveVerbId || '') ? ' is-active' : '')}
                    onClick={function () { setPart('infinitiveVerbId', item.id) }}
                  >
                    {item.base}
                    <small>{item.ing}</small>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ) : null}

        <fieldset className="builder-panel">
          <legend className="legend-empty"></legend>
          <div className="divider">
            <span className="divider-title">Complement</span>
          </div>
          <div className="option-list">
            {availableComplements.map(function (item) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={'option-button' + ((combination.complementId || 'none') === item.id ? ' is-active' : '')}
                  onClick={function () { setPart('complementId', item.id) }}
                >
                  {item.id === 'none' ? 'none' : item.text}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="builder-panel">
          <legend className="legend-empty"></legend>
          <div className="divider">
            <span className="divider-title">Time expression</span>
            <button type="button" className="legend-refresh" aria-label="Refresh times" title="Refresh times" onClick={function () { setDisplayedTimes(shuffleTimes(availableTimes, combination.timeId, combination.timeText)) }}>
              ↻
            </button>
          </div>
          <div className="option-list">
            <button
              type="button"
              className={'option-button' + ((!time || !selectedTimeText) ? ' is-active' : '')}
              onClick={function () {
                var next = Object.assign({}, combination, { timeId: null, timeText: '' })
                setCombination(next)
              }}
            >
              none
            </button>
            {displayedTimes.reduce(function (acc, item) {
              var texts = Array.isArray(item.text) ? item.text : [item.text]
              texts.forEach(function (t) {
                acc.push({ id: item.id, text: t })
              })
              return acc
            }, []).map(function (option) {
              var isActive = time !== null && option.id === time.id && option.text === selectedTimeText
              return (
                <button
                  key={option.id + '-' + option.text}
                  type="button"
                  className={'option-button' + (isActive ? ' is-active' : '')}
                  onClick={function () {
                    setPart('timeId', option.id)
                    var next = Object.assign({}, combination, { timeId: option.id, timeText: option.text })
                    setCombination(next)
                  }}
                >
                  {option.text}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="piece-row" aria-label="Selected pieces">
        <span className="piece-label">Selected pieces</span>
        {built.parts.map(function (part, index) {
          var isLast = index === built.parts.length - 1
          return (
            <span key={index} className="piece">
              {part}
              {isQuestion && isLast ? '?' : ''}
            </span>
          )
        })}
        <button
          type="button"
          className="secondary-button piece-copy"
          disabled={isPlaying}
          onClick={function () {
            setIsPlaying(true)
            speak(piecesText, {
              lang: 'en',
              onEnd: function () { setIsPlaying(false) },
            })
          }}
        >
          {isPlaying ? '...' : '🔊'}
        </button>
        <button
          type="button"
          className="secondary-button piece-copy"
          onClick={function () {
            var text = piecesText
            function fallback() {
              var area = document.createElement('textarea')
              area.value = text
              area.setAttribute('readonly', 'readonly')
              area.style.position = 'fixed'
              area.style.top = '-1000px'
              document.body.appendChild(area)
              area.select()
              try { document.execCommand('copy') } catch (error) {}
              document.body.removeChild(area)
              setPiecesCopied(true)
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function () { setPiecesCopied(true) }).catch(fallback)
            } else {
              fallback()
            }
          }}
        >
          {piecesCopied ? 'Copied!' : 'Copy pieces'}
        </button>
      </div>
      {time && time.appliesTo ? (
        <p className="small-note">{time.appliesTo}</p>
      ) : null}

      <form onSubmit={check} className="answer-form builder-answer">
        <label htmlFor="builder-sentence">Your sentence</label>
        <div className="answer-row">
          <input
            id="builder-sentence"
            type="text"
            autoComplete="off"
            spellCheck="false"
            value={sentence}
            onChange={function (event) {
              setSentence(event.target.value)
              setCopied(false)
            }}
            placeholder="Write the full sentence here"
          />
          <button type="submit" className="primary-button" disabled={!sentence.trim()}>
            Check
          </button>
        </div>
      </form>

      {result ? (
        <div className="builder-result">
          <div className="verdict-row">
            <span className={'verdict ' + (result.grammatical ? 'is-good' : 'is-warn')}>
              Grammar: {result.grammatical ? 'correct' : 'review'}
            </span>
            <span className={'verdict ' + (result.natural ? 'is-good' : 'is-warn')}>
              Natural: {result.natural ? 'yes' : 'check'}
            </span>
          </div>

          <div className="result-block">
            <strong>Grammar</strong>
            <p>{result.grammarMessage}</p>
          </div>

          <div className="result-block">
            <strong>Naturalness</strong>
            <p>{result.naturalMessage}</p>
          </div>

          <div className="result-block">
            <strong>Model sentence</strong>
            <p className="model-sentence">{result.expected}</p>
          </div>

          <details className="notes-details">
            <summary>Rule notes and exceptions</summary>
            <ul>
              {result.notes.map(function (note, index) {
                return <li key={index}>{note}</li>
              })}
            </ul>
          </details>

          <button type="button" className="secondary-button" onClick={copyAiPrompt}>
            {copied ? 'AI prompt copied' : 'Copy AI prompt (online)'}
          </button>
          <p className="small-note">
            Open your AI assistant, paste the prompt and ask it to judge grammar and naturalness separately.
          </p>

          <details className="notes-details">
            <summary>Show the prompt</summary>
            <pre className="prompt-box">{result.aiPrompt}</pre>
          </details>
        </div>
      ) : null}
    </section>
  )
}
