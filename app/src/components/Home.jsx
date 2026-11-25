export default function Home({ onNavigate, progress, onReset }) {
  var total = progress.correct + progress.wrong
  var accuracy = total ? Math.round((progress.correct / total) * 100) : 0
  var known = progress.knownCards ? progress.knownCards.length : 0

  var actions = [
    {
      id: 'practice',
      title: 'Fill in the blank',
      text: 'Complete sentences from the exercise sections of your notes.',
      badge: '24 questions',
    },
    {
      id: 'builder',
      title: 'Sentence Builder',
      text: 'Combine a subject, a verb and a time expression. Grammar and naturalness are checked separately.',
      badge: '12 tenses',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      text: 'Tap a card to reveal the Spanish meaning. Mark the ones you know.',
      badge: '18 cards',
    },
    {
      id: 'grammar',
      title: 'Grammar notes',
      text: 'Quick rules and examples for every topic in reglas_ingles.md.',
      badge: '18 topics',
    },
  ]

  return (
    <section className="screen home-screen">
      <div className="hero">
        <p className="eyebrow">Personal study app</p>
        <h1>English Practice</h1>
        <p className="hero-text">
          Short sessions for your iPad mini 2. Everything is stored on this device and works
          offline after the first load.
        </p>
      </div>

      <div className="stats" aria-label="Your progress">
        <div className="stat">
          <span className="stat-value">{total}</span>
          <span className="stat-label">answers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">accuracy</span>
        </div>
        <div className="stat">
          <span className="stat-value">{known}</span>
          <span className="stat-label">cards known</span>
        </div>
      </div>

      <div className="action-grid">
        {actions.map(function (action) {
          return (
            <button
              key={action.id}
              type="button"
              className="action-card"
              onClick={function () { onNavigate(action.id) }}
            >
              <span className="action-badge">{action.badge}</span>
              <strong>{action.title}</strong>
              <span className="action-text">{action.text}</span>
              <span className="action-arrow" aria-hidden="true">→</span>
            </button>
          )
        })}
      </div>

      <div className="info-panel">
        <strong>Install on your iPad</strong>
        <p>
          Open this page in Safari, tap the Share button, then choose <em>Add to Home Screen</em>.
          The icon opens full screen, just like a native app.
        </p>
      </div>

      {total > 0 || known > 0 ? (
        <button type="button" className="text-button" onClick={onReset}>
          Reset progress
        </button>
      ) : null}
    </section>
  )
}
