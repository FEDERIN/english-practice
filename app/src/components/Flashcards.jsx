import { useState } from 'react'
import { flashcards } from '../data/content.js'

var groups = ['all']
flashcards.forEach(function (card) {
  if (groups.indexOf(card.group) === -1) {
    groups.push(card.group)
  }
})

export default function Flashcards({ onExit, progress, toggleKnown }) {
  var [group, setGroup] = useState('all')
  var [index, setIndex] = useState(0)
  var [flipped, setFlipped] = useState(false)

  var list = group === 'all'
    ? flashcards
    : flashcards.filter(function (card) { return card.group === group })

  var current = list[index % list.length]
  var known = current ? progress.knownCards.indexOf(current.id) !== -1 : false

  function chooseGroup(next) {
    setGroup(next)
    setIndex(0)
    setFlipped(false)
  }

  function nextCard() {
    setIndex((index + 1) % list.length)
    setFlipped(false)
  }

  return (
    <section className="screen flashcards-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Vocabulary</p>
          <h2>Flashcards</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onExit}>
          Back
        </button>
      </div>

      <div className="chip-row" aria-label="Choose a group">
        {groups.map(function (item) {
          return (
            <button
              key={item}
              type="button"
              className={'chip' + (group === item ? ' is-active' : '')}
              onClick={function () { chooseGroup(item) }}
            >
              {item === 'all' ? 'All cards' : item}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className={'flashcard' + (flipped ? ' is-flipped' : '')}
        onClick={function () { setFlipped(!flipped) }}
      >
        <span className="card-count">{index + 1} / {list.length}</span>
        <span className="card-label">{flipped ? 'Spanish' : 'English'}</span>
        <strong className="card-main">{flipped ? current.spanish : current.english}</strong>
        <span className="card-hint">
          {flipped ? 'Tap to see English' : 'Tap to reveal the meaning'}
        </span>
        {known ? <span className="known-badge">Known</span> : null}
      </button>

      <div className="button-row">
        <button
          type="button"
          className={'primary-button' + (known ? ' is-known' : '')}
          onClick={function () { toggleKnown(current.id) }}
        >
          {known ? 'Mark as not known' : 'I know this'}
        </button>
        <button type="button" className="secondary-button" onClick={nextCard}>
          Next card
        </button>
      </div>

      <p className="small-note">
        {progress.knownCards.length} of {flashcards.length} cards marked as known.
      </p>
    </section>
  )
}
