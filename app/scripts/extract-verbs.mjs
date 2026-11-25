import fs from 'node:fs'
const src = fs.readFileSync('src/data/sentenceBuilder.js', 'utf8')

const start = src.indexOf('export var verbs = [')
const end = src.indexOf('export var timeExpressions')
const block = src.slice(start, end).trim()

const prefix = 'export var verbs = '
const arrStr = block.slice(prefix.length)

const newFile = `export var verbs = ${arrStr}\n`
fs.writeFileSync('src/data/verbs.js', newFile)

const before = src.slice(0, start)
const after = src.slice(end)
const newSrc = `import { verbs } from './verbs.js'\n\n` + before + after
// Remove duplicate import if present
fs.writeFileSync('src/data/sentenceBuilder.js', newSrc)
console.log('done')