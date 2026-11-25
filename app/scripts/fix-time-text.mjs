import fs from 'node:fs'
const path = 'src/data/sentenceBuilder.js'
let src = fs.readFileSync(path, 'utf8')
const start = src.indexOf('export function buildSentence')
const end = src.indexOf('function clean')
const before = src.slice(0, start)
const fn = src.slice(start, end)
const after = src.slice(end)
const newFn = fn.replace(/time\.text/g, 'resolvedTimeText')
fs.writeFileSync(path, before + newFn + after)
console.log('done')