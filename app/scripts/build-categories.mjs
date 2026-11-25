import fs from 'node:fs'
const times = JSON.parse(fs.readFileSync('scripts/times.json', 'utf8'))

// Category mapping: expression id -> category id
const categoryMap = {
  right_now: 'present_moment',
  every_day: 'daily_frequency',
  every_morning: 'daily_frequency',
  every_afternoon: 'daily_frequency',
  every_evening: 'daily_frequency',
  every_night: 'daily_frequency',
  yesterday: 'specific_past',
  next_week: 'specific_future',
  tomorrow_at_eight: 'future_reference',
  by_friday: 'deadline',
  for_two_hours: 'duration',
  already: 'already', // standalone
  since_2020: 'starting_point',
  this_time_next_week: 'future_reference',
  in_two_hours: 'future_reference',
  every_week: 'periodic_frequency',
  every_month: 'periodic_frequency',
  every_year: 'periodic_frequency',
  every_week_month_year: 'periodic_frequency',
  once_a_day: 'repeated_frequency',
  twice_a_week: 'repeated_frequency',
  three_times_a_month: 'repeated_frequency',
  every_two_days: 'periodic_frequency',
}

const categoryLabels = {
  daily_frequency: 'Daily Frequency',
  periodic_frequency: 'Periodic Frequency',
  repeated_frequency: 'Repeated Frequency',
  specific_past: 'Specific Past Time',
  specific_future: 'Specific Future Time',
  duration: 'Duration',
  starting_point: 'Starting Point',
  deadline: 'Deadline',
  present_moment: 'Present Moment',
  future_reference: 'Future Reference',
  already: 'Already',
}

// Group
const groups = {}
for (const t of times) {
  const cat = categoryMap[t.id] || 'other'
  if (!groups[cat]) groups[cat] = []
  groups[cat].push(t)
}

// Build categories array
const categories = Object.keys(categoryLabels).map(catId => ({
  id: catId,
  label: categoryLabels[catId],
  expressions: (groups[catId] || []).map(t => ({
    id: t.id,
    text: t.text,
    preferred: t.preferred,
    avoid: t.avoid,
    note: t.note,
    ...(t.preferredVerbs ? { preferredVerbs: t.preferredVerbs } : {}),
    ...(t.appliesTo ? { appliesTo: t.appliesTo } : {}),
  }))
}).filter(c => c.expressions.length > 0)

// Write as JS
const out = `export var timeExpressionCategories = ${JSON.stringify(categories, null, 2)}\n\n// Flat list derived from categories (kept for backward compatibility with existing logic).\nexport var timeExpressions = timeExpressionCategories.flatMap(function (cat) {\n  return cat.expressions\n})\n`
fs.writeFileSync('scripts/categories-out.mjs', out)
console.log('categories:', categories.length)
console.log('total expressions:', categories.reduce((a,c)=>a+c.expressions.length,0))
`

node scripts/build-categories.mjs