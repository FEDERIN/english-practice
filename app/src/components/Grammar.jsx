import { useState } from 'react'
import { topics } from '../data/content.js'

var groups = ['Tenses', 'Structures', 'Study']

export default function Grammar({ onExit }) {
  var [query, setQuery] = useState('')
  var [openId, setOpenId] = useState(null)

  var normalizedQuery = query.trim().toLowerCase()
  var matches = topics.filter(function (topic) {
    if (!normalizedQuery) {
      return true
    }
    return (
      topic.title.toLowerCase().indexOf(normalizedQuery) !== -1 ||
      topic.summary.toLowerCase().indexOf(normalizedQuery) !== -1 ||
      topic.rule.toLowerCase().indexOf(normalizedQuery) !== -1
    )
  })

  return (
    <section className="screen grammar-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Reference</p>
          <h2>Grammar notes</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onExit}>
          Back
        </button>
      </div>

      <label className="search-label" htmlFor="grammar-search">Find a topic</label>
      <input
        id="grammar-search"
        className="search-input"
        type="search"
        value={query}
        onChange={function (event) { setQuery(event.target.value) }}
        placeholder="e.g. present perfect, modal, there is"
      />

      {matches.length === 0 ? (
        <div className="info-panel">
          <p>No topic matches “{query}”.</p>
        </div>
      ) : null}

      {groups.map(function (group) {
        var inGroup = matches.filter(function (topic) { return topic.group === group })
        if (!inGroup.length) {
          return null
        }

        return (
          <div key={group} className="grammar-group">
            <h3 className="group-title">{group}</h3>
            {inGroup.map(function (topic) {
              var open = openId === topic.id
              return (
                <article key={topic.id} className={'grammar-card' + (open ? ' is-open' : '')}>
                  <button
                    type="button"
                    className="grammar-summary"
                    aria-expanded={open}
                    onClick={function () { setOpenId(open ? null : topic.id) }}
                  >
                    <span>
                      <strong>{topic.title}</strong>
                      <small>{topic.summary}</small>
                    </span>
                    <span className="toggle-symbol" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  {open ? (
                    <div className="grammar-detail">
                      <p><b>Rule:</b> {topic.rule}</p>
                      <p><b>Example:</b> {topic.example}</p>
                      <p><b>Tip:</b> {topic.tip}</p>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        )
      })}
    </section>
  )
}
