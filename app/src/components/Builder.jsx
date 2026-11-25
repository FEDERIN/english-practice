import { useState } from 'react'
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

export default function Builder({ onExit, recordAnswer }) {
  var [tenseId, setTenseId] = useState('future_continuous')
  var [polarity, setPolarity] = useState('affirmative')
  var [combination, setCombination] = useState(function () {
    return randomCombination('future_continuous')
  })
  var [sentence, setSentence] = useState('')
  var [result, setResult] = useState(null)
  var [lastKey, setLastKey] = useState('')
  var [copied, setCopied] = useState(false)

  var tense = tenses.filter(function (item) { return item.id === tenseId })[0]
  var subject = getSubject(combination.subjectId)
  var verb = getVerb(combination.verbId)
  var time = getTime(combination.timeId)
  var complement = getComplement(combination.complementId || 'none')

  // Complements only appear when they apply to the selected verb.
  var availableComplements = complements.filter(function (item) {
    return item.verbs.indexOf(verb.id) !== -1
  })

  if (!availableComplements.some(function (item) { return item.id === (combination.complementId || 'none') })) {
    combination.complementId = 'none'
    complement = getComplement('none')
  }
  var availableVerbs = (time && time.preferredVerbs && tenseId === 'present_simple')
    ? verbs.filter(function (item) { return time.preferredVerbs.indexOf(item.id) !== -1 })
    : verbs


  if (availableVerbs.length && !availableVerbs.some(function (item) { return item.id === combination.verbId })) {
    combination.verbId = availableVerbs[0].id
    verb = getVerb(combination.verbId)
  }
  var built = buildSentence(tenseId, subject, verb, time, polarity, complement)

  // Only show time expressions that actually apply to the selected tense.
  // If none are marked as preferred, fall back to the ones that are not
  // explicitly avoided.
  var preferred = timeExpressions.filter(function (item) {
    return item.preferred.indexOf(tenseId) !== -1
  })
  var availableTimes = preferred.length
    ? preferred
    : timeExpressions.filter(function (item) {
        return item.avoid.indexOf(tenseId) === -1
      })

  if (!availableTimes.some(function (item) { return item.id === time.id })) {
    combination.timeId = availableTimes[Math.floor(Math.random() * availableTimes.length)].id
    time = getTime(combination.timeId)
    complement = getComplement(combination.complementId || 'none')
    built = buildSentence(tenseId, subject, verb, time, polarity, complement)
  }

  function reset(tenseToUse) {
    setTenseId(tenseToUse)
    setCombination(randomCombination(tenseToUse))
    setSentence('')
    setResult(null)
    setLastKey('')
    setCopied(false)
  }

  function setPart(part, id) {
    var next = {
      subjectId: combination.subjectId,
      verbId: combination.verbId,
      timeId: combination.timeId,
      complementId: combination.complementId || 'none',
    }
    next[part] = id
    setCombination(next)
    setResult(null)
    setLastKey('')
    setCopied(false)
  }

  function check(event) {
    event.preventDefault()
    if (!sentence.trim()) {
      return
    }

    var evaluation = evaluateSentence(tenseId, subject, verb, time, sentence, polarity, complement)
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
        </select>
        <button type="button" className="secondary-button" onClick={function () { reset(tenseId) }}>
          New combination
        </button>
      </div>

      <div className="rule-strip">
        <strong>{tense.title}</strong>
        <span>{tense.form}</span>
        <span>{tense.use}</span>
      </div>

      <div className="builder-grid">
        <fieldset className="builder-panel">
          <legend>Subject</legend>
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
          <legend>Verb</legend>
          <div className="option-list">
            {availableVerbs.map(function (item) {
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

        <fieldset className="builder-panel">
          <legend>Complement</legend>
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
          <legend>Time expression</legend>
          <div className="option-list">
            {availableTimes.map(function (item) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={'option-button' + (item.id === time.id ? ' is-active' : '')}
                  onClick={function () { setPart('timeId', item.id) }}
                >
                  {item.text}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="piece-row" aria-label="Selected pieces">
        <span className="piece-label">Selected pieces</span>
        {built.parts.map(function (part, index) {
          return (
            <span key={index} className="piece">
              {part}
            </span>
          )
        })}
      </div>
      {time.appliesTo ? (
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
