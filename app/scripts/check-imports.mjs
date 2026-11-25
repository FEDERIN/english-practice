import fs from 'node:fs'
const src = fs.readFileSync('src/components/Builder.jsx', 'utf8')
const i = src.indexOf("from '../data/sentenceBuilder.js'")
console.log(src.slice(0, i + 40))