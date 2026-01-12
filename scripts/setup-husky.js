import fs from 'fs'
import path from 'path'

const huskyDir = '.husky'

if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir)
}

const preCommitContent = `#!/bin/sh

pnpm lint-staged && npx validate-branch-name && pnpm run check-blocked-files
`

const commitMsgContent = `#!/bin/sh

npx --no-install commitlint --edit "$1"
`

fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitContent, { mode: 0o755 })
fs.writeFileSync(path.join(huskyDir, 'commit-msg'), commitMsgContent, { mode: 0o755 })

console.log('Husky: Hooks criados com sucesso!')
