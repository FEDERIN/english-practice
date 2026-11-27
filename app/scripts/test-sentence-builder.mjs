// Tests for the Sentence Builder evaluator.
// Run with: npm run test
// No test framework needed: plain asserts work on every Node version we use.

import assert from 'node:assert/strict'
import {
  subjects,
  verbs,
  timeExpressions,
  getSubject,
  getVerb,
  getTime,
  getComplement,
  buildSentence,
  evaluateSentence,
  randomCombination,
  verbsForTime,
  timesForVerb,
  tenses,
  timeExpressionCategories,
} from '../src/data/sentenceBuilder.js'

function evaluate(tenseId, subjectId, verbId, timeId, sentence) {
  return evaluateSentence(
    tenseId,
    getSubject(subjectId),
    getVerb(verbId),
    getTime(timeId),
    sentence
  )
}

var passed = 0

function check(name, fn) {
  fn()
  passed++
  console.log('  ok - ' + name)
}

console.log('Sentence Builder evaluator')

check('builds a Future Continuous sentence', function () {
  var result = buildSentence(
    'future_continuous',
    getSubject('we'),
    getVerb('study'),
    getTime('next_week')
  )
  assert.equal(result.text, 'We will be studying next week.')
})

check('accepts a correct and natural sentence', function () {
  var result = evaluate(
    'future_continuous', 'we', 'study', 'this_time_next_week',
    'We will be studying this time next week'
  )
  assert.equal(result.grammatical, true)
  assert.equal(result.natural, true)
})

check('detects a grammar error (missing will be)', function () {
  var result = evaluate(
    'future_continuous', 'we', 'study', 'next_week',
    'We studying next week'
  )
  assert.equal(result.grammatical, false)
  assert.match(result.grammarMessage, /expected “will”/)
})

check('separates grammar from naturalness: correct grammar + past time marker', function () {
  var result = evaluate(
    'future_continuous', 'i', 'study', 'yesterday',
    'I will be studying yesterday'
  )
  assert.equal(result.grammatical, true)
  assert.equal(result.combinationNatural, false)
  assert.equal(result.natural, false)
  assert.match(result.naturalMessage, /completed period in the past/)
})

check('separates grammar from naturalness: habit marker with simple present', function () {
  var result = evaluate(
    'present_simple', 'we', 'work', 'every_day',
    'We work every day'
  )
  assert.equal(result.grammatical, true)
  assert.equal(result.natural, true)
})

check('handles contractions', function () {
  var result = evaluate(
    'future_continuous', 'we', 'study', 'next_week',
    "We'll be studying next week."
  )
  assert.equal(result.grammatical, true)
})

check('requires -s for third person singular in simple present', function () {
  var right = evaluate('present_simple', 'she', 'study', 'every_day', 'She studies every day')
  var wrong = evaluate('present_simple', 'she', 'study', 'every_day', 'She study every day')
  assert.equal(right.grammatical, true)
  assert.equal(wrong.grammatical, false)
})

check('uses has with third person singular in present perfect', function () {
  var result = evaluate('present_perfect', 'she', 'finish', 'since_2020', 'She has since 2020 finished')
  assert.equal(result.grammatical, false, 'word order differs from the fixed template')
  var template = evaluate('present_perfect', 'she', 'finish', 'since_2020', 'She has finished since 2020')
  assert.equal(template.grammatical, true)
})

check('ai prompt asks for grammar and naturalness separately', function () {
  var result = evaluate(
    'future_continuous', 'i', 'work', 'yesterday',
    'I will be working yesterday'
  )
  assert.match(result.aiPrompt, /Step 1: Judge only grammatical correctness/)
  assert.match(result.aiPrompt, /Step 2: Judge separately whether it sounds natural/)
  assert.match(result.aiPrompt, /Offline naturalness check: possibly unnatural/)
})

check('verbExamples acts as a whitelist for a time expression', function () {
  var result = verbsForTime(getTime('right_now'), 'present_simple')
  assert.ok(result.length > 0)
  result.forEach(function (item) {
    assert.ok(['need', 'want', 'know', 'understand', 'prefer', 'believe', 'like', 'love', 'hate', 'remember', 'mean', 'own', 'belong', 'have'].indexOf(item.id) !== -1)
  })
})

check('excludedVerbs removes verbs without listing the rest', function () {
  var result = verbsForTime(getTime('right_now'), 'presente_continuo')
  var ids = result.map(function (item) { return item.id })
  assert.equal(ids.indexOf('know'), -1)
  assert.equal(ids.indexOf('have'), -1)
  assert.ok(ids.indexOf('work') !== -1)
  assert.ok(ids.indexOf('study') !== -1)
})

check('timesForVerb drops expressions whose verbExamples whitelist does not match', function () {
  var forStudy = timesForVerb('study', 'present_perfect')
  var forFinish = timesForVerb('finish', 'present_perfect')
  assert.equal(forStudy.some(function (item) { return item.id === 'as_of_now' }), false)
  assert.equal(forFinish.some(function (item) { return item.id === 'as_of_now' }), true)
})

check('timesForVerb falls back instead of returning an empty list', function () {
  var result = timesForVerb('know', 'presente_continuo')
  assert.ok(result.length > 0)
})

check('time expressions expose excludedVerbs for the selected tense', function () {
  var rightNow = getTime('right_now')
  assert.ok(Array.isArray(rightNow.excludedVerbs.presente_continuo))
  assert.equal(rightNow.excludedVerbs.presente_continuo.indexOf('know') !== -1, true)
})

check('time expression data references only known ids and has no duplicates', function () {
  var tenseIds = tenses.map(function (item) { return item.id })
  var verbIds = verbs.map(function (item) { return item.id })
  var seenText = {}
  var seenId = {}

  timeExpressionCategories.forEach(function (cat) {
    cat.expressions.forEach(function (expr) {
      assert.equal(seenText[expr], undefined, 'duplicate expression: ' + expr)
      seenText[expr] = cat.id
    })

    ;(cat.preferred || []).forEach(function (tenseId) {
      assert.ok(tenseIds.indexOf(tenseId) !== -1, cat.id + ' prefers unknown tense: ' + tenseId)
    })

    ;['verbExamples', 'excludedVerbs'].forEach(function (field) {
      Object.keys(cat[field] || {}).forEach(function (tenseId) {
        assert.ok(tenseIds.indexOf(tenseId) !== -1, cat.id + '.' + field + ' uses unknown tense: ' + tenseId)
        ;(cat[field][tenseId] || []).forEach(function (verbId) {
          assert.ok(verbIds.indexOf(verbId) !== -1, cat.id + '.' + field + '[' + tenseId + '] uses unknown verb: ' + verbId)
        })
      })
    })
  })

  timeExpressions.forEach(function (item) {
    assert.equal(seenId[item.id], undefined, 'duplicate expression id: ' + item.id)
    seenId[item.id] = true
  })
})

check('builds a sentence with an infinitive verb', function () {
  var result = buildSentence(
    'present_simple',
    getSubject('i'),
    getVerb('want'),
    getTime('every_day'),
    'affirmative',
    getComplement('english'),
    '',
    getVerb('learn')
  )
  assert.equal(result.text, 'I want to learn English every day.')
  assert.deepEqual(result.parts, ['I', 'want', 'to', 'learn', 'English', 'every day'])
})

check('random combinations stay inside the available ids', function () {
  for (var i = 0; i < 30; i++) {
    var combination = randomCombination('future_continuous')
    assert.ok(subjects.some(function (item) { return item.id === combination.subjectId }))
    assert.ok(verbs.some(function (item) { return item.id === combination.verbId }))
    assert.ok(combination.timeId === null || timeExpressions.some(function (item) { return item.id === combination.timeId }))
  }
})

console.log('\n' + passed + ' tests passed.')
