import fs from 'node:fs'
const path = 'src/data/sentenceBuilder.js'
let src = fs.readFileSync(path, 'utf8')

// Replace the three separate entries with one combined entry.
// Match each block: { id: 'every_week'/'every_month'/'every_year', ... },
const regex = /\{\s*\r?\n\s*id:\s*'every_(week|month|year)',\s*\r?\n\s*text:\s*'every (week|month|year)',\s*\r?\n\s*preferred:\s*\['present_simple'\],\s*\r?\n\s*avoid:\s*\['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'\],\s*\r?\n\s*note:\s*'Frequency expressions usually go with simple present for habits\.',\s*\r?\n\s*\},/g

const matches = src.match(regex)
console.log('matched blocks:', matches ? matches.length : 0)

const replacement = `  {
    id: 'every_week_month_year',
    text: ['every week', 'every month', 'every year'],
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },`

// Remove all three matched blocks, then insert one in their place.
// We'll replace the first match with the new block and remove the rest.
let count = 0
src = src.replace(regex, (m) => {
  count++
  if (count === 1) return replacement
  return ''  // remove subsequent ones
})

fs.writeFileSync(path, src)
console.log('done, replaced', count)
