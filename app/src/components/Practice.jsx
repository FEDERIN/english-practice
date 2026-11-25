import { useState } from 'react'
import { exercises, topicTitle } from '../data/content.js'

var practiceTopics = []
exercises.forEach(function (exercise) {
  if (practiceTopics.indexOf(exercise.topic) === -1) {
    practiceTopics.push(exercise.topic)
  }
})

function shuffled(list) {
  var result = list.slice()
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temporary = result[i]
    result[i] = result[j]
    result[j] = temporary
  }
  return result
}

function queueFor(topic) {
  return shuffled(
    topic === 'all'
      ? exercises
      : exercises.filter(function (exercise) { return exercise.topic === topic })
  )
}

export default function Practice({ onExit, recordAnswer }) {
  var [filter, setFilter] = useState('all')
  var [queue, setQueue] = useState(function () { return queueFor('all') })
  var [index, setIndex] = useState(0)
  var [answer, setAnswer] = useState('')
  var [feedback, setFeedback] = useState(null)
  var [session, setSession] = useState({ correct: 0, wrong: 0 })

  var current = queue[index]
  var finished = index >= queue.length
  var answered = session.correct + session.wrong

  function chooseTopic(topic) {
    setFilter(topic)
    setQueue(queueFor(topic))
    setIndex(0)
    setAnswer('')
    setFeedback(null)
    setSession({ correct: 0, wrong: 0 })
  }

  function restart() {
    chooseTopic(filter)
  }

  function submit(event) {
    event.preventDefault()
    if (!current || feedback) {
      return
    }

    var typed = answer.trim().toLowerCase()
    if (!typed) {
      return
    }

    var wasCorrect = typed === current.answer.toLowerCase()
    recordAnswer(current.topic, wasCorrect)
    setFeedback({
      correct: wasCorrect,
      expected: current.answer,
      sentence: current.sentence,
    })
    setSession(function (previous) {
      return {
        correct: previous.correct + (wasCorrect ? 1 : 0),
        wrong: previous.wrong + (wasCorrect ? 0 : 1),
      }
    })
  }

  function next() {
    setIndex(index + 1)
    setAnswer('')
    setFeedback(null)
  }

  var promptParts = current ? current.prompt.split('____') : []

  return (
    <section className="screen practice-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Practice</p>
          <h2>Fill in the blank</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onExit}>
          Back
        </button>
      </div>

      <div className="chip-row" aria-label="Choose a topic">
        <button
          type="button"
          className={'chip' + (filter === 'all' ? ' is-active' : '')}
          onClick={function () { chooseTopic('all') }}
        >
          All
        </button>
        {practiceTopics.map(function (topic) {
          return (
            <button
              key={topic}
              type="button"
              className={'chip' + (filter === topic ? ' is-active' : '')}
              onClick={function () { chooseTopic(topic) }}
            >
              {topicTitle(topic)}
            </button>
          )
        })}
      </div>

      {finished ? (
        <div className="result-card">
          <p className="eyebrow">Session complete</p>
          <h3>{session.correct} / {answered} correct</h3>
          <p>
            {session.correct === answered
              ? 'Perfect. Nice work!'
              : 'Review the ones you missed, then try again.'}
          </p>
          <div className="button-row">
            <button type="button" className="primary-button" onClick={restart}>
              Practice again
            </button>
            <button type="button" className="secondary-button" onClick={onExit}>
              Home
            </button>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <div className="question-meta">
            <span>{topicTitle(current.topic)}</span>
            <span>{index + 1} / {queue.length}</span>
          </div>

          <div className="progress-track" aria-hidden="true">
            <div
              className="progress-fill"
              style={{ width: Math.round((index / queue.length) * 100) + '%' }}
            />
          </div>

          <p className="prompt">
            {promptParts[0]}
            <span className="blank">blank</span>
            {promptParts[1]}
          </p>

          <form onSubmit={submit} className="answer-form">
            <label htmlFor="answer">Missing word</label>
            <div className="answer-row">
              <input
                id="answer"
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                value={answer}
                disabled={Boolean(feedback)}
                onChange={function (event) { setAnswer(event.target.value) }}
                placeholder="type a word"
              />
              <button
                type="submit"
                className="primary-button"
                disabled={Boolean(feedback) || !answer.trim()}
              >
                Check
              </button>
            </div>
          </form>

          {feedback ? (
            <div className={'feedback ' + (feedback.correct ? 'is-correct' : 'is-wrong')}>
              <strong>{feedback.correct ? 'Correct!' : 'Not quite.'}</strong>
              <p>{feedback.sentence}</p>
              {!feedback.correct ? <p>Answer: <b>{feedback.expected}</b></p> : null}
              <button type="button" className="primary-button" onClick={next}>
                {index + 1 === queue.length ? 'Finish' : 'Next question'}
              </button>
            </div>
          ) : (
            <button type="button" className="text-button" onClick={next}>
              Skip this one
            </button>
          )}
        </div>
      )}
    </section>
  )
}
