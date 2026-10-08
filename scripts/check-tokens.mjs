import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['src/blocks', 'src/pages', 'src/App.tsx']
const rules = [
  [/#[0-9a-fA-F]{3,8}\b/, 'warna hex'],
  [/\b(?:bg|text|border|ring|fill|stroke|from|to|via)-\[[^\]]*\]/, 'nilai arbitrary Tailwind'],
  [/\b(?:bg|text|border|ring|fill|stroke)-(?:red|blue|green|yellow|orange|purple|pink|gray|slate|zinc|neutral|stone|indigo|violet|sky|cyan|teal|emerald|lime|amber|rose|fuchsia)-\d{2,3}\b/, 'warna palet langsung (pakai token: primary, muted, destructive, ...)'],
]

const files = []
const walk = (p) => {
  let st
  try { st = statSync(p) } catch { return }
  if (st.isDirectory()) readdirSync(p).forEach((f) => walk(join(p, f)))
  else if (/\.(tsx?|css)$/.test(p) && !/\.stories\./.test(p)) files.push(p)
}
roots.forEach(walk)

let bad = 0
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    for (const [re, label] of rules) {
      if (re.test(line)) { console.error(`${f}:${i + 1}  ${label}: ${line.trim()}`); bad++ }
    }
  })
}
if (bad) { console.error(`\n${bad} pelanggaran token.`); process.exit(1) }
console.log(`Token OK (${files.length} file diperiksa).`)
