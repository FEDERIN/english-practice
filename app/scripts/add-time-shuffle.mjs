import fs from 'node:fs'
const path = 'src/components/Builder.jsx'
let src = fs.readFileSync(path, 'utf8')

// 1. Add state for displayed times (up to 20 random)
const oldState = `  var [displayedVerbs, setDisplayedVerbs] = useState(function () {
    return shuffleVerbs(verbs, (combination && combination.verbId) || 'study')
  })`
const neuState = `  var [displayedVerbs, setDisplayedVerbs] = useState(function () {
    return shuffleVerbs(verbs, (combination && combination.verbId) || 'study')
  })
  var [displayedTimes, setDisplayedTimes] = useState(function () {
    return shuffleTimes(timeExpressions, combination && combination.timeId, combination && combination.timeText)
  })`
if (!src.includes(oldState)) { console.error('oldState not found'); process.exit(1) }
src = src.replace(oldState, neuState)

// 2. Add shuffleTimes helper after shuffleVerbs
const helperEnd = src.indexOf('export default function Builder')
const shuffleHelper = `function shuffleTimes(list, selectedId, selectedText) {
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
  // ensure selected is included
  if (selectedId) {
    var selInArr = arr.slice(0, 20).some(function (x) { return x.id === selectedId })
    if (!selInArr) {
      var sel = unique.filter(function (x) { return x.id === selectedId })[0]
      if (sel) arr[19] = sel
    }
  }
  var final = []
  var finalSeen = {}
  for (var f = 0; f < arr.length && final.length < 20; f++) {
    var k = arr[f].id + '|' + (Array.isArray(arr[f].text) ? arr[f].text.join(',') : arr[f].text)
    if (!finalSeen[k]) {
      finalSeen[k] = true
      final.push(arr[f])
    }
  }
  return final
}

`
// insert helper before export default
const importEnd = src.indexOf('export default function Builder')
src = src.slice(0, importEnd) + shuffleHelper + src.slice(importEnd)

// 3. Replace the time fieldset rendering to use displayedTimes (flat, not grouped) with refresh button.
// Find the time fieldset block.
const oldTimeFieldset = `          <div className="option-list">
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
            {availableTimes.reduce(function (acc, item) {
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
          </div>`

const neuTimeFieldset = `          <div className="option-list">
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
          <button type="button" className="secondary-button piece-copy" style={{ marginTop: '8px' }} onClick={function () { setDisplayedTimes(shuffleTimes(availableTimes, combination.timeId, combination.timeText)) }}>
            Refresh times
          </button>`

if (!src.includes(oldTimeFieldset)) { console.error('oldTimeFieldset not found'); process.exit(1) }
src = src.replace(oldTimeFieldset, neuTimeFieldset)

// 4. Update setPart to keep displayedTimes in sync when time not in list
const oldSetPart = `  function setPart(part, id) {
    var next = {
      subjectId: combination.subjectId,
      verbId: combination.verbId,
      timeId: combination.timeId,
      complementId: combination.complementId || 'none',
      timeText: combination.timeText || selectedTimeText,
    }
    next[part] = id
    if (part === 'verbId') {
      var sel = verbs.filter(function (v) { return v.id === id })[0]
      if (sel && displayedVerbs.indexOf(sel) === -1) {
        var deduped = displayedVerbs.slice()
        if (deduped.length >= 9) deduped.pop()
        deduped.push(sel)
        setDisplayedVerbs(deduped)
      }
    }
    setCombination(next)`
const neuSetPart = `  function setPart(part, id) {
    var next = {
      subjectId: combination.subjectId,
      verbId: combination.verbId,
      timeId: combination.timeId,
      complementId: combination.complementId || 'none',
      timeText: combination.timeText || selectedTimeText,
    }
    next[part] = id
    if (part === 'verbId') {
      var sel = verbs.filter(function (v) { return v.id === id })[0]
      if (sel && displayedVerbs.indexOf(sel) === -1) {
        var deduped = displayedVerbs.slice()
        if (deduped.length >= 9) deduped.pop()
        deduped.push(sel)
        setDisplayedVerbs(deduped)
      }
    }
    if (part === 'timeId') {
      var tsel = timeExpressions.filter(function (t) { return t.id === id })[0]
      if (tsel && !displayedTimes.some(function (x) { return x.id === id })) {
        var tdeduped = displayedTimes.slice()
        if (tdeduped.length >= 20) tdeduped.pop()
        tdeduped.push(tsel)
        setDisplayedTimes(tdeduped)
      }
    }
    setCombination(next)`
if (!src.includes(oldSetPart)) { console.error('oldSetPart not found'); process.exit(1) }
src = src.replace(oldSetPart, neuSetPart)

// 5. Reset: when tense changes, reset displayedTimes to shuffle of availableTimes (with none default)
// Update reset function to also reset displayedTimes
const oldReset = `    var combo = randomCombination(tenseToUse)
    combo.timeId = null
    combo.timeText = ''
    setCombination(combo)`
const neuReset = `    var combo = randomCombination(tenseToUse)
    combo.timeId = null
    combo.timeText = ''
    setCombination(combo)
    setDisplayedTimes(shuffleTimes(timeExpressions, null, ''))`
if (!src.includes(oldReset)) { console.error('oldReset not found'); process.exit(1) }
src = src.replace(oldReset, neuReset)

fs.writeFileSync(path, src)
console.log('done')