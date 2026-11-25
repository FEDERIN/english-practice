import re

path = 'src/data/sentenceBuilder.js'
src = open(path, encoding='utf-8').read()

old = '''  {
    id: 'every_week',
    text: 'every week',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_month',
    text: 'every month',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },
  {
    id: 'every_year',
    text: 'every year',
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },'''

new = '''  {
    id: 'every_week_month_year',
    text: ['every week', 'every month', 'every year'],
    preferred: ['present_simple'],
    avoid: ['simple_past', 'simple_future', 'future_continuous', 'present_perfect', 'present_perfect_continuous', 'past_perfect', 'past_perfect_continuous', 'future_perfect', 'future_perfect_continuous'],
    note: 'Frequency expressions usually go with simple present for habits.',
  },'''

assert old in src, "old block not found"
src = src.replace(old, new)
open(path, 'w', encoding='utf-8').write(src)
print("done")
'''

python scripts/combine-time.py