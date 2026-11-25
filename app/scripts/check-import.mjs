import fs from 'node:fs'
const src = fs.readFileSync('src/data/sentenceBuilder.js', 'utf8')
const lines = src.split('\n')
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('timeExpressionCategories') && lines[i].includes('import')) {
    console.log((i+1) + ': ' + lines[i])
  }
}
console.log('--- all imports ---')
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().startsWith('import')) console.log((i+1) + ': ' + lines[i])
}