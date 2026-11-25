import { useState } from 'react'
import Home from './components/Home.jsx'
import Practice from './components/Practice.jsx'
import Flashcards from './components/Flashcards.jsx'
import Grammar from './components/Grammar.jsx'
import Builder from './components/Builder.jsx'
import { useProgress } from './hooks/useProgress.js'

var views = [
  { id: 'home', label: 'Home' },
  { id: 'practice', label: 'Practice' },
  { id: 'builder', label: 'Builder' },
  { id: 'flashcards', label: 'Cards' },
  { id: 'grammar', label: 'Grammar' },
]

export default function App() {
  var [view, setView] = useState('home')
  var progressApi = useProgress()

  function reset() {
    var confirmed = window.confirm('Delete all saved progress on this device?')
    if (confirmed) {
      progressApi.resetProgress()
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">E</span>
          <span>
            <strong>English Practice</strong>
            <small>Built from your notes</small>
          </span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          {views.map(function (item) {
            return (
              <button
                key={item.id}
                type="button"
                className={'nav-button' + (view === item.id ? ' is-active' : '')}
                onClick={function () { setView(item.id) }}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </header>

      <main className="app-main">
        {view === 'home' ? (
          <Home
            onNavigate={setView}
            progress={progressApi.progress}
            onReset={reset}
          />
        ) : null}

        {view === 'practice' ? (
          <Practice
            onExit={function () { setView('home') }}
            recordAnswer={progressApi.recordAnswer}
          />
        ) : null}

        {view === 'builder' ? (
          <Builder
            onExit={function () { setView('home') }}
            recordAnswer={progressApi.recordAnswer}
          />
        ) : null}

        {view === 'flashcards' ? (
          <Flashcards
            onExit={function () { setView('home') }}
            progress={progressApi.progress}
            toggleKnown={progressApi.toggleKnown}
          />
        ) : null}

        {view === 'grammar' ? (
          <Grammar onExit={function () { setView('home') }} />
        ) : null}
      </main>

      <footer className="app-footer">
        <span>Offline ready · iPad mini 2 · iOS 12</span>
      </footer>
    </div>
  )
}
