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
  buildSentence,
  evaluateSentence,
  randomCombination,
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
    'future_continuous', 'we', 'study', 'next_week',
    'We will be studying next week'
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
  assert.match(result.naturalMessage, /past time/)
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
  var result = evaluate('present_perfect', 'she', 'finish', 'already', 'She has already finished')
  assert.equal(result.grammatical, false, 'word order differs from the fixed template')
  var template = evaluate('present_perfect', 'she', 'finish', 'already', 'She has finished already')
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

check('random combinations stay inside the available ids', function () {
  for (var i = 0; i < 30; i++) {
    var combination = randomCombination('future_continuous')
    assert.ok(subjects.some(function (item) { return item.id === combination.subjectId }))
    assert.ok(verbs.some(function (item) { return item.id === combination.verbId }))
    assert.ok(timeExpressions.some(function (item) { return item.id === combination.timeId }))
  }
})

console.log('\n' + passed + ' tests passed.')
