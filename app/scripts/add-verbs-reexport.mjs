import fs from 'node:fs'
const path = 'src/data/sentenceBuilder.js'
let src = fs.readFileSync(path, 'utf8')

if (!src.includes("export { verbs } from './verbs.js'")) {
  src = "export { verbs } from './verbs.js'\n" + src
  fs.writeFileSync(path, src)
  console.log('added re-export')
} else {
  console.log('already present')
}