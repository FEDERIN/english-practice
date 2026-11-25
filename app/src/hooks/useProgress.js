import { useCallback, useEffect, useState } from 'react'

var STORAGE_KEY = 'english-practice-progress-v1'

function emptyProgress() {
  return {
    correct: 0,
    wrong: 0,
    byTopic: {},
    knownCards: [],
  }
}

function readProgress() {
  try {
    var raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return emptyProgress()
    }
    var saved = JSON.parse(raw)
    return {
      correct: typeof saved.correct === 'number' ? saved.correct : 0,
      wrong: typeof saved.wrong === 'number' ? saved.wrong : 0,
      byTopic: saved.byTopic && typeof saved.byTopic === 'object' ? saved.byTopic : {},
      knownCards: Array.isArray(saved.knownCards) ? saved.knownCards : [],
    }
  } catch (error) {
    return emptyProgress()
  }
}

export function useProgress() {
  var [progress, setProgress] = useState(readProgress)

  useEffect(function () {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (error) {
      // Storage can be disabled in private browsing. The app still works in memory.
    }
  }, [progress])

  var recordAnswer = useCallback(function (topic, wasCorrect) {
    setProgress(function (previous) {
      var byTopic = Object.assign({}, previous.byTopic)
      var current = byTopic[topic] || { correct: 0, wrong: 0 }
      var next = Object.assign({}, current)

      if (wasCorrect) {
        next.correct = current.correct + 1
      } else {
        next.wrong = current.wrong + 1
      }

      byTopic[topic] = next

      return Object.assign({}, previous, {
        correct: previous.correct + (wasCorrect ? 1 : 0),
        wrong: previous.wrong + (wasCorrect ? 0 : 1),
        byTopic: byTopic,
      })
    })
  }, [])

  var toggleKnown = useCallback(function (cardId) {
    setProgress(function (previous) {
      var alreadyKnown = previous.knownCards.indexOf(cardId) !== -1
      var knownCards = alreadyKnown
        ? previous.knownCards.filter(function (id) { return id !== cardId })
        : previous.knownCards.concat([cardId])

      return Object.assign({}, previous, { knownCards: knownCards })
    })
  }, [])

  var resetProgress = useCallback(function () {
    setProgress(emptyProgress())
  }, [])

  return {
    progress: progress,
    recordAnswer: recordAnswer,
    toggleKnown: toggleKnown,
    resetProgress: resetProgress,
  }
}
